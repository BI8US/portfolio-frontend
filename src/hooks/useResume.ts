import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
    getActiveResume,
} from "../api/resumeApi";
import { ResumeItem, ResumeItemPartial } from "../types/resumeTypes";

export function useGetAllResumes() {
    return useQuery<ResumeItem[]>({
        queryKey: ["resume"],
        queryFn: getAllResumes,
    });
}

export function useGetResumeById(id: number) {
    return useQuery<ResumeItem>({
        queryKey: ["resume", id],
        queryFn: () => getResumeById(id),
        enabled: !!id,
    });
}

export function useCreateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (resume: ResumeItemPartial) => createResume(resume),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume/active"] });
        },
    });
}

export function useUpdateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, partial }: { id: number; partial: Partial<ResumeItemPartial> }) =>
            updateResume(id, partial),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
            queryClient.invalidateQueries({ queryKey: ["resume/active"] });
        },
    });
}

export function useDeleteResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteResume(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume/active"] });
        },
    });
}

export function useGetActiveResume() {
    return useQuery<ResumeItem>({
        queryKey: ["resume/active"],
        queryFn: getActiveResume,
        staleTime: 0
    });
}

