import {api} from "./client";
import {ResumeListItem, ResumeItem} from "../types/resumeTypes";
import {ResumeHeaderItemPartial} from "../types/resumeHeaderTypes";
import {EducationItemPartial} from "../types/educationTypes";
import {MediaLinkItemPartial} from "../types/mediaLinkTypes";
import {ProjectItemPartial} from "../types/projectTypes";
import {SkillItemPartial} from "../types/skillTypes";
import {WorkExperienceItemPartial} from "../types/workExperienceTypes";

export const getAllResumes = async (): Promise<ResumeListItem[]> => {
    const response = await api.get<ResumeListItem[]>("/resume");
    return response.data;
};

export const getResumeById = async (id: number): Promise<ResumeItem> => {
    const response = await api.get<ResumeItem>(`/resume/${id}`);
    return response.data;
};

export const createResume = async (resumeName: string): Promise<ResumeItem> => {
    const response = await api.post<ResumeItem>("/resume", {resumeName}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const updateHeaderWithMediaLinks = async (
    id: number,
    headerPartial: Partial<ResumeHeaderItemPartial>,
    mediaLinks: MediaLinkItemPartial[]
): Promise<ResumeItem> => {
    const payload = {
        ...headerPartial,
        mediaLinks
    };

    const response = await api.patch<ResumeItem>(`/resume/${id}`, payload);
    return response.data;
};

export const updateHeader = async (id: number, partial: Partial<ResumeHeaderItemPartial>): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}`, partial);
    return response.data;
};

export const updateEducations = async (id: number, educations: EducationItemPartial[]): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}/educations`, educations);
    return response.data;
};

export const updateMediaLinks = async (id: number, mediaLinks: MediaLinkItemPartial[]): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}/medialinks`, mediaLinks);
    return response.data;
};

export const updateProjects = async (id: number, projects: ProjectItemPartial[]): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}/projects`, projects);
    return response.data;
};

export const updateSkills = async (id: number, skills: SkillItemPartial[]): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}/skills`, skills);
    return response.data;
};

export const updateWorkExperiences = async (id: number, workExperiences: WorkExperienceItemPartial[]): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}/workexperiences`, workExperiences);
    return response.data;
};

export const deleteResume = async (id: number): Promise<void> => {
    await api.delete(`/resume/${id}`);
};

export const getActiveResume = async (): Promise<ResumeItem> => {
    const response = await api.get<ResumeItem>(`/resume/active`);
    return response.data;
}
