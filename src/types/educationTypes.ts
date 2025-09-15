export interface EducationItem {
    id: number;
    school: string;
    educationName: string;
    startDate: string;
    endDate?: string;
    descriptionPoints?: string[];
}

export interface EducationItemPartial {
    id?: number;
    school?: string;
    educationName?: string;
    startDate?: string;
    endDate?: string;
    descriptionPoints?: string[];
}