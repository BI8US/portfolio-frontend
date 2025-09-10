import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProjects, addProject, updateProject, deleteProject } from "../api/projectApi";
import { ProjectItem } from "../types";

export function useGetAllProjects(resumeId: number) {
    return useQuery<ProjectItem[]>({
        queryKey: ["projects", resumeId],
        queryFn: () => getAllProjects(resumeId),
        enabled: !!resumeId,
    });
}

export function useAddProject(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project: Omit<ProjectItem, "id">) => addProject(resumeId, project),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", resumeId] });
        },
    });
}

export function useUpdateProject(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ projectId, partial }: { projectId: number; partial: Partial<ProjectItem> }) =>
            updateProject(resumeId, projectId, partial),
        onSuccess: (_, { projectId }) => {
            queryClient.invalidateQueries({ queryKey: ["projects", resumeId] });
            queryClient.invalidateQueries({ queryKey: ["project", resumeId, projectId] });
        },
    });
}

export function useDeleteProject(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId: number) => deleteProject(resumeId, projectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", resumeId] });
        },
    });
}
