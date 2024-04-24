export const TOKEN_KEY = "BibliotecaToken";
export const isAuthenticated = () => true;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};