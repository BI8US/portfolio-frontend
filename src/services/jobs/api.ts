import type {
    CreateApplicationDto,
    JobApplicationListItem,
    JobApplicationResponse,
    UpdateApplicationDto,
} from '../../types/jobApplication';
import { api } from '../client';

export const getAllApplications = async (): Promise<JobApplicationListItem[]> => {
    const response = await api.get<JobApplicationListItem[]>('/applications');
    return response.data;
};

export const getApplicationById = async (id: number): Promise<JobApplicationResponse> => {
    const response = await api.get<JobApplicationResponse>(`/applications/${id}`);
    return response.data;
};

export const createApplication = async (
    applicationData: CreateApplicationDto,
): Promise<JobApplicationResponse> => {
    const response = await api.post<JobApplicationResponse>('/applications', applicationData);
    return response.data;
};

export const updateApplication = async (
    id: number,
    applicationData: UpdateApplicationDto,
): Promise<JobApplicationResponse> => {
    const response = await api.patch<JobApplicationResponse>(
        `/applications/${id}`,
        applicationData,
    );
    return response.data;
};

export const deleteApplication = async (id: number): Promise<void> => {
    await api.delete(`/applications/${id}`);
};
