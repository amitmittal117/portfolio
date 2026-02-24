import { profile } from '../../data';
import type { ConsentValue } from '@/hooks/useConsent';

interface FooterProps {
    consent: ConsentValue;
    onAccept: () => void;
    onDecline: () => void;
    onViewPolicy: () => void;
}

export function Footer({ consent, onAccept, onDecline, onViewPolicy }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 border-t">
            <div className="container">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} {profile.name}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button
                            onClick={onViewPolicy}
                            className="hover:text-foreground transition-colors hover:underline underline-offset-2"
                        >
                            Privacy Policy
                        </button>
                        {/* Analytics toggle — only visible after user has made a choice */}
                        {consent !== null && (
                            <button
                                onClick={consent === 'accepted' ? onDecline : onAccept}
                                title={consent === 'accepted' ? 'Click to disable analytics' : 'Click to enable analytics'}
                                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                            >
                                <span
                                    className={`w-2 h-2 rounded-full transition-colors ${consent === 'accepted'
                                            ? 'bg-green-500'
                                            : 'bg-muted-foreground'
                                        }`}
                                />
                                <span className={consent === 'accepted' ? 'text-green-600 dark:text-green-400' : ''}>
                                    Analytics {consent === 'accepted' ? 'On' : 'Off'}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
