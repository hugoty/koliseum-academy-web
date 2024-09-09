import { useState } from "react";
import { isTokenExpired } from "../utils/isTokenExpired";
import { User } from "../utils/types/types";

interface ApiError {
    message: string;
}

// URL de base pour les requêtes API
const BASE_URL = "http://localhost:3333";

export const useApiUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState<ApiError | null>(null);

    const getToken = () => {
        let token = localStorage.getItem("token");

        if (token && isTokenExpired(token)) {
            localStorage.removeItem("token");
        } else {
            return token;
        }
    };

    // Login user (POST to /auth)
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok)
                throw new Error("Email ou mot de passe incorrect");
            const data: { token: string } = await response.json();
            localStorage.setItem("token", data.token);
            setError(null); // Clear error on successful login
            return { success: true };
        } catch (err) {
            setError({ message: (err as Error).message });
            return { success: false };
        }
    };

    // Fetch all users (GET)
    const fetchUserProfil = async () => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error("No token found");
            }
            const response = await fetch(`${BASE_URL}/user/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 403)
                throw new Error("Access forbidden: Invalid token");
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error in fetchUserProfil:", err);
            throw err;
        }
    };

    // Fetch a single user by ID (GET)
    const fetchUserById = async (id: number | null) => {
        try {
            const token = getToken();
            if (id == null) throw new Error("user id is null");
            const response = await fetch(`${BASE_URL}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch user");
            const data = await response.json();
            return data;
        } catch (err) {
            setError({ message: (err as Error).message });
        }
    };

    // Create a new user (POST)
    const createUser = async (newUser: User) => {
        try {
            const response = await fetch(`${BASE_URL}/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) throw new Error("Failed to create user");
            const data = await response.json();
            setUsers([...users, data]);
            return true;
        } catch (err) {
            setError({ message: (err as Error).message });
            return false;
        }
    };

    // Update an existing user (PUT)
    const updateProfil = async (updatedUser: Partial<User>) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/user/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) throw new Error("Failed to update user");
            const data = await response.json();
            return data;
        } catch (err) {
            setError({ message: (err as Error).message });
        }
    };

    return {
        users,
        user,
        error,
        login,
        fetchUserProfil,
        fetchUserById,
        createUser,
        updateProfil,
    };
};
