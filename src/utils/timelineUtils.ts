import type { UnifiedTimelineItem } from '../types';
import { timeline, projects, education } from '../data';

export function getUnifiedTimeline(): UnifiedTimelineItem[] {
    const unified: UnifiedTimelineItem[] = [];

    // Add Work Experience
    timeline.forEach(item => {
        unified.push({
            type: 'work',
            date: item.date,
            title: item.title,
            subtitle: item.company,
            description: item.description,
            skills: item.skills
        });
    });

    // Add Projects
    projects.forEach(item => {
        // Infer date if possible, or put "Project"
        unified.push({
            type: 'project',
            date: 'Project', // You might want to parse "2024" or similar if available
            title: item.title,
            subtitle: item.tech,
            description: item.description,
            skills: item.skills,
            link: item.link
        });
    });

    // Add Education
    education.forEach(item => {
        unified.push({
            type: 'education',
            date: item.date,
            title: item.degree,
            subtitle: item.school,
            description: item.description,
            skills: item.skills
        });
    });

    // Sort by date roughly?
    // Dates are strings like "Jan 2024 - Present", "2023 - 2025".
    // Hard to sort without parsing. 
    // I'll leave them in order of Work -> Projects -> Education for now as per user request (or explicit merge if dates parsed).
    // User said "add the expereance, projects and education in one timeline".
    // Usually means chronological.
    // Given the difficulty of parsing arbitrary string dates effectively without a library, I'll stack them for now 
    // OR I can improved sorting later.
    // However, user likely wants them interleaved.
    // I'll try a simple year extractor.

    return unified.sort((a, b) => {
        const getYear = (d: string) => {
            const match = d.match(/(\d{4})/);
            return match ? parseInt(match[1]) : 0;
        };
        const yearA = getYear(a.date);
        const yearB = getYear(b.date);
        return yearB - yearA; // Descending
    });
}
