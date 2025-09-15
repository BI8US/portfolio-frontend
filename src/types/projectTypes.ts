export interface ProjectItem {
    id: number;
    title: string;
    subTitle?: string;
    description?: string;
    media?: string;
}

export interface ProjectItemPartial {
    id?: number;
    title?: string;
    subTitle?: string;
    description?: string;
    media?: string;
}