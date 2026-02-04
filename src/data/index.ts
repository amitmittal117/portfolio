// Central data export for easy importing throughout the app
import profileData from './profile.json';
import skillsData from './skills.json';
import timelineData from './timeline.json';
import certificatesData from './certificates.json';
import blogData from './blog.json';
import projectsData from './projects.json';
import educationData from './education.json';

import type { Profile, SkillsData, SkillCategory, TimelineItem, Certificate, BlogPost, Education, Project } from '../types';

export const profile: Profile = profileData;
export const skillsCategories: SkillCategory[] = (skillsData as SkillsData).categories;
export const timeline: TimelineItem[] = timelineData.timeline;
export const certificates: Certificate[] = certificatesData.certificates;
export const blogPosts: BlogPost[] = blogData.blogPosts;
export const projects: Project[] = projectsData.projects as Project[];
export const education: Education[] = educationData.education;

// Combined portfolio data object for convenience
export const portfolioData = {
    profile,
    skillsCategories,
    certificates,
    timeline,
    projects,
    education,
    blogPosts,
};

export default portfolioData;
