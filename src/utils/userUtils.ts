import { jwtDecode } from "jwt-decode";
import { Course, Level, Sport, User } from "../utils/types/types";

interface TokenInterface {
    id: string; // Timestamp d'expiration
    // autres champs si nécessaire
}

export const getConnectedUserId = (token: string): number => {
    try {
        const decoded = jwtDecode<TokenInterface>(token);
        return Number(decoded.id);
    } catch (error: any) {
        return error; // Si une erreur survient, considérer le token comme expiré
    }
};

export const isCoach = (user: User | null): boolean => {
    if (user && user.roles) {
        let roles: string[];

        // Si roles est une chaîne, on la parse en tableau
        if (typeof user.roles === "string") {
            try {
                roles = JSON.parse(user.roles);
            } catch (error) {
                console.error("Error parsing roles:", error);
                return false; // Si le parsing échoue, on retourne false
            }
        } else {
            roles = user.roles;
        }

        const userRole = roles.filter((role) => role === "coach");
        return userRole.length > 0;
    }
    return false;
};

export const isAdmin = (user: User | null): boolean => {
    if (user && user.roles) {
        let roles: string[];

        // Si roles est une chaîne, on la parse en tableau
        if (typeof user.roles === "string") {
            try {
                roles = JSON.parse(user.roles);
            } catch (error) {
                console.error("Error parsing roles:", error);
                return false; // Si le parsing échoue, on retourne false
            }
        } else {
            roles = user.roles;
        }

        const userAdmin = roles.filter((role) => role === "admin");
        return userAdmin.length > 0;
    }
    return false;
};

export const levelTraduction = (level: string): string => {
    let levelTraduction = "niveau inconnu";
    if (level) {
        return Level[level as keyof typeof Level];
    } else {
        return levelTraduction;
    }
};

export const getKeyLevel = (translatedLevel: string): string => {
    // Parcourez toutes les clés de l'énumération Level
    for (const key in Level) {
        // Vérifiez si la valeur de l'énumération correspond à la valeur traduite
        if (Level[key as keyof typeof Level] === translatedLevel) {
            return key; // Retournez la clé correspondante
        }
    }
    return "niveau inconnu"; // Retournez un message par défaut si aucune correspondance n'est trouvée
};

export const sportsNames = (sports: Sport[]): string => {
    return sports.map((sport) => sport.name).join(", ");
};

export const isOwner = (userId: string, coursOwnerId: string): boolean => {
    return userId === coursOwnerId;
};
