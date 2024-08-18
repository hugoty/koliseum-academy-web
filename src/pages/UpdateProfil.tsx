import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaCircleUser } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { userAtom, isLoadingUserAtom, User } from "../utils/atom/userAtom";
import Loader from "../components/Loader";
import UpdateProfilForm from "../components/UpdateProfilForm";
import { useApiUser } from "../hooks/useApiUser";

const UpdateProfil: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const isLoadingUser = useRecoilValue(isLoadingUserAtom);
    const { updateProfil } = useApiUser();
    const navigate = useNavigate();

    if (isLoadingUser) {
        return <Loader />; // Afficher le loader si en chargement
    }

    const handleSubmit = async (user: User) => {
        await updateProfil(user);
        window.location.assign("/profil");
    };

    console.log("profil : ", user);

    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            {user ? (
                <div className="w-full flex flex-col text-white">
                    <div
                        onClick={() => navigate(-1)}
                        className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
                    >
                        <FaAngleLeft />
                    </div>
                    <UpdateProfilForm onSubmit={handleSubmit} />
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

export default UpdateProfil;
