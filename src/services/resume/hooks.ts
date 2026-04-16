import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
    EducationItem,
    ProjectItem,
    ResumeListItem,
    ResumeResponse,
    SkillGroupItem,
    UpdateHeaderDto,
    WorkExperienceItem,
} from '../../types/resume';
import {
    createResume,
    deleteResume,
    getActiveResume,
    getAllResumes,
    getResumeById,
    updateEducations,
    updateHeader,
    updateProjects,
    updateSkillGroups,
    updateWorkExperiences,
} from './api';

export function useGetAllResumes() {
    return useQuery<ResumeListItem[]>({
        queryKey: ['resume'],
        queryFn: getAllResumes,
    });
}

export function useGetResumeById(id: number) {
    return useQuery<ResumeResponse>({
        queryKey: ['resume', id],
        queryFn: () => getResumeById(id),
        enabled: !!id,
    });
}

export function useCreateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (resumeName: string) => createResume(resumeName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
        },
    });
}

export function useUpdateHeader() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateHeaderDto }) =>
            updateHeader(id, payload),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume', id] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useUpdateEducations() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, educations }: { id: number; educations: EducationItem[] }) =>
            updateEducations(id, educations),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume', id] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useUpdateProjects() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, projects }: { id: number; projects: ProjectItem[] }) =>
            updateProjects(id, projects),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume', id] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useUpdateSkillGroups() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, skillGroups }: { id: number; skillGroups: SkillGroupItem[] }) =>
            updateSkillGroups(id, skillGroups),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume', id] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useUpdateWorkExperiences() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            workExperiences,
        }: {
            id: number;
            workExperiences: WorkExperienceItem[];
        }) => updateWorkExperiences(id, workExperiences),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume', id] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useDeleteResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteResume(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resume'] });
            queryClient.invalidateQueries({ queryKey: ['resume/active'] });
        },
    });
}

export function useGetActiveResume() {
    return useQuery<ResumeResponse>({
        queryKey: ['resume/active'],
        queryFn: getActiveResume,
        staleTime: 0,
    });
}
