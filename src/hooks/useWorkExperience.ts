import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    addWorkExperience,
    deleteWorkExperience,
    getAllWorkExperiences,
    updateWorkExperience,
} from '../api/workExperienceApi';
import { WorkExperienceItem } from '../types/workExperienceTypes';

export function useGetAllWorkExperiences(resumeId: number) {
    return useQuery<WorkExperienceItem[]>({
        queryKey: ['workExperiences', resumeId],
        queryFn: () => getAllWorkExperiences(resumeId),
        enabled: !!resumeId,
    });
}

export function useAddWorkExperience(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (workExperience: Omit<WorkExperienceItem, 'id'>) =>
            addWorkExperience(resumeId, workExperience),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workExperiences', resumeId] });
        },
    });
}

export function useUpdateWorkExperience(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            workExperienceId,
            partial,
        }: {
            workExperienceId: number;
            partial: Partial<WorkExperienceItem>;
        }) => updateWorkExperience(resumeId, workExperienceId, partial),
        onSuccess: (_, { workExperienceId }) => {
            queryClient.invalidateQueries({ queryKey: ['workExperiences', resumeId] });
            queryClient.invalidateQueries({
                queryKey: ['workExperience', resumeId, workExperienceId],
            });
        },
    });
}

export function useDeleteWorkExperience(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (workExperienceId: number) => deleteWorkExperience(resumeId, workExperienceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workExperiences', resumeId] });
        },
    });
}
