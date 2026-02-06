import { projects } from '../../data';
import { Section } from '@/components/common/Section';
import { ExperienceCard } from '@/components/cards/ExperienceCard';

export function ProjectsTimeline() {
    return (
        <Section id="projects" title="Projects">
            {/* Clean card-based grid layout - matching Experience.tsx style */}
            <div className="grid gap-4 sm:gap-6">
                {projects.map((item, index) => (
                    <ExperienceCard
                        key={`${item.title}-${index}`}
                        index={index}
                        title={item.title}
                        subtitle={item.tech || (item.skills && item.skills.slice(0, 2).join(' · '))}
                        date={item.date}
                        description={item.description}
                        skills={item.skills}
                        link={item.link}
                    />
                ))}
            </div>
        </Section>
    );
}

export default ProjectsTimeline;
