import { useParams, useNavigate } from "react-router-dom";
import coachsData from "../../data/coachs.json";
import { FaAngleLeft } from "react-icons/fa6";
import CardCours from "../../components/card/CardCours";
import { NotConnectedBloc } from "../../components/access/BlocNoAccessRights";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import Loader from "../../components/common/Loader";
import { useApiUser } from "../../hooks/useApiUser";
import { useEffect, useState } from "react";
import { User } from "../../utils/types/types";

import coach1 from "../../assets/coachs/coach1.jpeg";
import coach2 from "../../assets/coachs/coach2.avif";
import coach3 from "../../assets/coachs/coach3.webp";
import coach4 from "../../assets/coachs/coach4.jpg";
import coach5 from "../../assets/coachs/coach5.jpg";
import { sportsNames } from "../../utils/userUtils";
import Sports from "../sports/Sports";
import CardMyCours from "../../components/card/CardMyCours";
import defaultPP from "../../assets/user/default-pp.jpg";

const CoachDetail: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const { fetchUserById } = useApiUser();
    const [coach, setCoach] = useState<null | User>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [hasFetchedCoach, setHasFetchedCoach] = useState(false);
    const { coachId } = useParams<{ coachId: string }>();

    const [image, setImage] = useState<{ src: string } | null>(null);

    const images = [
        { src: coach1 },
        { src: coach2 },
        { src: coach3 },
        { src: coach4 },
        { src: coach5 },
    ];

    useEffect(() => {
        // Choisir une image aléatoire à chaque rendu
        const randomIndex = Math.floor(Math.random() * images.length);
        setImage(images[randomIndex]);
    }, []);

    useEffect(() => {
        const fetchCoach = async () => {
            setLoading(true);
            setFetchError(false);
            if (coachId) {
                try {
                    const coachData = await fetchUserById(Number(coachId));
                    if (!coachData) {
                        throw new Error("La récupération du coach a échoué");
                    }
                    setCoach(coachData);
                    setHasFetchedCoach(true);
                } catch (err) {
                    console.error("Failed to fetch coach:", err);
                    setFetchError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        if (user && coachId && !loading && !fetchError && !hasFetchedCoach) {
            fetchCoach();
        }
    }, [coachId, fetchUserById]);

    if (!coach) {
        return (
            <div className="text-white flex flex-col items-center justify-center h-full">
                Cours non trouvé
            </div>
        );
    }

    if (!user && !localStorage.getItem("token")) return <NotConnectedBloc />;
    if (!user && localStorage.getItem("token") && !coach) return <Loader />;

    return (
        <>
            {coach ? (
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
                                src={coach.profilePicture || defaultPP}
                                alt={`Photo de profil de ${coach.firstName} ${coach.lastName}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <h2 className=" flex-1 mb-4 text-2xl">
                        {coach.firstName} {coach.lastName}
                    </h2>
                    {coach.Sports && coach.Sports.length > 0 ? (
                        <h3 className=" flex-1 font-light mb-10 text-xl">
                            Expert en {sportsNames(coach.Sports)}
                        </h3>
                    ) : (
                        ""
                    )}
                    <span className="w-full border-b-[0.5px] border-white mb-10"></span>
                    <h3 className="w-full mb-4 text-left text-lg">
                        Prochains cours :
                    </h3>
                    {coach.ownedCourses && coach.Sports
                        ? coach.ownedCourses
                              .filter((cours) => {
                                  const currentDate = new Date(); // Date actuelle
                                  const courseStartDate = new Date(
                                      cours.startDate
                                  ); // Date de début du cours

                                  // On compare uniquement l'année, le mois et le jour
                                  const currentDateOnly = new Date(
                                      currentDate.getFullYear(),
                                      currentDate.getMonth(),
                                      currentDate.getDate()
                                  );

                                  const courseStartDateOnly = new Date(
                                      courseStartDate.getFullYear(),
                                      courseStartDate.getMonth(),
                                      courseStartDate.getDate()
                                  );

                                  return courseStartDateOnly >= currentDateOnly;
                              })
                              .map((cours, index) => (
                                  <CardMyCours
                                      key={index}
                                      id={cours.id}
                                      nom={cours.owner?.lastName}
                                      prenom={cours.owner?.firstName}
                                      position={cours.locations[0]}
                                      dateHoraire={cours.startDate}
                                      places={cours.places}
                                      remainingPlaces={cours.remainingPlaces}
                                      level={cours.levels}
                                      isActif={true}
                                  />
                              ))
                        : "Aucun cours pour le moment."}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default CoachDetail;
