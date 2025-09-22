import {api} from "./client"
import {EducationItem} from "../types/educationTypes";

export const getAllEducations = async (resumeId: number): Promise<EducationItem[]> => {
    const res = await api.get<EducationItem[]>(`/resume/${resumeId}/educations`);
    return res.data;
};

export const addEducation = async (
    resumeId: number,
    education: Omit<EducationItem, "id">
): Promise<EducationItem> => {
    const res = await api.post<EducationItem>(`/resume/${resumeId}/educations`, education);
    return res.data;
};

export const updateEducation = async (
    resumeId: number,
    educationId: number,
    partial: Partial<EducationItem>
): Promise<EducationItem> => {
    const res = await api.patch<EducationItem>(`/resume/${resumeId}/educations/${educationId}`, partial);
    return res.data;
};

export const deleteEducation = async (resumeId: number, educationId: number): Promise<void> => {
    await api.delete(`/resume/${resumeId}/educations/${educationId}`);
};
