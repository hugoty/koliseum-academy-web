import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, isConnectedAtom } from "../utils/atom/userAtom";

const Profil: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const isConnected = useRecoilValue(isConnectedAtom);
    const setIsConnected = useSetRecoilState(isConnectedAtom);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsConnected(!!token);
    }, []);

    // Fonction pour se déconnecter
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsConnected(false);
    };

    console.log("user : ", user);
    console.log("isConnected : ", isConnected);

    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            {isConnected ? (
                <div>
                    <h1>Bienvenue sur votre profil!</h1>
                    {/* Ajoutez ici le contenu du profil */}
                    <button
                        onClick={handleLogout}
                        className="mt-4 rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                    >
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <div className="w-full my-40 px-10">
                    <div className="w-full flex justify-center text-4xl mb-6">
                        <FaCircleUser />
                    </div>
                    <div className="text-center text-lg mb-6">
                        Connectez-vous pour accéder à votre profil !
                    </div>
                    <div className="w-full flex justify-center">
                        <NavLink
                            to={`/connexion`}
                            className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                        >
                            Se connecter
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;
