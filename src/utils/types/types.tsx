// User Types
export interface Course {
    id?: number;
    startDate: Date;
    endDate: Date;
    places: number;
    remainingPlaces: number;
    locations: string[];
    levels: string[];
    price: number;
    Sports: Sport[];
    owner?: User;
    sportIds?: number[];
    Users?: User[];
    Subscription: Subscription;
}

// User Types
export enum Level {
    beginner = "beginner",
    advanced = "advanced",
    veteran = "veteran",
    expert = "expert",
}

export enum SubscriptionStatus {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected",
    Canceled = "canceled",
}

export interface Subscription {
    id?: number;
    status: string;
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
    Courses?: Course[]; // Liste des cours associés à l'utilisateur
    ownedCourses?: Course[]; // Liste des cours créés par cet utilisateur
    Sports?: Sport[];
    sports?: { id: number }[];
    Subscription?: Subscription;
}
