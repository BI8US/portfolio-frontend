import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
    CreateApplicationDto,
    JobApplicationListItem,
    JobApplicationResponse,
    UpdateApplicationDto,
} from '../../types/jobApplication';
import {
    createApplication,
    deleteApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
} from './api';

export function useGetAllApplications() {
    return useQuery<JobApplicationListItem[]>({
        queryKey: ['jobApplications'],
        queryFn: getAllApplications,
    });
}

export function useGetApplicationById(id: number) {
    return useQuery<JobApplicationResponse>({
        queryKey: ['jobApplications', id],
        queryFn: () => getApplicationById(id),
        enabled: !!id,
    });
}

export function useCreateApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (applicationData: CreateApplicationDto) => createApplication(applicationData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
        },
    });
}

export function useUpdateApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            applicationData,
        }: {
            id: number;
            applicationData: UpdateApplicationDto;
        }) => updateApplication(id, applicationData),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
            queryClient.invalidateQueries({ queryKey: ['jobApplications', id] });
        },
    });
}

export function useDeleteApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteApplication(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
        },
    });
}
