import { useState, useEffect } from 'react';
import { Shield, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ConsentValue } from '@/hooks/useConsent';

interface Props {
    consent: ConsentValue;
    onAccept: () => void;
    onDecline: () => void;
    onViewPolicy: () => void;
}

/**
 * Slide-up cookie consent banner shown only on first visit (consent === null).
 * Disappears after Accept or Decline — never shown again.
 */
export function ConsentBanner({ consent, onAccept, onDecline, onViewPolicy }: Props) {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (consent === null) {
            setShow(true);
            const t = setTimeout(() => setVisible(true), 80);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
            const t = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(t);
        }
    }, [consent]);

    if (!show) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-2xl">
                <div className="container py-3 px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {/* Icon + text */}
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <Cookie className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                This portfolio collects basic analytics (page views, time on page, clicks) to improve the experience. No data is sold.{' '}
                                <button
                                    onClick={onViewPolicy}
                                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                                >
                                    Privacy Policy
                                </button>
                            </p>
                        </div>
                        {/* Buttons */}
                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onDecline}
                                className="flex-1 sm:flex-none text-xs h-8"
                            >
                                Decline
                            </Button>
                            <Button
                                size="sm"
                                onClick={onAccept}
                                className="flex-1 sm:flex-none text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <Shield className="w-3 h-3 mr-1" />
                                Accept
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsentBanner;
