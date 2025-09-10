// src/features/skill/hooks/useSkill.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllSkills,
    addSkill,
    updateSkill,
    deleteSkill,
} from "../api/skillApi";
import { SkillItem } from "../types";

export function useGetAllSkills(resumeId: number) {
    return useQuery<SkillItem[]>({
        queryKey: ["skills", resumeId],
        queryFn: () => getAllSkills(resumeId),
        enabled: !!resumeId,
    });
}

export function useAddSkill(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (skill: Omit<SkillItem, "id">) => addSkill(resumeId, skill),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills", resumeId] });
        },
    });
}

export function useUpdateSkill(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ skillId, partial }: { skillId: number; partial: Partial<SkillItem> }) =>
            updateSkill(resumeId, skillId, partial),
        onSuccess: (_, { skillId }) => {
            queryClient.invalidateQueries({ queryKey: ["skills", resumeId] });
            queryClient.invalidateQueries({ queryKey: ["skill", resumeId, skillId] });
        },
    });
}

export function useDeleteSkill(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (skillId: number) => deleteSkill(resumeId, skillId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills", resumeId] });
        },
    });
}
