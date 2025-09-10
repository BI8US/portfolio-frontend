import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllEducations,
    addEducation,
    updateEducation,
    deleteEducation,
} from "../api/educationApi";
import { EducationItem } from "../types";

export function useGetAllEducations(resumeId: number) {
    return useQuery<EducationItem[]>({
        queryKey: ["educations", resumeId],
        queryFn: () => getAllEducations(resumeId),
        enabled: !!resumeId,
    });
}

export function useAddEducation(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (education: Omit<EducationItem, "id">) => addEducation(resumeId, education),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations", resumeId] });
        },
    });
}

export function useUpdateEducation(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ educationId, partial }: { educationId: number; partial: Partial<EducationItem> }) =>
            updateEducation(resumeId, educationId, partial),
        onSuccess: (_, { educationId }) => {
            queryClient.invalidateQueries({ queryKey: ["educations", resumeId] });
            queryClient.invalidateQueries({ queryKey: ["education", resumeId, educationId] });
        },
    });
}

export function useDeleteEducation(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (educationId: number) => deleteEducation(resumeId, educationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations", resumeId] });
        },
    });
}
