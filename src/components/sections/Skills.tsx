import { skillsCategories } from '../../data';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';

export function Skills() {
    return (
        <section id="skills" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Skills</h2>

                <div className="space-y-6">
                    {skillsCategories.map((category, index) => (
                        <BlurFade key={category.name} delay={0.25 + index * 0.05}>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                                <span className="text-base sm:text-lg font-semibold text-muted-foreground sm:w-32 shrink-0 flex items-center gap-2">
                                    <span>{category.icon}</span>
                                    {category.name}
                                </span>
                                <div className="flex flex-wrap gap-2 flex-1">
                                    {category.skills.map((skill) => (
                                        <Badge
                                            key={skill.name}
                                            variant="secondary"
                                            className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all cursor-default flex items-center gap-1"
                                        >
                                            {skill.icon && (
                                                <span className="text-sm sm:text-base">{skill.icon}</span>
                                            )}
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
