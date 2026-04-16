import { SortDirection } from './common';

export interface CreateApplicationDto {
    company: string;
    role: string;
    status: string;
    link?: string;
    contact?: string;
    schedule?: string;
    description?: string;
    notes?: string;
}

export interface UpdateApplicationDto extends Partial<CreateApplicationDto> {}

export interface JobApplicationListItem {
    id: number;
    status: string;
    company: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobApplicationResponse {
    id: number;
    status: string;
    company: string;
    role: string;
    link?: string;
    contact?: string;
    schedule?: string;
    description?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type JobApplicationSortField = 'createdAt' | 'updatedAt' | 'company' | 'role' | 'status';

export interface JobApplicationListQuery {
    sortBy?: JobApplicationSortField;
    sortDirection?: SortDirection;
    status?: string;
}
