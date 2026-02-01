import { getUnifiedTimeline } from '../../utils/timelineUtils';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Briefcase, GraduationCap, Layers, ExternalLink } from 'lucide-react';

export function Timeline() {
    const timelineData = getUnifiedTimeline();

    const getIcon = (type: string) => {
        switch (type) {
            case 'work': return <Briefcase className="w-4 h-4" />;
            case 'project': return <Layers className="w-4 h-4" />;
            case 'education': return <GraduationCap className="w-4 h-4" />;
            default: return <Briefcase className="w-4 h-4" />;
        }
    };

    return (
        <section id="experience" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">My Journey</h2>

                {/* Clean card-based grid layout */}
                <div className="grid gap-4 sm:gap-6">
                    {timelineData.map((item, index) => (
                        <BlurFade key={`${item.title}-${index}`} delay={0.1 + index * 0.05}>
                            <div className="p-4 sm:p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-lg p-2 shrink-0">
                                            {getIcon(item.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full">
                                        {item.date}
                                    </span>
                                </div>

                                {/* Description - just first point on mobile */}
                                {item.description.length > 0 && (
                                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {item.description[0]}
                                    </p>
                                )}

                                {/* Skills & Link */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded-full font-medium hover:bg-blue-500/20 transition-colors"
                                        >
                                            <ExternalLink className="w-2.5 h-2.5" />
                                            View
                                        </a>
                                    )}
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

export default Timeline;
