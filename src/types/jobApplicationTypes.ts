export interface JobApplicationListItem {
    id: number;
    status: string;
    company: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobApplicationItem {
    id: number;
    link?: string;
    contact?: string;
    status: string;
    company: string;
    role: string;
    schedule?: string;
    description?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobApplicationItemPartial {
    id?: number;
    link?: string;
    contact?: string;
    status?: string;
    company?: string;
    role?: string;
    schedule?: string;
    description?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}

