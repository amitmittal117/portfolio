import { getUnifiedTimeline } from '../../utils/timelineUtils';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Briefcase, GraduationCap, Layers } from 'lucide-react';

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
                <h2 className="section-title">My Journey</h2>

                <div className="relative ml-6 md:ml-12 space-y-12 pl-8 md:pl-12 py-4">
                    {/* Timeline Items */}
                    {timelineData.map((item, index) => (
                        <BlurFade key={`${item.title}-${index}`} delay={0.1 + index * 0.05}>
                            <div className="relative">
                                {/* Timeline Dot/Icon */}
                                <div
                                    className="absolute -left-[52px] md:-left-[73px] top-0 bg-background border rounded-full p-2 text-muted-foreground shadow-sm h-10 w-10 md:h-12 md:w-12 flex items-center justify-center z-10"
                                >
                                    {getIcon(item.type)}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-muted-foreground font-medium">
                                        {item.date}
                                    </span>
                                    <h3 className="text-xl font-bold leading-none text-foreground dark:text-blue-400">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm text-muted-foreground">
                                        {item.subtitle}
                                    </span>

                                    <div className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                                        <ul className="space-y-1">
                                            {item.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {(item.skills.length > 0 || item.link) && (
                                        <div className="mt-4 flex flex-wrap items-center gap-2">
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs px-2.5 py-1 rounded-full transition-colors mr-2 font-medium"
                                                >
                                                    <Layers className="w-3 h-3" />
                                                    View Project
                                                </a>
                                            )}
                                            {item.skills.map((skill, i) => {
                                                const colors = [
                                                    "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                                                    "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
                                                    "bg-green-500/10 text-green-500 hover:bg-green-500/20",
                                                    "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
                                                    "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
                                                    "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
                                                ];
                                                const colorClass = colors[i % colors.length];
                                                return (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className={`text-[10px] px-2 py-0.5 border-0 ${colorClass}`}
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section >
    );
}

export default Timeline;
