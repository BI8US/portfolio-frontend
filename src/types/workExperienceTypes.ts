export interface WorkExperienceItem {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface WorkExperienceItemPartial {
    id?: number;
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}
