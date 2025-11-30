import { ProjectItem } from '../types/projectTypes';
import { api } from './client';

export const getAllProjects = async (resumeId: number): Promise<ProjectItem[]> => {
    const res = await api.get<ProjectItem[]>(`/resume/${resumeId}/projects`);
    return res.data;
};

export const addProject = async (
    resumeId: number,
    project: Omit<ProjectItem, 'id'>,
): Promise<ProjectItem> => {
    const res = await api.post<ProjectItem>(`/resume/${resumeId}/projects`, project);
    return res.data;
};

export const updateProject = async (
    resumeId: number,
    projectId: number,
    partial: Partial<ProjectItem>,
): Promise<ProjectItem> => {
    const res = await api.patch<ProjectItem>(`/resume/${resumeId}/projects/${projectId}`, partial);
    return res.data;
};

export const deleteProject = async (resumeId: number, projectId: number): Promise<void> => {
    await api.delete(`/resume/${resumeId}/projects/${projectId}`);
};
