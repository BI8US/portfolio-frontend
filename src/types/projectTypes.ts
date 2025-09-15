export interface ProjectItem {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    media?: string;
}

export interface ProjectItemPartial {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    media?: string;
}