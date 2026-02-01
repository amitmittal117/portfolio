import { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { profile } from '../../data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

export function Contact() {
    const [feedback, setFeedback] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSendFeedback = () => {
        if (!feedback.trim()) return;

        // Create mailto link with feedback
        const subject = encodeURIComponent('Portfolio Feedback');
        const body = encodeURIComponent(feedback);
        window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
    };

    const handleCopyFeedback = () => {
        if (!feedback.trim()) return;

        const text = `Feedback for ${profile.name}:\n\n${feedback}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="section border-t relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none">
                <FlickeringGrid
                    className="h-full w-full"
                    squareSize={3}
                    gridGap={4}
                    maxOpacity={0.15}
                    flickerChance={0.2}
                    style={{
                        maskImage: "linear-gradient(to bottom, black, transparent)",
                        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                    }}
                />
            </div>

            <div className="container relative z-10">
                <h2 className="section-title">Contact</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground">
                            Open to new opportunities and collaborations.
                        </p>

                        <div className="space-y-4">
                            <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                                <a href={`mailto:${profile.email}`}>
                                    <Mail className="w-4 h-4 mr-2" />
                                    {profile.email}
                                </a>
                            </Button>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg border border-border/50 max-w-fit">
                                <MapPin className="w-4 h-4 text-primary" />
                                {profile.location}
                            </div>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="space-y-4 relative group p-6 rounded-2xl border border-muted/60 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                        <div className="relative space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <MessageSquare className="w-4 h-4 text-blue-500" />
                                Quick Feedback
                            </div>
                            <Textarea
                                placeholder="Share your thoughts, questions, or feedback..."
                                rows={4}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="resize-none bg-background/50 focus:bg-background transition-colors border-muted focus:border-blue-500/50"
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSendFeedback}
                                    disabled={!feedback.trim()}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send via Email
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCopyFeedback}
                                    disabled={!feedback.trim()}
                                    className="hover:bg-muted/50"
                                >
                                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Opens your email client with the message pre-filled.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
