export interface ResumeHeaderItem {
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

export interface ResumeHeaderItemPartial {
    resumeName?: string;
    isActive?: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
}