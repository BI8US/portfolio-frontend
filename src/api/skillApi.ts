import { api } from "./client"
import { SkillItem } from "../types";

export const getAllSkills = async (resumeId: number): Promise<SkillItem[]> => {
    const res = await api.get<SkillItem[]>(`/${resumeId}/skills`);
    return res.data;
};

export const addSkill = async (
    resumeId: number,
    skill: Omit<SkillItem, "id">
): Promise<SkillItem> => {
    const res = await api.post<SkillItem>(`/${resumeId}/skills`, skill);
    return res.data;
};

export const updateSkill = async (
    resumeId: number,
    skillId: number,
    partial: Partial<SkillItem>
): Promise<SkillItem> => {
    const res = await api.patch<SkillItem>(`/${resumeId}/skills/${skillId}`, partial);
    return res.data;
};

export const deleteSkill = async (resumeId: number, skillId: number): Promise<void> => {
    await api.delete(`/${resumeId}/skills/${skillId}`);
};
