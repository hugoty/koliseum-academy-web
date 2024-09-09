import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { NavLink } from "react-router-dom";
import { userAtom, isLoadingUserAtom } from "../../utils/atom/userAtom";
import Loader from "../../components/common/Loader";
import { NotConnectedBloc } from "../../components/access/BlocNoAccessRights";
import { isCoach } from "../../utils/userUtils";
import CardCoursWithStatut from "../../components/card/CardCoursWithStatut";
import CardMyCours from "../../components/card/CardMyCours";
import { Course } from "../../utils/types/types";

const Planning: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const isLoadingUser = useRecoilValue(isLoadingUserAtom);
    const [activeTab, setActiveTab] = useState<"inscrit" | "mesCours">(
        "inscrit"
    );

    if (isLoadingUser) {
        return <Loader />;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isToday = (date: Date) => {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return date >= today && date < tomorrow;
    };

    const isFuture = (date: Date) => {
        return date > today;
    };

    const isPast = (date: Date) => {
        return date < today;
    };

    // Listes des cours inscrits par date
    const todayCourses: Course[] = [];
    const upcomingCourses: Course[] = [];
    const pastCourses: Course[] = [];

    // Listes des cours créés par date
    const todayOwnedCourses: Course[] = [];
    const upcomingOwnedCourses: Course[] = [];
    const pastOwnedCourses: Course[] = [];

    if (!user && !localStorage.getItem("token")) return <NotConnectedBloc />;
    if (!user && localStorage.getItem("token")) return <Loader />;

    (user?.Courses || []).forEach((cours) => {
        const coursDate = new Date(cours.startDate);
        if (isToday(coursDate)) {
            todayCourses.push(cours);
        } else if (isFuture(coursDate)) {
            upcomingCourses.push(cours);
        } else if (isPast(coursDate)) {
            pastCourses.push(cours);
        }
    });

    (user?.ownedCourses || []).forEach((cours) => {
        const coursDate = new Date(cours.startDate);
        if (isToday(coursDate)) {
            todayOwnedCourses.push(cours);
        } else if (isFuture(coursDate)) {
            upcomingOwnedCourses.push(cours);
        } else if (isPast(coursDate)) {
            pastOwnedCourses.push(cours);
        }
    });

    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            {user ? (
                <>
                    {/* Nav for tabs */}
                    <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => setActiveTab("inscrit")}
                            className={`px-4 py-2 hover:font-bold hover:border-b-[1px] ${
                                activeTab === "inscrit"
                                    ? "border-b-[1px] font-bold"
                                    : ""
                            }`}
                        >
                            Inscriptions
                        </button>
                        <button
                            onClick={() => setActiveTab("mesCours")}
                            className={`px-4 py-2 hover:font-bold hover:border-b-[1px] ${
                                activeTab === "mesCours"
                                    ? "border-b-[1px] font-bold"
                                    : ""
                            }`}
                        >
                            Mes cours
                        </button>
                    </div>

                    {/* Conditional rendering based on selected tab */}
                    {activeTab === "inscrit" ? (
                        <>
                            {/* Cours d'aujourd'hui */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Aujourd'hui
                                </h2>
                                {todayCourses.length > 0 ? (
                                    todayCourses.map((cours, index) => (
                                        <CardCoursWithStatut
                                            key={index}
                                            id={cours.id}
                                            nom={cours?.owner?.lastName}
                                            prenom={cours?.owner?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            subscription={cours.Subscription}
                                            isActif={true}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun cours aujourd'hui ..
                                    </p>
                                )}
                            </div>

                            {/* Prochains cours */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Prochains jours
                                </h2>
                                {upcomingCourses.length > 0 ? (
                                    upcomingCourses.map((cours, index) => (
                                        <CardCoursWithStatut
                                            key={index}
                                            id={cours.id}
                                            nom={cours?.owner?.lastName}
                                            prenom={cours?.owner?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            subscription={cours.Subscription}
                                            isActif={true}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun cours à venir ..
                                    </p>
                                )}
                            </div>

                            {/* Anciens cours */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Anciens cours
                                </h2>
                                {pastCourses.length > 0 ? (
                                    pastCourses.map((cours, index) => (
                                        <CardCoursWithStatut
                                            key={index}
                                            id={cours.id}
                                            nom={cours?.owner?.lastName}
                                            prenom={cours?.owner?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            subscription={cours.Subscription}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun ancien cours ..
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Cours d'aujourd'hui */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Aujourd'hui
                                </h2>
                                {todayOwnedCourses.length > 0 ? (
                                    todayOwnedCourses.map((cours, index) => (
                                        <CardMyCours
                                            key={index}
                                            id={cours.id}
                                            nom={user?.lastName}
                                            prenom={user?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            remainingPlaces={
                                                cours.remainingPlaces
                                            }
                                            level={cours.levels}
                                            isActif={true}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun cours aujourd'hui ..
                                    </p>
                                )}
                            </div>

                            {/* Prochains cours */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Prochains jours
                                </h2>
                                {upcomingOwnedCourses.length > 0 ? (
                                    upcomingOwnedCourses.map((cours, index) => (
                                        <CardMyCours
                                            key={index}
                                            id={cours.id}
                                            nom={user?.lastName}
                                            prenom={user?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            remainingPlaces={
                                                cours.remainingPlaces
                                            }
                                            level={cours.levels}
                                            isActif={true}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun cours à venir ..
                                    </p>
                                )}
                            </div>

                            {/* Anciens cours */}
                            <div className="w-full flex flex-col justify-center flex-wrap">
                                <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">
                                    Anciens cours
                                </h2>
                                {pastOwnedCourses.length > 0 ? (
                                    pastOwnedCourses.map((cours, index) => (
                                        <CardMyCours
                                            key={index}
                                            id={cours.id}
                                            nom={user?.lastName}
                                            prenom={user?.firstName}
                                            position={cours.locations[0]}
                                            dateHoraire={cours.startDate}
                                            places={cours.places}
                                            remainingPlaces={
                                                cours.remainingPlaces
                                            }
                                            level={cours.levels}
                                        />
                                    ))
                                ) : (
                                    <p className="font-light text-center mb-4 mt-4">
                                        Aucun ancien cours ..
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <NotConnectedBloc />
            )}
        </div>
    );
};

export default Planning;
