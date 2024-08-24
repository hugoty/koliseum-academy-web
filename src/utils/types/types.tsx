// User Types
export interface Course {
    id?: number;
    startDate: Date;
    endDate: Date;
    places: number;
    location: string;
    levels: Level[];
    price: number;
    sportIds: number[];
    ownerId?: number;
}

// User Types
export enum Level {
    beginner = "beginner",
    advanced = "advanced",
    veteran = "veteran",
    expert = "expert",
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
