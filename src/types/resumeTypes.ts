export interface ResumeItem {
    id: number;
    resumeName: string;
    isActive: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResumeItemPartial {
    resumeName?: string;
    isActive?: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
}
