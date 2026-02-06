import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string[];
    skills: string[];
    link?: string;
    index: number;
    delay?: number;
}

export function ProjectCard({
    title,
    subtitle,
    description,
    skills,
    link,
    index,
    delay
}: ProjectCardProps) {
    return (
        <BlurFade delay={delay ?? 0.25 + index * 0.05}>
            <div className="flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-primary/30 hover:shadow-lg transition-all duration-200 bg-card group">
                {/* Image placeholder / gradient header */}
                <div className="relative shrink-0 h-32 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center">
                    <span className="text-4xl opacity-50">🚀</span>

                    {/* Links overlay */}
                    {link && (
                        <div className="absolute top-2 right-2 flex gap-2">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium">
                                {subtitle}
                            </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                    </div>

                    <div className="text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
                        <Markdown>
                            {description.join(' ')}
                        </Markdown>
                    </div>

                    {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-auto pt-2">
                            {skills.slice(0, 5).map((skill) => (
                                <Badge
                                    key={skill}
                                    className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                                    variant="outline"
                                >
                                    {skill}
                                </Badge>
                            ))}
                            {skills.length > 5 && (
                                <Badge
                                    className="text-[11px] font-medium border border-border h-6 w-fit px-2 text-muted-foreground"
                                    variant="outline"
                                >
                                    +{skills.length - 5}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </BlurFade>
    );
}

export default ProjectCard;
