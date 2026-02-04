import { education } from '../../data';
import { BlurFade } from '@/components/ui/blur-fade';
import { GraduationCap, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Color mapping for degree types
const getDegreeColor = (degree: string) => {
    const degreeLower = degree.toLowerCase();
    if (degreeLower.includes('master') || degreeLower.includes('mba') || degreeLower.includes('m.s')) {
        return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
    }
    if (degreeLower.includes('bachelor') || degreeLower.includes('b.s') || degreeLower.includes('b.tech')) {
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
    if (degreeLower.includes('certificate') || degreeLower.includes('diploma')) {
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
};

// Color mapping for skills
const getSkillColor = (skill: string) => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('python') || skillLower.includes('java') || skillLower.includes('code')) {
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }
    if (skillLower.includes('machine') || skillLower.includes('ai') || skillLower.includes('deep')) {
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (skillLower.includes('data') || skillLower.includes('analytics')) {
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
    }
    if (skillLower.includes('cloud') || skillLower.includes('aws') || skillLower.includes('azure')) {
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
    }
    return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
};

export function Education() {
    return (
        <section id="education" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Education</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {education.map((edu, index) => (
                        <BlurFade key={edu.school} delay={0.1 + index * 0.05}>
                            <Card className="h-full group relative overflow-hidden border-muted/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start gap-3">
                                        {/* Logo or fallback icon */}
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden p-1.5">
                                            {edu.logo ? (
                                                <img
                                                    src={edu.logo}
                                                    alt={edu.school}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <GraduationCap className="w-6 h-6 text-primary" />
                                            )}
                                        </div>

                                        {/* Header content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                                                {edu.school}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                <span>{edu.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {/* Degree badge */}
                                    <Badge
                                        variant="secondary"
                                        className={`text-xs border mb-3 ${getDegreeColor(edu.degree)}`}
                                    >
                                        {edu.degree}
                                    </Badge>

                                    {/* Description */}
                                    {edu.description && edu.description.length > 0 && (
                                        <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                                            {edu.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-2 leading-relaxed">
                                                    <span className="text-primary mt-1.5 text-xs">●</span>
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Skills */}
                                    {edu.skills && edu.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {edu.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className={`text-[10px] border ${getSkillColor(skill)}`}
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
