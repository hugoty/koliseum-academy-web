import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    exp: number; // Timestamp d'expiration
    // autres champs si nécessaire
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000; // Convertir en secondes
        return decoded.exp < currentTime;
    } catch (error) {
        return true; // Si une erreur survient, considérer le token comme expiré
    }
};
