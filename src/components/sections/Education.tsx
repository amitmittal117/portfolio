import { education } from '../../data';
import { BlurFade } from '@/components/ui/blur-fade';
import { GraduationCap, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Education() {
    return (
        <section id="education" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Education</h2>

                <div className="flex flex-col gap-6 sm:gap-8">
                    {education.map((edu, index) => (
                        <BlurFade
                            key={edu.school}
                            delay={0.25 + index * 0.1}
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 group text-center sm:text-left">
                                {/* Icon/Logo placeholder */}
                                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm group-hover:bg-primary/20 transition-colors">
                                    <GraduationCap className="w-6 h-6 text-primary" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                        <h3 className="font-semibold text-base sm:text-lg leading-tight text-foreground">
                                            {edu.school}
                                        </h3>
                                        <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-muted-foreground tabular-nums">
                                            <Calendar className="w-3 h-3" />
                                            <span>{edu.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-2">
                                        {edu.degree}
                                    </p>

                                    {edu.description && edu.description.length > 0 && (
                                        <ul className="text-sm text-muted-foreground/80 space-y-0.5 mb-3 text-left">
                                            {edu.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {edu.skills && edu.skills.length > 0 && (
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                                            {edu.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="text-xs border-border/50 text-muted-foreground"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
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

export default Education;
