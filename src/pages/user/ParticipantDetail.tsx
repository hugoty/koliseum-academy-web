import { useParams, useNavigate } from "react-router-dom";
import usersData from "../../data/users.json";
import { FaAngleLeft } from "react-icons/fa6";
import { ProfilPicture } from "../../components/profile/ProfilPicture";
import CardCours from "../../components/card/CardCours";

const CoachDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const users = usersData.users.find((event) => event.id.toString() === id);

    if (!users) {
        return (
            <div className="text-white flex flex-col items-center justify-center h-full">
                Utilisateur introuvable
            </div>
        );
    }

    return (
        <div className="text-white flex flex-col items-center justify-between h-full pt-4">
            <div
                onClick={() => navigate(-1)}
                className="hover:text-red-500 w-full text-left text-2xl mb-4"
            >
                <FaAngleLeft />
            </div>
            <div className="mb-6">
                <div className="w-36 h-36 overflow-hidden rounded-full">
                    <img
                        src={users.profilPicture}
                        alt={`Photo de profil de ${users.prenom} ${users.nom}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <h2 className=" flex-1 mb-4 text-2xl">
                {users.prenom} {users.nom}
            </h2>
            <h3 className=" flex-1 font-light mb-4 text-xl">
                Expert en {users.sport}
            </h3>
            {/* {users.cours.map((cours, index) => (
                <CardCours
                    key={index}
                    id={cours.id}
                    nom={cours.nom}
                    prenom={cours.prenom}
                    sport={cours.sport}
                    position={cours.position}
                    dateHoraire={cours.dateHoraire}
                    places={cours.places}
                />
            ))} */}
        </div>
    );
};

export default CoachDetail;
