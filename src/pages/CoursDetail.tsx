import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import sportsEvents from "../data/cours.json";
import { FaAngleLeft } from "react-icons/fa6";
import CardCoursDetail from "../components/CardCoursDetail";
import { useRecoilValue } from "recoil";
import { userAtom } from "../utils/atom/userAtom";
import { NotConnectedBloc } from "../components/BlocNoAccessRights";
import { useApiCourse } from "../hooks/useApiCours";
import { Course } from "../utils/types/types";
import Loader from "../components/Loader";

const CoursDetail: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const { fetchCourseById } = useApiCourse(); // Utiliser le hook
    const [cours, setCours] = useState<null | Course>(null); // Initialiser à un tableau vide
    const [loading, setLoading] = useState(false); // Ajouté pour suivre l'état de chargement
    const { courseId } = useParams<{ courseId: string }>();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (courseId && cours === null) {
                console.log("courseId : ", courseId);
                try {
                    const courseData = await fetchCourseById(Number(courseId));
                    if (courseData) {
                        console.log("courseData : ", courseData);
                        setCours(courseData);
                    } else {
                        // Optionnel : gérer les cas où aucun cours n'est trouvé
                        console.error("Course not found.");
                    }
                } catch (err) {
                    console.error("Failed to fetch course:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                // Optionnel : gérer les cas où l'ID du cours est manquant
                console.error("Course ID is missing.");
                setLoading(false);
            }
        };

        fetchData();
    }, [cours, courseId, fetchCourseById]);

    if (loading && cours === null) return <Loader />;

    if (cours) {
        const date = new Date(cours?.startDate);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    console.log("user id : ", user?.id);
    console.log("cours?.owner?.id : ", cours?.owner?.id);

    return (
        <>
            {user ? (
                <div className="text-white flex flex-col items-center justify-between h-full pt-4">
                    <div className="w-full flex justify-between mb-4">
                        <div
                            onClick={() => navigate(-1)}
                            className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
                        >
                            <FaAngleLeft />
                        </div>
                        {user.id === cours?.owner?.id ? (
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
                    <CardCoursDetail cours={cours} />
                </div>
            ) : (
                <NotConnectedBloc />
            )}
        </>
    );
};

export default CoursDetail;
