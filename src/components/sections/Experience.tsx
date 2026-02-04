import { timeline } from '../../data';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Briefcase } from 'lucide-react';

export function Experience() {
    return (
        <section id="experience" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Experience</h2>

                {/* Clean card-based grid layout */}
                <div className="grid gap-4 sm:gap-6">
                    {timeline.map((item, index) => (
                        <BlurFade key={`${item.title}-${index}`} delay={0.1 + index * 0.05}>
                            <div className="p-4 sm:p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden p-1.5">
                                            {item.logo ? (
                                                <img
                                                    src={item.logo}
                                                    alt={item.company}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center rounded-lg">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {item.company}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full">
                                        {item.date}
                                    </span>
                                </div>

                                {/* Description - show all points */}
                                {item.description.length > 0 && (
                                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 mb-3">
                                        {item.description.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-primary mt-1 text-[10px]">●</span>
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Skills & Link */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {item.skills.slice(0, 4).map((skill, i) => {
                                        const colors = [
                                            "bg-purple-500/10 text-purple-500",
                                            "bg-green-500/10 text-green-500",
                                            "bg-orange-500/10 text-orange-500",
                                            "bg-cyan-500/10 text-cyan-500",
                                        ];
                                        return (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className={`text-[9px] px-1.5 py-0.5 border-0 ${colors[i % colors.length]}`}
                                            >
                                                {skill}
                                            </Badge>
                                        )
                                    })}
                                    {item.skills.length > 4 && (
                                        <span className="text-[9px] text-muted-foreground">
                                            +{item.skills.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
