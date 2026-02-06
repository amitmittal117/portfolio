import { projects } from '../../data';
import { Section } from '@/components/common/Section';
import { ProjectCard } from '@/components/cards/ProjectCard';

export function Projects() {
    return (
        <Section id="projects" title="Projects">
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        index={index}
                        title={project.title}
                        subtitle={`${project.date}${project.tech ? ` · ${project.tech}` : ''}`}
                        description={project.description}
                        skills={project.skills}
                        link={project.link}
                    />
                ))}
            </div>
        </Section>
    );
}

export default Projects;
