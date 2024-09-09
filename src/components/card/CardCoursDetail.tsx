import {
    FaCalendar,
    FaCheck,
    FaDoorOpen,
    FaHourglassHalf,
    FaLocationDot,
    FaRegClock,
    FaUsers,
} from "react-icons/fa6";
import { Course, SubscriptionStatus } from "../../utils/types/types";
import { isOwner, sportsNames } from "../../utils/userUtils";
import { ProfilPicture } from "../profile/ProfilPicture";
import { RxCross2 } from "react-icons/rx";
import { useApiCourse } from "../../hooks/useApiCours";
import { useState } from "react";

interface CardCoursDetailProps {
    cours: Course | null;
    userId: string;
    coursOwnerId: string;
}

const CardCoursDetail: React.FC<CardCoursDetailProps> = ({
    cours,
    userId,
    coursOwnerId,
}) => {
    const { updateSubscriptionStatus } = useApiCourse();
    const [fetchError, setFetchError] = useState<String | null>(null);

    if (!cours) {
        return <div>No course data available</div>;
    }

    const date = new Date(cours.startDate);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleStatusChange = async (
        userId: string | undefined,
        newStatus: SubscriptionStatus
    ) => {
        console.log(`Changing status to: ${newStatus} for ${userId}`);
        const success = await updateSubscriptionStatus(userId ?? "", newStatus);

        if (success) {
            //window.location.reload();;
        } else {
            console.error(
                "Erreur lors de la mise à jour du statut d'un utilisateur"
            );
            setFetchError(
                "Erreur lors de la mise à jour du statut d'un utilisateur"
            );
        }
    };

    // Vérifier si l'utilisateur est le propriétaire du cours

    console.log("cours : ", cours);
    console.log("isOwner : ", isOwner(userId, coursOwnerId));

    return (
        <div className="md:w-5/12 w-full rounded-lg bg-[#2C3540] mb-4 mx-4 p-6">
            <h3 className="text-center font-bold text-2xl">
                Cours de {sportsNames(cours.Sports)}
            </h3>
            <h4 className="text-center font-light text-lg mb-6">
                {cours.owner?.firstName} {cours.owner?.lastName}
            </h4>
            <div className="w-full flex flex-row flex-wrap justify-between text-sm">
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2">
                    <FaLocationDot className="mr-2" />
                    {cours.locations[0]}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="w-full flex flex-row flex-nowrap items-center mb-10">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2">
                    <FaUsers className="mr-2" />
                    {cours.Users?.length}{" "}
                    {cours.Users?.length && cours.Users?.length > 1
                        ? " participants"
                        : "participant"}
                </div>

                <div className="w-full flex flex-col mb-4 mt-4">
                    {cours.Users?.length && cours.Users.length > 0 ? (
                        cours.Users.map((user, index) => (
                            <div
                                key={index}
                                className="w-full flex flex-row flex-nowrap items-center mb-4"
                            >
                                <div className="mr-4">
                                    <ProfilPicture
                                        src={
                                            "https://www.fredzone.org/wp-content/uploads/2018/12/anakin-1200x675.jpg"
                                        }
                                        alt={`Photo de profil de ${user.firstName} ${user.lastName}`}
                                    />
                                </div>
                                <div className="w-full">
                                    <h4 className="text-left font-bold">
                                        {user.firstName} {user.lastName}
                                    </h4>

                                    <div className="w-full flex flex-row justify-between">
                                        <p className="flex flex-row items-center">
                                            <span className="mr-2">
                                                Statut :
                                            </span>{" "}
                                            {user.Subscription &&
                                            user.Subscription.status ===
                                                SubscriptionStatus.Pending ? (
                                                <FaHourglassHalf className="text-orange-500" />
                                            ) : (
                                                ""
                                            )}
                                            {user.Subscription &&
                                            user.Subscription.status ===
                                                SubscriptionStatus.Accepted ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                ""
                                            )}
                                            {user.Subscription &&
                                            user.Subscription.status ===
                                                SubscriptionStatus.Rejected ? (
                                                <RxCross2 className="text-red-500" />
                                            ) : (
                                                ""
                                            )}
                                            {user.Subscription &&
                                            user.Subscription.status ===
                                                SubscriptionStatus.Canceled ? (
                                                <FaDoorOpen className="text-red-500" />
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                        {/* Afficher la gestion de l'inscription si l'utilisateur est le propriétaire du cours */}
                                        {isOwner(userId, coursOwnerId) &&
                                            user.Subscription &&
                                            user.id && (
                                                <div className="flex space-x-4">
                                                    {user.Subscription
                                                        .status ===
                                                        SubscriptionStatus.Pending && (
                                                        <>
                                                            <button
                                                                className="text-green-500 underline"
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        user.id,
                                                                        SubscriptionStatus.Accepted
                                                                    )
                                                                }
                                                            >
                                                                Accepter
                                                            </button>
                                                            <button
                                                                className="text-red-500 underline"
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        user.id,
                                                                        SubscriptionStatus.Rejected
                                                                    )
                                                                }
                                                            >
                                                                Rejeter
                                                            </button>
                                                        </>
                                                    )}
                                                    {user.Subscription
                                                        .status ===
                                                        SubscriptionStatus.Accepted && (
                                                        <button
                                                            className="text-red-500 underline"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    user.id,
                                                                    SubscriptionStatus.Rejected
                                                                )
                                                            }
                                                        >
                                                            Rejeter
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                    {fetchError ? (
                                        <span>{fetchError}</span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="font-light text-center mb-4 mt-4">
                            Aucun participant ..
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardCoursDetail;
