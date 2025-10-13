export interface EducationItem {
    id: number;
    school: string;
    educationName: string;
    startDate: string;
    endDate?: string;
    descriptionPoints?: EducationDescriptionPoint[];
}

export interface EducationItemPartial {
    id?: number;
    school?: string;
    educationName?: string;
    startDate?: string;
    endDate?: string;
    descriptionPoints?: EducationDescriptionPoint[];
}

export interface EducationDescriptionPoint {
    id: number;
    educationEntityId: number;
    descriptionPoint: string;
}
