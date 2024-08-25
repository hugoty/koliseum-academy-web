// User Types
export interface Course {
    id?: number;
    startDate: Date;
    endDate: Date;
    places: number;
    locations: string[];
    levels: string[];
    price: number;
    Sports: Sport[];
    owner?: User;
    sportIds?: number[];
    Users?: User[];
}

// User Types
export enum Level {
    beginner = "beginner",
    advanced = "advanced",
    veteran = "veteran",
    expert = "expert",
}

export interface UserSport {
    id?: number;
    level: string;
}

export interface Sport {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    UserSport: UserSport;
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
    Sports?: Sport[];
}
