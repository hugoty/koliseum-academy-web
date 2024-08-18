import { jwtDecode } from "jwt-decode";
import { User } from "./atom/userAtom";

interface TokenInterface {
    id: string; // Timestamp d'expiration
    // autres champs si nécessaire
}

export const getConnectedUserId = (token: string): number => {
    try {
        const decoded = jwtDecode<TokenInterface>(token);
        console.log("userUtils | user id : ", decoded.id);
        return Number(decoded.id);
    } catch (error: any) {
        return error; // Si une erreur survient, considérer le token comme expiré
    }
};

export const isCoach = (user: User | null): boolean => {
    if (user && user.roles) {
        const userRole = user.roles.filter((role) => role === "coach");
        return userRole.length > 0;
    }
    return false;
};
