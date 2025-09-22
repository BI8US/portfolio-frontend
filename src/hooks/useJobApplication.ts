import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} from "../api/jobApplicationApi";
import { JobApplicationListItem, JobApplicationItem, JobApplicationItemPartial } from "../types/jobApplicationTypes";

export function useGetAllApplications() {
    return useQuery<JobApplicationListItem[]>({
        queryKey: ["jobApplications"],
        queryFn: getAllApplications,
    });
}

export function useGetApplicationById(id: number) {
    return useQuery<JobApplicationItem>({
        queryKey: ["jobApplications", id],
        queryFn: () => getApplicationById(id),
        enabled: !!id,
    });
}

export function useCreateApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (applicationData: JobApplicationItemPartial) => createApplication(applicationData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
        },
    });
}

export function useUpdateApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, applicationData }: { id: number; applicationData: JobApplicationItemPartial }) =>
            updateApplication(id, applicationData),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
            queryClient.invalidateQueries({ queryKey: ["jobApplications", id] });
        },
    });
}

export function useDeleteApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteApplication(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
        },
    });
}