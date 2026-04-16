export interface ErrorResponse {
    error?: string;
    message?: string;
}

export interface IdParams {
    id: string;
}

export type SortDirection = 'asc' | 'desc';
