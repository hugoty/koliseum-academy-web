// src/hooks/useApiCourse.ts
import { useState } from "react";
import { Course, SubscriptionStatus } from "../utils/types/types"; // Assure-toi que le type Course est bien importé
import { isTokenExpired } from "../utils/isTokenExpired";

const BASE_URL = process.env.REACT_APP_BACK_URL || "http://localhost:3333";

export const useApiCourse = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getToken = () => {
        let token = localStorage.getItem("token");

        if (token && isTokenExpired(token)) {
            localStorage.removeItem("token");
        } else {
            return token;
        }
    };

    // Créer un cours (POST /course/create)
    const createCourse = async (newCourse: Partial<Course>) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/course/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) throw new Error("Failed to create course");
            const data = await response.json();
            setCourses([...courses, data]);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        }
    };

    // Récupérer un cours par ID (GET /course/1)
    const fetchCourseById = async (id: number) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/course/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch course");
            const data = await response.json();
            setCourse(data);
            return data;
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // S'abonner à un cours (POST /course/1/subscribe)
    const subscribeToCourse = async (id: number) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/course/${id}/subscribe`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to subscribe to course");
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        }
    };

    // Mettre à jour un cours (PUT /course/1)
    const updateCourse = async (id: string, updatedCourse: Partial<Course>) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/course/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedCourse),
            });
            if (!response.ok) throw new Error("Failed to update course");
            const data = await response.json();
            setCourse(data); // Met à jour l'état local avec le cours mis à jour
            return data;
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const addSportToCourse = async (courseId: number, sportId: number) => {
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/course/${courseId}/add-sport/${sportId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok)
                throw new Error("Failed to set a sport to a course");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du sport au cours:", error);
            throw error;
        }
    };

    // Rechercher des cours selon des critères (GET /course/search)
    const searchCoursesByCriteria = async (filters: {
        coachName: string | null;
        locations: string[];
        sports: number[];
        minDate: Date | null;
        maxDate: Date | null;
        minPlaces: number | null;
        maxPlaces: number | null;
        minRemainingPlaces: number | null;
        maxRemainingPlaces: number | null;
        levels?: string[];
    }) => {
        try {
            const token = getToken();
            const response = await fetch(`${BASE_URL}/course/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(filters),
            });
            if (!response.ok) throw new Error("Failed to search courses");
            const data = await response.json();
            setCourses(data); // Mets à jour l'état avec les cours trouvés
            return data;
        } catch (err) {
            console.error("Erreur lors de la recherche des cours:", err);
            setError((err as Error).message);
            return null;
        }
    };

    const updateSubscriptionStatus = async (
        userId: string,
        newStatus: SubscriptionStatus
    ) => {
        try {
            const token = getToken();
            let endpoint = "";

            switch (newStatus) {
                case SubscriptionStatus.Accepted:
                    endpoint = `/subscription/${userId}/accept`;
                    break;
                case SubscriptionStatus.Rejected:
                    endpoint = `/subscription/${userId}/reject`;
                    break;
                case SubscriptionStatus.Canceled:
                    endpoint = `/subscription/${userId}/cancel`;
                    break;
                default:
                    throw new Error("Invalid status");
            }

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST", // POST car tu modifies un statut
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok)
                throw new Error(
                    `Failed to update subscription status: ${newStatus}`
                );
            return true;
        } catch (err) {
            console.error("Error updating subscription status:", err);
            setError((err as Error).message);
            return false;
        }
    };

    const getSubscription = async (coursId: string) => {
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/course/${coursId}/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);
            return true;
        } catch (err) {
            console.error("Error subscribe :", err);
            setError((err as Error).message);
            return (err as Error).message;
        }
    };

    const removeSubscription = async (coursId: string) => {
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/course/${coursId}/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);
            return true;
        } catch (err) {
            console.error("Error removing subscribtion :", err);
            setError((err as Error).message);
            return (err as Error).message;
        }
    };

    return {
        courses,
        course,
        error,
        createCourse,
        fetchCourseById,
        subscribeToCourse,
        updateCourse,
        addSportToCourse,
        searchCoursesByCriteria,
        updateSubscriptionStatus,
        getSubscription,
        removeSubscription,
    };
};
