import { SortDirection } from './common';

export interface CreateResumeDto {
    resumeName: string;
}

export interface ResumeChildItem {
    id?: number;
    sortOrder: number;
}

export interface EducationItem extends ResumeChildItem {
    school: string;
    educationName: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface MediaLinkItem extends ResumeChildItem {
    name: string;
    link: string;
}

export interface ProjectItem extends ResumeChildItem {
    title: string;
    subTitle: string;
    description: string;
    media: string;
}

export interface WorkExperienceItem extends ResumeChildItem {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface SkillItem extends ResumeChildItem {
    name: string;
}

export interface SkillGroupItem extends ResumeChildItem {
    name: string;
    skills: SkillItem[];
}

export interface UpdateHeaderDto {
    resumeName?: string;
    isActive?: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
    location?: string | null;
    intro?: string | null;
    mediaLinks?: MediaLinkItem[];
}

export type UpdateEducationsDto = EducationItem[];
export type UpdateProjectsDto = ProjectItem[];
export type UpdateSkillGroupsDto = SkillGroupItem[];
export type UpdateWorkExperiencesDto = WorkExperienceItem[];

export interface ResumeListItem {
    id: number;
    resumeName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ResumeResponse {
    id: number;
    resumeName: string;
    isActive: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
    location?: string;
    intro?: string;
    createdAt: string;
    updatedAt: string;

    educations: EducationItem[];
    mediaLinks: MediaLinkItem[];
    projects: ProjectItem[];
    skillGroups: SkillGroupItem[];
    workExperiences: WorkExperienceItem[];
}

export type ResumeSortField = 'createdAt' | 'updatedAt' | 'resumeName' | 'isActive';

export interface ResumeListQuery {
    sortBy?: ResumeSortField;
    sortDirection?: SortDirection;
}
