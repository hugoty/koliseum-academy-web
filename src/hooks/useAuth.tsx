import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isConnectedAtom } from "../utils/atom/userAtom";
import { isTokenExpired } from "../utils/isTokenExpired";

export const useAuth = () => {
    const setIsConnected = useSetRecoilState(isConnectedAtom);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            if (isTokenExpired(token)) {
                setIsConnected(false);
                localStorage.removeItem("token"); // Optionnel : nettoyer le localStorage
            } else {
                // Optionnel : charger les données utilisateur si elles ne sont pas présentes
                // Exemple : fetchUserById(decodedToken.userId)
            }
        }
    }, [setIsConnected]);
};
