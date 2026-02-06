import { timeline } from '../../data';
import { Section } from '@/components/common/Section';
import { ExperienceCard } from '@/components/cards/ExperienceCard';

export function Experience() {
    return (
        <Section id="experience" title="Experience">
            <div className="grid gap-4 sm:gap-6">
                {timeline.map((item, index) => (
                    <ExperienceCard
                        key={`${item.title}-${index}`}
                        index={index}
                        title={item.title}
                        subtitle={item.company}
                        date={item.date}
                        description={item.description}
                        skills={item.skills}
                        logo={item.logo}
                    />
                ))}
            </div>
        </Section>
    );
}

export default Experience;
