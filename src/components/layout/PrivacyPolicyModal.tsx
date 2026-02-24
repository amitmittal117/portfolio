import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data';

interface Props {
    open: boolean;
    onClose: () => void;
}

/**
 * CCPA-compliant privacy policy modal.
 * Explains what is collected, why, and how to opt out.
 */
export function PrivacyPolicyModal({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[82vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                    <h2 className="text-base font-semibold">Privacy Policy</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-muted-foreground leading-relaxed">
                    <p className="text-xs text-muted-foreground/60">Last updated: February 2026</p>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">What We Collect</h3>
                        <p>When analytics is enabled, we collect:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>IP address and approximate location (country, city, region)</li>
                            <li>Browser type, OS, device type, and screen resolution</li>
                            <li>Browser language and timezone</li>
                            <li>Pages visited, sections viewed, and time spent on each</li>
                            <li>Scroll depth and clicks on specific elements (e.g. resume download)</li>
                            <li>Referring website and UTM campaign parameters</li>
                            <li>Page load performance metrics</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">Why We Collect It</h3>
                        <p>
                            Data is used solely to understand how this portfolio is used — which sections
                            are most viewed, what devices are common, and where traffic originates.
                            It helps improve the overall experience.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">How It's Stored</h3>
                        <p>
                            Data is stored in Supabase (a secure cloud database). It is never sold,
                            shared with advertisers, or used for any commercial purpose.
                            Access is restricted to the portfolio owner only.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">California Residents (CCPA)</h3>
                        <p>
                            Under the California Consumer Privacy Act, California residents have the right
                            to know what personal information is collected and to opt out of its collection.
                            IP addresses and location data are considered personal information under CCPA.
                            You can opt out at any time using the toggle in the footer.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">Your Choices</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Click <strong className="text-foreground">Decline</strong> on the banner to opt out entirely</li>
                            <li>Use the <strong className="text-foreground">Analytics toggle</strong> in the footer to change your preference anytime</li>
                            <li>Clearing browser local storage resets your preference</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-semibold text-foreground">Data Deletion</h3>
                        <p>
                            To request deletion of your data, contact:{' '}
                            <a
                                href={`mailto:${profile.email}`}
                                className="text-primary hover:underline underline-offset-2"
                            >
                                {profile.email}
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicyModal;
