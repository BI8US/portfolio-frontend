import type {
    EducationItem,
    ProjectItem,
    ResumeListItem,
    ResumeResponse,
    SkillGroupItem,
    UpdateHeaderDto,
    WorkExperienceItem,
} from '../../types/resume';
import { api } from '../client';

export const getAllResumes = async (): Promise<ResumeListItem[]> => {
    const response = await api.get<ResumeListItem[]>('/resume');
    return response.data;
};

export const getResumeById = async (id: number): Promise<ResumeResponse> => {
    const response = await api.get<ResumeResponse>(`/resume/${id}`);
    return response.data;
};

export const createResume = async (resumeName: string): Promise<ResumeResponse> => {
    const response = await api.post<ResumeResponse>('/resume', { resumeName });
    return response.data;
};

export const updateHeader = async (
    id: number,
    payload: UpdateHeaderDto,
): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${id}`, payload);
    return response.data;
};

export const updateEducations = async (
    id: number,
    educations: EducationItem[],
): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${id}/educations`, educations);
    return response.data;
};

export const updateProjects = async (
    id: number,
    projects: ProjectItem[],
): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${id}/projects`, projects);
    return response.data;
};

export const updateSkillGroups = async (
    id: number,
    skillGroups: SkillGroupItem[],
): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(`/resume/${id}/skills`, skillGroups);
    return response.data;
};

export const updateWorkExperiences = async (
    id: number,
    workExperiences: WorkExperienceItem[],
): Promise<ResumeResponse> => {
    const response = await api.patch<ResumeResponse>(
        `/resume/${id}/workexperiences`,
        workExperiences,
    );
    return response.data;
};

export const deleteResume = async (id: number): Promise<void> => {
    await api.delete(`/resume/${id}`);
};

export const getActiveResume = async (): Promise<ResumeResponse> => {
    const response = await api.get<ResumeResponse>(`/resume/active`);
    return response.data;
};
