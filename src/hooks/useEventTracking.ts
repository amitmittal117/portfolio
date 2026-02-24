import { useEffect, useRef } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const SCROLL_MILESTONES = [25, 50, 75, 100];

function getBrowser(): string {
    const ua = navigator.userAgent;
    if (/edg\//i.test(ua)) return 'edge';
    if (/opr\/|opera/i.test(ua)) return 'opera';
    if (/firefox/i.test(ua)) return 'firefox';
    if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'safari';
    if (/chrome/i.test(ua)) return 'chrome';
    return 'other';
}

function getLoadTime(): number | null {
    try {
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (nav) return Math.round(nav.domInteractive);
        const t = (performance as any).timing;
        if (t?.navigationStart) return t.domInteractive - t.navigationStart;
    } catch { /* ignore */ }
    return null;
}

function getDevice(): string {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        return /iPad/i.test(ua) ? 'tablet' : 'mobile';
    }
    return 'desktop';
}

interface EventRow {
    session_id: string;
    path: string;
    event_type: string;
    element?: string | null;
    scroll_depth?: number | null;
    device: string;
    browser: string;
    referrer: string | null;
    load_time_ms: number | null;
}

/**
 * Tracks click events (via data-track attributes) and scroll-depth milestones.
 * Events are batched in memory and flushed every 5s or on page exit.
 */
export function useEventTracking(sessionId: string | null) {
    const queue = useRef<EventRow[]>([]);
    const milestones = useRef<Set<number>>(new Set());
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!sessionId) return;

        const browser = getBrowser();
        const loadTime = getLoadTime();
        const device = getDevice();
        const referrer = document.referrer || null;

        const makeRow = (overrides: Partial<EventRow>): EventRow => ({
            session_id: sessionId,
            path: window.location.pathname,
            event_type: 'unknown',
            device,
            browser,
            referrer,
            load_time_ms: loadTime,
            ...overrides,
        });

        const flush = (keepalive = false) => {
            const rows = queue.current.splice(0);
            if (!rows.length) return;
            try {
                fetch(`${SUPABASE_URL}/rest/v1/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: SUPABASE_KEY,
                        Authorization: `Bearer ${SUPABASE_KEY}`,
                        Prefer: 'return=minimal',
                    },
                    body: JSON.stringify(rows),
                    keepalive,
                });
            } catch { /* silently fail */ }
        };

        // Batch flush every 5 seconds
        timer.current = setInterval(() => flush(false), 5000);

        // Delegated click listener — fires for any element with data-track attr
        const onClick = (e: MouseEvent) => {
            const target = (e.target as Element).closest('[data-track]');
            if (!target) return;
            const element = target.getAttribute('data-track') ?? 'unknown';
            queue.current.push(makeRow({ event_type: 'click', element }));
        };

        // Scroll depth milestones — throttled via rAF
        let rafPending = false;
        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                rafPending = false;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (!docHeight) return;
                const pct = Math.round((window.scrollY / docHeight) * 100);
                SCROLL_MILESTONES.forEach((m) => {
                    if (pct >= m && !milestones.current.has(m)) {
                        milestones.current.add(m);
                        queue.current.push(makeRow({ event_type: 'scroll_milestone', scroll_depth: m }));
                    }
                });
            });
        };

        // Flush on tab hide
        const onVisibility = () => {
            if (document.visibilityState === 'hidden') flush(true);
        };

        document.addEventListener('click', onClick);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            if (timer.current) clearInterval(timer.current);
            document.removeEventListener('click', onClick);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
            flush(false);
        };
    }, [sessionId]);
}
