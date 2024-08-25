// src/hooks/useAuth.ts
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom, isLoadingUserAtom } from "../utils/atom/userAtom";
import { useApiUser } from "../hooks/useApiUser";
import { getConnectedUserId } from "../utils/userUtils";
import { isTokenExpired } from "../utils/isTokenExpired";

export const useAuth = () => {
    const setUser = useSetRecoilState(userAtom);
    const setIsLoading = useSetRecoilState(isLoadingUserAtom);
    const { fetchUserProfil } = useApiUser();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const userId = getConnectedUserId(token);
                if (userId !== null) {
                    try {
                        setIsLoading(true); // Démarrer le chargement
                        const user = await fetchUserProfil();
                        setUser(user);
                    } catch (error) {
                        console.error(
                            "Erreur lors de la récupération de l'utilisateur:",
                            error
                        );
                    } finally {
                        setIsLoading(false); // Arrêter le chargement
                    }
                }
            } else {
                console.log("isLoading en false car pas de token");

                setIsLoading(false); // Arrêter le chargement si pas de token
            }
        };

        fetchUser();
    }, [setUser, setIsLoading, fetchUserProfil]);
};
