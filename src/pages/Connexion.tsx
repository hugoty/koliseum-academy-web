import React from "react";
import { useNavigate } from "react-router-dom";
import ConnexionForm from "../components/ConnexionForm";
import { FaAngleLeft } from "react-icons/fa6";
import { useApiUser } from "../hooks/useApiUser";

const Connexion: React.FC = () => {
    const navigate = useNavigate();
    const { login, error } = useApiUser();

    const handleLogin = async (email: string, password: string) => {
        await login(email, password);

        if (localStorage.getItem("token")) {
            navigate("/profil");
        }
    };

    return (
        <div className="w-full flex flex-col text-white">
            <div
                onClick={() => navigate(-1)}
                className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
            >
                <FaAngleLeft />
            </div>
            <ConnexionForm onSubmit={handleLogin} error={error} />
        </div>
    );
};

export default Connexion;
