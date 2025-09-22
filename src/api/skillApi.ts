import {api} from "./client"
import {SkillItem} from "../types/skillTypes";

export const getAllSkills = async (resumeId: number): Promise<SkillItem[]> => {
    const res = await api.get<SkillItem[]>(`/resume/${resumeId}/skills`);
    return res.data;
};

export const addSkill = async (
    resumeId: number,
    skill: Omit<SkillItem, "id">
): Promise<SkillItem> => {
    const res = await api.post<SkillItem>(`/resume/${resumeId}/skills`, skill);
    return res.data;
};

export const updateSkill = async (
    resumeId: number,
    skillId: number,
    partial: Partial<SkillItem>
): Promise<SkillItem> => {
    const res = await api.patch<SkillItem>(`/resume/${resumeId}/skills/${skillId}`, partial);
    return res.data;
};

export const deleteSkill = async (resumeId: number, skillId: number): Promise<void> => {
    await api.delete(`/resume/${resumeId}/skills/${skillId}`);
};
