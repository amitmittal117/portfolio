import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
                    user_agent: navigator.userAgent,
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
