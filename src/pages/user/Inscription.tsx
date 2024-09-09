import { useNavigate } from "react-router-dom";
import InscriptionForm from "../../components/form/InscriptionForm";
import { FaAngleLeft } from "react-icons/fa6";
import { useApiUser } from "../../hooks/useApiUser";

const Inscription: React.FC = () => {
    const navigate = useNavigate();
    const { createUser } = useApiUser();

    const handleCreateUser = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        const success = await createUser({
            email,
            password,
            firstName,
            lastName,
        });

        if (success) {
            navigate("/connexion");
        } else {
            console.error("Erreur lors de la création de l'utilisateur");
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
            <InscriptionForm onSubmit={handleCreateUser} />
        </div>
    );
};

export default Inscription;
