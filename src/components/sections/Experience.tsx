import { timeline } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';
import { Briefcase, Calendar } from 'lucide-react';

export function Experience() {
    return (
        <section id="experience" className="section border-t">
            <div className="container">
                <h2 className="section-title">Experience</h2>

                <div className="grid gap-4">
                    {timeline.map((item, index) => (
                        <BlurFade key={`${item.company}-${item.date}`} delay={0.25 + index * 0.05}>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-lg">{item.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <Briefcase className="w-4 h-4" />
                                                {item.company}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="w-fit flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {item.date}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                                        {item.description.map((desc, i) => (
                                            <li key={i}>• {desc}</li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-1">
                                        {item.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="outline"
                                                className="text-xs hover:bg-primary/10 hover:border-primary transition-colors cursor-default"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section >
    );
}

export default Experience;
