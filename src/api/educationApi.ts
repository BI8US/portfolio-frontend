import { api } from "./client"
import { EducationItem } from "../types";

export const getAllEducations = async (resumeId: number): Promise<EducationItem[]> => {
    const res = await api.get<EducationItem[]>(`/${resumeId}/educations`);
    return res.data;
};

export const addEducation = async (
    resumeId: number,
    education: Omit<EducationItem, "id">
): Promise<EducationItem> => {
    const res = await api.post<EducationItem>(`/${resumeId}/educations`, education);
    return res.data;
};

export const updateEducation = async (
    resumeId: number,
    educationId: number,
    partial: Partial<EducationItem>
): Promise<EducationItem> => {
    const res = await api.patch<EducationItem>(`/${resumeId}/educations/${educationId}`, partial);
    return res.data;
};

export const deleteEducation = async (resumeId: number, educationId: number): Promise<void> => {
    await api.delete(`/${resumeId}/educations/${educationId}`);
};
