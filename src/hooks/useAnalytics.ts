import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ConsentValue } from './useConsent';

const BOT_PATTERN = /bot|crawler|spider|crawling|google|bing|yahoo|baidu|yandex|duckduck|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|slack|discord|curl|wget|python|java|go-http|axios|lighthouse|pagespeed/i;

function getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        return /iPad/i.test(ua) ? 'tablet' : 'mobile';
    }
    return 'desktop';
}

const SESSION_KEY = 'portfolio_tracked';
const SESSION_ID_KEY = 'portfolio_session_id';

/**
 * Collects enriched page-view data after browser idle.
 * Respects consent — exits immediately if not 'accepted'.
 * Returns sessionId (used by section + event tracking hooks).
 */
export function useAnalytics(consent: ConsentValue) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (consent !== 'accepted') return;

        const ua = navigator.userAgent;
        if (BOT_PATTERN.test(ua)) return;

        // Restore existing session if already tracked this tab session
        if (sessionStorage.getItem(SESSION_KEY)) {
            const existing = sessionStorage.getItem(SESSION_ID_KEY);
            if (existing) {
                sessionIdRef.current = existing;
                setSessionId(existing);
            }
            return;
        }
        sessionStorage.setItem(SESSION_KEY, '1');

        // Defer all analytics work until browser is idle (after first paint)
        const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));

        idle(async () => {
            try {
                const conn = (navigator as any).connection;
                const params = new URLSearchParams(window.location.search);

                // IP geo lookup runs async — page is never blocked
                const geo = await fetch('https://ipapi.co/json/')
                    .then(r => r.json())
                    .catch(() => ({}));

                const { data } = await supabase
                    .from('page_views')
                    .insert({
                        // Existing fields
                        ip: geo.ip ?? null,
                        country: geo.country_name ?? null,
                        country_code: geo.country_code ?? null,
                        city: geo.city ?? null,
                        region: geo.region ?? null,
                        org: geo.org ?? null,
                        latitude: geo.latitude ?? null,
                        longitude: geo.longitude ?? null,
                        referrer: document.referrer || null,
                        user_agent: ua,
                        path: window.location.pathname,
                        device: getDeviceType(),
                        // New enriched fields
                        screen_width: window.screen.width,
                        screen_height: window.screen.height,
                        viewport_width: window.innerWidth,
                        viewport_height: window.innerHeight,
                        pixel_ratio: window.devicePixelRatio,
                        language: navigator.language ?? null,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
                        connection_type: conn?.effectiveType ?? null,
                        utm_source: params.get('utm_source'),
                        utm_medium: params.get('utm_medium'),
                        utm_campaign: params.get('utm_campaign'),
                        session_start: new Date().toISOString(),
                    })
                    .select('session_id')
                    .single();

                if (data?.session_id) {
                    sessionIdRef.current = data.session_id;
                    setSessionId(data.session_id);
                    sessionStorage.setItem(SESSION_ID_KEY, data.session_id);
                }
            } catch { /* silently fail — never break the portfolio */ }
        });

        // Flush time_on_page on tab hide using keepalive fetch (headers safe, unlike sendBeacon)
        const flushTimeOnPage = () => {
            const sid = sessionIdRef.current ?? sessionStorage.getItem(SESSION_ID_KEY);
            if (!sid) return;
            const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
            try {
                fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_views?session_id=eq.${sid}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                            Prefer: 'return=minimal',
                        },
                        body: JSON.stringify({ time_on_page: timeOnPage }),
                        keepalive: true,
                    }
                );
            } catch { /* silently fail */ }
        };

        const onVisibility = () => {
            if (document.visibilityState === 'hidden') flushTimeOnPage();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, [consent]);

    return { sessionId };
}
