import { useParams, useNavigate } from "react-router-dom";
import coachsData from "../data/coachs.json";
import { FaAngleLeft } from "react-icons/fa6";
import CardCours from "../components/CardCours";
import { NotConnectedBloc } from "../components/BlocNoAccessRights";
import { useRecoilValue } from "recoil";
import { userAtom } from "../utils/atom/userAtom";

const CoachDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const coach = coachsData.coachs.find((event) => event.id.toString() === id);

    if (!coach) {
        return (
            <div className="text-white flex flex-col items-center justify-center h-full">
                Cours non trouvé
            </div>
        );
    }

    return (
        <>
            {user ? (
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
                                src={coach.profilPicture}
                                alt={`Photo de profil de ${coach.prenom} ${coach.nom}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <h2 className=" flex-1 mb-4 text-2xl">
                        {coach.prenom} {coach.nom}
                    </h2>
                    <h3 className=" flex-1 font-light mb-10 text-xl">
                        Expert en {coach.sport}
                    </h3>
                    <span className="w-full border-b-[0.5px] border-white mb-10"></span>
                    <h3 className="w-full mb-4 text-left text-lg">
                        Prochains cours :
                    </h3>
                    {/* {coach.cours.map((cours, index) => (
                        <CardCours
                            key={index}
                            id={cours.id}
                            nom={coach.nom}
                            prenom={coach.prenom}
                            sport={coach.Sport}
                            position={cours.position}
                            dateHoraire={cours.dateHoraire}
                            places={cours.places}
                        />
                    ))} */}
                </div>
            ) : (
                <NotConnectedBloc />
            )}
        </>
    );
};

export default CoachDetail;
