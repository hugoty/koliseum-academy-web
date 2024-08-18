import { atom } from "recoil";

export enum Level {
    Beginner = "beginner",
    Advanced = "advanced",
    Veteran = "veteran",
    Expert = "expert",
}

export interface Course {
    id: number;
    startDate: Date;
    endDate: Date;
    places: number;
    location: string;
    price: number;
    levels: Level[];
    ownerId: number;
}

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    dateOfBirth?: string | Date | null;
    roles?: string[]; // Liste des rôles de l'utilisateur (e.g., ["student", "coach"])
    createdAt?: Date;
    updatedAt?: Date;
    courses?: Course[]; // Liste des cours associés à l'utilisateur
    sports?: string[];
}

export const userAtom = atom<User | null>({
    key: "userAtom", // Un identifiant unique pour cet atom
    default: null, // Valeur par défaut (aucun utilisateur connecté)
});

export const isLoadingUserAtom = atom<boolean>({
    key: "isLoadingUserAtom",
    default: true, // Début avec un état de chargement activé
});
