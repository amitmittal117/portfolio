import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Common bots/crawlers — skip tracking these entirely
const BOT_PATTERN = /bot|crawler|spider|crawling|google|bing|yahoo|baidu|yandex|duckduck|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|slack|discord|curl|wget|python|java|go-http|axios|lighthouse|pagespeed/i;

function isBot(ua: string): boolean {
    return BOT_PATTERN.test(ua);
}

function getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        if (/iPad/i.test(ua)) return 'tablet';
        return 'mobile';
    }
    return 'desktop';
}

export function useAnalytics() {
    useEffect(() => {
        const ua = navigator.userAgent;

        // Skip bots and crawlers — they inflate counts and return null geo data
        if (isBot(ua)) return;

        // Only track once per browser session (avoids double-counting refreshes)
        const SESSION_KEY = 'portfolio_tracked';
        if (sessionStorage.getItem(SESSION_KEY)) return;
        sessionStorage.setItem(SESSION_KEY, '1');

        const track = async () => {
            try {
                // ipapi.co free tier: 1,000 req/day, 30k/month — no API key needed
                const geo = await fetch('https://ipapi.co/json/')
                    .then(r => r.json())
                    .catch(() => ({}));

                await supabase.from('page_views').insert({
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
                });
            } catch {
                // Silently fail — never break the portfolio for analytics
            }
        };

        track();
    }, []);
}
