import { api } from "./client";
import { ResumeItem, ResumeItemPartial } from "../types/resumeTypes";

export const getAllResumes = async (): Promise<ResumeItem[]> => {
    const response = await api.get<ResumeItem[]>("/resume");
    return response.data;
};

export const getResumeById = async (id: number): Promise<ResumeItem> => {
    const response = await api.get<ResumeItem>(`/resume/${id}`);
    return response.data;
};

export const createResume = async (resume: ResumeItemPartial): Promise<ResumeItem> => {
    const response = await api.post<ResumeItem>("/resume", resume);
    return response.data;
};

export const updateResume = async (id: number, partial: Partial<ResumeItemPartial>): Promise<ResumeItem> => {
    const response = await api.patch<ResumeItem>(`/resume/${id}`, partial);
    return response.data;
};

export const deleteResume = async (id: number): Promise<void> => {
    await api.delete(`/resume/${id}`);
};

export const getActiveResume = async (): Promise<ResumeItem> => {
    const response = await api.get<ResumeItem>(`/resume/active`);
    return response.data;
}
