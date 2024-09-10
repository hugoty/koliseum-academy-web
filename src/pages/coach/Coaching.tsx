import React, { useEffect, useState } from "react";
import CardCoach from "../../components/card/CardCoach";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import { NotConnectedBloc } from "../../components/access/BlocNoAccessRights";
import Loader from "../../components/common/Loader";
import { User } from "../../utils/types/types";
import { useApiUser } from "../../hooks/useApiUser";

const Coaching: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const { searchCoachs } = useApiUser();
    const [coachs, setCoachs] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const [hasFetchedCourses, setHasFetchedCoachs] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setFetchError(false);
            try {
                const allCoachs = await searchCoachs();
                setCoachs(allCoachs);
                setHasFetchedCoachs(true);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des coachs:",
                    error
                );
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };

        if (user && !loading && !fetchError && !hasFetchedCourses) {
            fetchCourses();
        }
    }, [user, searchCoachs]);

    if (!user && !localStorage.getItem("token")) return <NotConnectedBloc />;
    if (!user && localStorage.getItem("token")) return <Loader />;

    return (
        <>
            <h2 className="w-full text-left font-light pb-2 mb-6 mt-4 border-b-[0.5px] text-white">
                Coachs disponibles
            </h2>
            <div className="text-white flex items-center justify-center h-full">
                <div className="w-full flex flex-wrap justify-start">
                    {loading ? (
                        <Loader />
                    ) : fetchError ? (
                        <p className="font-light text-center mb-4 mt-4">
                            Erreur lors du chargement des coachings.
                        </p>
                    ) : coachs.length > 0 ? (
                        coachs.map((coach, index) => (
                            <CardCoach key={index} coach={coach} />
                        ))
                    ) : (
                        <p className="font-light text-center mb-4 mt-4">
                            Aucun cours disponible.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Coaching;
