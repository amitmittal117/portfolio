import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { ExternalLink, Briefcase } from 'lucide-react';
import { getBadgeColor } from '@/utils/ui';

interface ExperienceCardProps {
    title: string;
    subtitle: string;
    date: string;
    description: string[];
    skills: string[];
    logo?: string;
    link?: string;
    index: number;
    delay?: number;
}

export function ExperienceCard({
    title,
    subtitle,
    date,
    description,
    skills,
    logo,
    link,
    index,
    delay
}: ExperienceCardProps) {
    return (
        <BlurFade delay={delay ?? 0.1 + index * 0.05}>
            <div className="p-4 sm:p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden p-1.5">
                            {logo ? (
                                <img
                                    src={logo}
                                    alt={subtitle}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center rounded-lg">
                                    {/* Use a generic icon if no logo. Could pass icon type as prop if needed */}
                                    <Briefcase className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                                {title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full">
                        {date}
                    </span>
                </div>

                {/* Description - show all points */}
                {description.length > 0 && (
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 mb-3">
                        {description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1 text-[10px]">●</span>
                                <span>{desc}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Skills & Link */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded-full font-medium hover:bg-blue-500/20 transition-colors"
                        >
                            <ExternalLink className="w-2.5 h-2.5" />
                            View
                        </a>
                    )}
                    {skills.slice(0, 4).map((skill, i) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className={`text-[9px] px-1.5 py-0.5 border-0 ${getBadgeColor(i)}`}
                        >
                            {skill}
                        </Badge>
                    ))}
                    {skills.length > 4 && (
                        <span className="text-[9px] text-muted-foreground">
                            +{skills.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </BlurFade>
    );
}

export default ExperienceCard;
