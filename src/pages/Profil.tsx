import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const Profil: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            {isConnected ? (
                <></>
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
                            rel="créer un cours"
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
