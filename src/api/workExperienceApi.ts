import {api} from "./client"
import {WorkExperienceItem} from "../types/workExperienceTypes";

export const getAllWorkExperiences = async (resumeId: number): Promise<WorkExperienceItem[]> => {
    const res = await api.get<WorkExperienceItem[]>(`/${resumeId}/workexperience`);
    return res.data;
};

export const addWorkExperience = async (
    resumeId: number,
    workExperience: Omit<WorkExperienceItem, "id">
): Promise<WorkExperienceItem> => {
    const res = await api.post<WorkExperienceItem>(`/${resumeId}/workexperience`, workExperience);
    return res.data;
};

export const updateWorkExperience = async (
    resumeId: number,
    workExperienceId: number,
    partial: Partial<WorkExperienceItem>
): Promise<WorkExperienceItem> => {
    const res = await api.patch<WorkExperienceItem>(`/${resumeId}/workexperience/${workExperienceId}`, partial);
    return res.data;
};

export const deleteWorkExperience = async (resumeId: number, workExperienceId: number): Promise<void> => {
    await api.delete(`/${resumeId}/workexperience/${workExperienceId}`);
};
