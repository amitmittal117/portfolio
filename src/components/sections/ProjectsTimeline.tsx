import { projects } from '../../data';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Layers, ExternalLink } from 'lucide-react';

export function ProjectsTimeline() {
    return (
        <section id="projects" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Projects</h2>

                {/* Clean card-based grid layout - matching Experience.tsx style */}
                <div className="grid gap-4 sm:gap-6">
                    {projects.map((item, index) => (
                        <BlurFade key={`${item.title}-${index}`} delay={0.1 + index * 0.05}>
                            <div className="p-4 sm:p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden p-1.5">
                                            {/* Projects usually don't have logos in the data, using Icon */}
                                            <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center rounded-lg">
                                                <Layers className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {item.tech || (item.skills && item.skills.slice(0, 2).join(' · '))}
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
                                    {item.skills && item.skills.slice(0, 4).map((skill, i) => {
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
                                    {item.skills && item.skills.length > 4 && (
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

export default ProjectsTimeline;
