export interface WorkExperienceItem {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    descriptionPoints?: WorkExperienceDescriptionPoint[];
}

export interface WorkExperienceItemPartial {
    id?: number;
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    descriptionPoints?: WorkExperienceDescriptionPoint[];
}

export interface WorkExperienceDescriptionPoint {
    id: number;
    educationEntityId: number;
    descriptionPoint: string;
}

