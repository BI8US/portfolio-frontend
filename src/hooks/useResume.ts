import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getAllResumes,
    getResumeById,
    createResume,
    updateHeaderWithMediaLinks,
    updateHeader,
    updateEducations,
    updateMediaLinks,
    updateProjects,
    updateSkills,
    updateWorkExperiences,
    deleteResume,
    getActiveResume,
} from "../api/resumeApi";
import {ResumeListItem, ResumeItem} from "../types/resumeTypes";
import {ResumeHeaderItemPartial} from "../types/resumeHeaderTypes";
import {EducationItemPartial} from "../types/educationTypes";
import {MediaLinkItemPartial} from "../types/mediaLinkTypes";
import {ProjectItemPartial} from "../types/projectTypes";
import {SkillItemPartial} from "../types/skillTypes";
import {WorkExperienceItemPartial} from "../types/workExperienceTypes";

export function useGetAllResumes() {
    return useQuery<ResumeListItem[]>({
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
        mutationFn: (resumeName: string) => createResume(resumeName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
        },
    });
}

export function useUpdateHeaderWithMediaLinks() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
                         id,
                         headerPartial,
                         mediaLinks
                     }: {
            id: number;
            headerPartial: Partial<ResumeHeaderItemPartial>;
            mediaLinks: MediaLinkItemPartial[];
        }) => updateHeaderWithMediaLinks(id, headerPartial, mediaLinks),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
            queryClient.invalidateQueries({ queryKey: ["resume/active"] });
        },
    });
}

export function useUpdateHeader() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, partial }: { id: number; partial: Partial<ResumeHeaderItemPartial> }) =>
            updateHeader(id, partial),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
            queryClient.invalidateQueries({ queryKey: ["resume/active"] });
        },
    });
}

export function useUpdateEducations() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, educations }: { id: number; educations: EducationItemPartial[] }) =>
            updateEducations(id, educations),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
        },
    });
}

export function useUpdateMediaLinks() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, mediaLinks }: { id: number; mediaLinks: MediaLinkItemPartial[] }) =>
            updateMediaLinks(id, mediaLinks),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
        },
    });
}

export function useUpdateProjects() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, projects }: { id: number; projects: ProjectItemPartial[] }) =>
            updateProjects(id, projects),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
        },
    });
}

export function useUpdateSkills() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, skills }: { id: number; skills: SkillItemPartial[] }) =>
            updateSkills(id, skills),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
        },
    });
}

export function useUpdateWorkExperiences() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, workExperiences }: { id: number; workExperiences: WorkExperienceItemPartial[] }) =>
            updateWorkExperiences(id, workExperiences),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["resume"] });
            queryClient.invalidateQueries({ queryKey: ["resume", id] });
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

