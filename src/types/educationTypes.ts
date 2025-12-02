export interface EducationItem {
    id: number;
    school: string;
    educationName: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface EducationItemPartial {
    id?: number;
    school?: string;
    educationName?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}
