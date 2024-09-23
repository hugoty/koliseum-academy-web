import React, { useEffect, useState } from "react";
import {
    useParams,
    useNavigate,
    NavLink,
    useSearchParams,
} from "react-router-dom";
import sportsEvents from "../../data/cours.json";
import { FaAngleLeft } from "react-icons/fa6";
import CardCoursDetail from "../../components/card/CardCoursDetail";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import { NotConnectedBloc } from "../../components/access/BlocNoAccessRights";
import { useApiCourse } from "../../hooks/useApiCours";
import { Course } from "../../utils/types/types";
import Loader from "../../components/common/Loader";
import { isAdmin, isCoach, isOwner } from "../../utils/userUtils";

const CoursDetail: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const { fetchCourseById } = useApiCourse();
    const [cours, setCours] = useState<null | Course>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [hasFetchedCours, setHasFetchedCours] = useState(false);
    const { courseId } = useParams<{ courseId: string }>();
    const { getSubscription, removeSubscription } = useApiCourse();
    const [fetchSubscriptionError, setFetchSubscriptionError] =
        useState<String | null>(null);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams(); // Utilisation de useSearchParams pour récupérer les paramètres d'URL
    const souscrit = searchParams.get("souscrit") === "true"; // Récupérer le paramètre 'souscrit'

    useEffect(() => {
        const fetchCours = async () => {
            setLoading(true);
            setFetchError(false);
            if (courseId) {
                try {
                    const courseData = await fetchCourseById(Number(courseId));
                    if (!courseData) {
                        throw new Error("La récupération du cours a échoué");
                    }
                    setCours(courseData);
                    setHasFetchedCours(true);
                } catch (err) {
                    console.error("Failed to fetch course:", err);
                    setFetchError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        if (user && courseId && !loading && !fetchError && !hasFetchedCours) {
            fetchCours();
        }
    }, [courseId, fetchCourseById]);

    if (loading && cours === null) return <Loader />;

    if (cours) {
        const date = new Date(cours?.startDate);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const handleSubscribe = async (coursId: string) => {
        const response = await getSubscription(coursId ?? "");

        if (response === true) {
            navigate("/planning");
        } else {
            console.error(
                "Erreur lors de la mise à jour du statut d'un utilisateur"
            );
            setFetchSubscriptionError(`Erreur : ${response}`);
        }
    };

    const handleUnsubscribe = async (userId: string) => {
        const response = await removeSubscription(userId ?? "");

        if (response !== true) {
            navigate("/planning");
        } else {
            console.error(`${response}`);
            navigate("/planning");
        }
    };

    if (!user && !localStorage.getItem("token")) return <NotConnectedBloc />;
    if (!user && localStorage.getItem("token")) return <Loader />;

    return (
        <>
            {cours != null ? (
                <div className="text-white flex flex-col items-center justify-between h-full pt-4">
                    <div className="w-full flex justify-between items-center mb-4">
                        <div
                            onClick={() => navigate(-1)}
                            className="hover:text-red-500 w-full text-left text-2xl cursor-pointer"
                        >
                            <FaAngleLeft />
                        </div>
                        {cours.id !== undefined &&
                        !isOwner(user?.id ?? "", cours.owner?.id ?? "") &&
                        !souscrit ? (
                            <div>
                                <button
                                    onClick={() =>
                                        handleSubscribe(String(cours.id))
                                    }
                                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                        {!isOwner(user?.id ?? "", cours.owner?.id ?? "") &&
                        souscrit ? (
                            <>
                                <button
                                    onClick={() =>
                                        handleUnsubscribe(String(user?.id))
                                    }
                                    className="rounded-lg bg-[#2c3540b5] px-6 py-2 hover:bg-[#2c35405a] whitespace-nowrap"
                                >
                                    Se désinscrire
                                </button>
                                {fetchSubscriptionError !== null ? (
                                    <>{fetchSubscriptionError}</>
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            ""
                        )}
                        {user?.id === cours?.owner?.id || isAdmin(user) ? (
                            <div>
                                <NavLink
                                    to={`/cours/modification/${cours?.id}`}
                                    rel="créer un cours"
                                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] mr-2"
                                >
                                    Modifier
                                </NavLink>
                                <NavLink
                                    to={`/cours/delete`}
                                    rel="Supprimer"
                                    className="rounded-lg bg-[#402c2eb5] px-4 py-2 hover:bg-[#2c35405a]"
                                >
                                    Supprimer
                                </NavLink>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    {fetchSubscriptionError !== null ? (
                        <span className="text-red-600 mb-4">
                            {fetchSubscriptionError}
                        </span>
                    ) : (
                        ""
                    )}
                    {user?.id && cours.owner?.id ? (
                        <CardCoursDetail
                            cours={cours}
                            userId={user.id}
                            coursOwnerId={cours.owner.id}
                        />
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default CoursDetail;
