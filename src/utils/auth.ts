const TOKEN_KEY = "jwt";

export const setToken = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

export const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};
