import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getAllMediaLinks,
    addMediaLink,
    updateMediaLink,
    deleteMediaLink,
} from "../api/mediaLinkApi";
import {MediaLinkItem} from "../types/mediaLinkTypes";

export function useGetAllMediaLinks(resumeId: number) {
    return useQuery<MediaLinkItem[]>({
        queryKey: ["mediaLinks", resumeId],
        queryFn: () => getAllMediaLinks(resumeId),
        enabled: !!resumeId,
    });
}

export function useAddMediaLink(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (mediaLink: Omit<MediaLinkItem, "id">) => addMediaLink(resumeId, mediaLink),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mediaLinks", resumeId] });
        },
    });
}

export function useUpdateMediaLink(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ mediaLinkId, partial }: { mediaLinkId: number; partial: Partial<MediaLinkItem> }) =>
            updateMediaLink(resumeId, mediaLinkId, partial),
        onSuccess: (_, { mediaLinkId }) => {
            queryClient.invalidateQueries({ queryKey: ["mediaLinks", resumeId] });
            queryClient.invalidateQueries({ queryKey: ["mediaLink", resumeId, mediaLinkId] });
        },
    });
}

export function useDeleteMediaLink(resumeId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (mediaLinkId: number) => deleteMediaLink(resumeId, mediaLinkId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mediaLinks", resumeId] });
        },
    });
}
