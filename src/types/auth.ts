export interface LoginDto {
    userName: string;
    password?: string;
}

export interface RegisterDto {
    userName: string;
    email: string;
    password?: string;
}

export interface AuthTokenPayload {
    id: number;
    userName: string;
    role: string;
}
