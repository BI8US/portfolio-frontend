import {
    JobApplicationItem,
    JobApplicationItemPartial,
    JobApplicationListItem,
} from '../types/jobApplicationTypes';
import { api } from './client';

export const getAllApplications = async (): Promise<JobApplicationListItem[]> => {
    const response = await api.get<JobApplicationListItem[]>('/applications');
    return response.data;
};

export const getApplicationById = async (id: number): Promise<JobApplicationItem> => {
    const response = await api.get<JobApplicationItem>(`/applications/${id}`);
    return response.data;
};

export const createApplication = async (
    applicationData: JobApplicationItemPartial,
): Promise<JobApplicationItem> => {
    const response = await api.post<JobApplicationItem>('/applications', applicationData);
    return response.data;
};

export const updateApplication = async (
    id: number,
    applicationData: JobApplicationItemPartial,
): Promise<JobApplicationItem> => {
    const response = await api.patch<JobApplicationItem>(`/applications/${id}`, applicationData);
    return response.data;
};

export const deleteApplication = async (id: number): Promise<void> => {
    await api.delete(`/applications/${id}`);
};
