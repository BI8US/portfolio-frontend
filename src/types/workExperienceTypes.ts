export interface WorkExperienceItem {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    descriptionPoints?: string[];
}

export interface WorkExperienceItemPartial {
    id?: number;
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    descriptionPoints?: string[];
}
