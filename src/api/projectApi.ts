import {api} from "./client"
import {ProjectItem} from "../types/projectTypes";

export const getAllProjects = async (resumeId: number): Promise<ProjectItem[]> => {
    const res = await api.get<ProjectItem[]>(`/${resumeId}/projects`);
    return res.data;
};

export const addProject = async (
    resumeId: number,
    project: Omit<ProjectItem, "id">
): Promise<ProjectItem> => {
    const res = await api.post<ProjectItem>(`/${resumeId}/projects`, project);
    return res.data;
};

export const updateProject = async (
    resumeId: number,
    projectId: number,
    partial: Partial<ProjectItem>
): Promise<ProjectItem> => {
    const res = await api.patch<ProjectItem>(`/${resumeId}/projects/${projectId}`, partial);
    return res.data;
};

export const deleteProject = async (resumeId: number, projectId: number): Promise<void> => {
    await api.delete(`/${resumeId}/projects/${projectId}`);
};
