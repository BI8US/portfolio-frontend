import { MediaLinkItem } from '../types/mediaLinkTypes';
import { api } from './client';

export const getAllMediaLinks = async (resumeId: number): Promise<MediaLinkItem[]> => {
    const res = await api.get<MediaLinkItem[]>(`/resume/${resumeId}/media-links`);
    return res.data;
};

export const addMediaLink = async (
    resumeId: number,
    mediaLink: Omit<MediaLinkItem, 'id'>,
): Promise<MediaLinkItem> => {
    const res = await api.post<MediaLinkItem>(`/resume/${resumeId}/media-links`, mediaLink);
    return res.data;
};

export const updateMediaLink = async (
    resumeId: number,
    mediaLinkId: number,
    partial: Partial<MediaLinkItem>,
): Promise<MediaLinkItem> => {
    const res = await api.patch<MediaLinkItem>(
        `/resume/${resumeId}/media-links/${mediaLinkId}`,
        partial,
    );
    return res.data;
};

export const deleteMediaLink = async (resumeId: number, mediaLinkId: number): Promise<void> => {
    await api.delete(`/resume/${resumeId}/media-links/${mediaLinkId}`);
};
