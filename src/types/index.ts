export interface EducationItem {
    id: number;
    school: string;
    startDate: string;
    endDate: string;
    descriptionPoints?: string[];
}

export interface MediaLinkItem {
    id: number;
    link: string;
    name: string;
}

export interface ProjectItem {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    media?: string;
}

export interface SkillItem {
    id: number;
    skillGroup: string;
    name: string;
}

export interface WorkExperienceItem {
    id: number;
    company: string;
    startDate: string;
    endDate: string;
    descriptionPoints?: string[];
}

