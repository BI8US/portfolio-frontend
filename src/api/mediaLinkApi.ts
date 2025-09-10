import { api } from "./client"
import { MediaLinkItem } from "../types";

export const getAllMediaLinks = async (resumeId: number): Promise<MediaLinkItem[]> => {
    const res = await api.get<MediaLinkItem[]>(`/${resumeId}/media-links`);
    return res.data;
};

export const addMediaLink = async (
    resumeId: number,
    mediaLink: Omit<MediaLinkItem, "id">
): Promise<MediaLinkItem> => {
    const res = await api.post<MediaLinkItem>(`/${resumeId}/media-links`, mediaLink);
    return res.data;
};

export const updateMediaLink = async (
    resumeId: number,
    mediaLinkId: number,
    partial: Partial<MediaLinkItem>
): Promise<MediaLinkItem> => {
    const res = await api.patch<MediaLinkItem>(`/${resumeId}/media-links/${mediaLinkId}`, partial);
    return res.data;
};

export const deleteMediaLink = async (resumeId: number, mediaLinkId: number): Promise<void> => {
    await api.delete(`/${resumeId}/media-links/${mediaLinkId}`);
};
