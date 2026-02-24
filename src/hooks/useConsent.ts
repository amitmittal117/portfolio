import { useState } from 'react';

const CONSENT_KEY = 'portfolio_analytics_consent';
export type ConsentValue = 'accepted' | 'declined' | null;

/**
 * Analytics is ON by default.
 * Opt-out is stored in sessionStorage only — resets on every new visit/tab.
 */
export function useConsent() {
    const [consent, setConsent] = useState<ConsentValue>(() => {
        try {
            // Session-level opt-out check — cleared automatically on new visits
            if (sessionStorage.getItem(CONSENT_KEY) === 'declined') return 'declined';
            return 'accepted';
        } catch {
            return 'accepted';
        }
    });

    const accept = () => {
        try { sessionStorage.removeItem(CONSENT_KEY); } catch { }
        setConsent('accepted');
    };

    const decline = () => {
        try { sessionStorage.setItem(CONSENT_KEY, 'declined'); } catch { }
        setConsent('declined');
    };

    return { consent, accept, decline };
}
