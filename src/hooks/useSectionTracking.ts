import { useEffect, useRef } from 'react';

const SECTION_IDS = [
    'hero', 'skills', 'experience', 'projects',
    'education', 'certificates', 'blog', 'faq', 'contact',
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

function flushToSupabase(rows: object[]) {
    if (!rows.length) return;
    try {
        fetch(`${SUPABASE_URL}/rest/v1/section_engagement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                Prefer: 'return=minimal',
            },
            body: JSON.stringify(rows),
            keepalive: true,
        });
    } catch { /* silently fail */ }
}

/**
 * Tracks how many seconds the user spends in each page section
 * using IntersectionObserver (≥50% visible = "in section").
 * Flushes to `section_engagement` table on tab hide / page close.
 */
export function useSectionTracking(sessionId: string | null) {
    const timeMap = useRef<Record<string, number>>({});
    const enterTime = useRef<Record<string, number>>({});
    const flushed = useRef(false);

    useEffect(() => {
        if (!sessionId) return;

        flushed.current = false;

        const observer = new IntersectionObserver((entries) => {
            const now = Date.now();
            entries.forEach((entry) => {
                const id = (entry.target as HTMLElement).id;
                if (entry.isIntersecting) {
                    enterTime.current[id] = now;
                } else if (enterTime.current[id]) {
                    const elapsed = Math.round((now - enterTime.current[id]) / 1000);
                    timeMap.current[id] = (timeMap.current[id] ?? 0) + elapsed;
                    delete enterTime.current[id];
                }
            });
        }, { threshold: 0.5 });

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const flush = () => {
            if (flushed.current) return;
            flushed.current = true;

            // Finalize currently-visible sections
            const now = Date.now();
            Object.entries(enterTime.current).forEach(([id, t]) => {
                const elapsed = Math.round((now - t) / 1000);
                timeMap.current[id] = (timeMap.current[id] ?? 0) + elapsed;
            });

            const rows = Object.entries(timeMap.current)
                .filter(([, t]) => t > 0)
                .map(([section, time_in_section]) => ({
                    session_id: sessionId,
                    section,
                    time_in_section,
                }));

            flushToSupabase(rows);
        };

        const onVisibility = () => {
            if (document.visibilityState === 'hidden') flush();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            flush();
        };
    }, [sessionId]);
}
