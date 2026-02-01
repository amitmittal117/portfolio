// Type definitions for portfolio data

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface Profile {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    location: string;
    social: SocialLink[];
    resumeUrl: string;
    profileImage: string;
}

export interface Skill {
    name: string;
    icon: string;
}

export interface SkillCategory {
    name: string;
    icon: string;
    skills: Skill[];
}

export interface SkillsData {
    categories: SkillCategory[];
}

export interface Certificate {
    date: string;
    title: string;
    company: string;
    description: string;
    publicUrl: string;
    skills: string[];
    image: string;
}

export interface TimelineItem {
    date: string;
    title: string;
    company: string;
    description: string[];
    skills: string[];
}

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    readTime: string;
    author: string;
    authorRole: string;
    excerpt: string;
    tags: string[];
}

export interface Project {
    title: string;
    tech: string;
    description: string[];
    skills: string[];
    link: string;
}

export interface Education {
    degree: string;
    school: string;
    date: string;
    description: string[];
    skills: string[];
}

export interface UnifiedTimelineItem {
    type: 'work' | 'education' | 'project';
    date: string;
    title: string;
    subtitle: string;
    description: string[];
    skills: string[];
    link?: string;
    image?: string;
}

export interface PortfolioData {
    profile: Profile;
    skillsCategories: SkillCategory[];
    certificates: Certificate[];
    timeline: TimelineItem[];
    projects: Project[];
    education: Education[];
    blogPosts: BlogPost[];
}
