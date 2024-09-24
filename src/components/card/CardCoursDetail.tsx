import {
    FaCalendar,
    FaCertificate,
    FaCheck,
    FaDoorOpen,
    FaHourglassHalf,
    FaLocationDot,
    FaRegClock,
    FaUserClock,
    FaUsers,
} from "react-icons/fa6";
import { Course, SubscriptionStatus } from "../../utils/types/types";
import { isOwner, sportsNames } from "../../utils/userUtils";
import { ProfilPicture } from "../profile/ProfilPicture";
import { RxCross2 } from "react-icons/rx";
import { useApiCourse } from "../../hooks/useApiCours";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUserDocs, setSelectedUserDocs] = useState<string[]>([]);

    if (!cours) {
        return <div>No course data available</div>;
    }

    const date = new Date(cours.startDate);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleOpenModal = (uploadedDocs: string[]) => {
        setSelectedUserDocs(uploadedDocs);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUserDocs([]);
    };

    const handleStatusChange = async (
        userSubscriptionId: number | undefined,
        newStatus: SubscriptionStatus
    ) => {
        console.log(
            `Changing status to: ${newStatus} for ${userSubscriptionId}`
        );
        const success = await updateSubscriptionStatus(
            String(userSubscriptionId) ?? "",
            newStatus
        );

        if (success) {
            window.location.reload();
        } else {
            console.error(
                "Erreur lors de la mise à jour du statut d'un utilisateur"
            );
            setFetchError(
                "Erreur lors de la mise à jour du statut d'un utilisateur"
            );
        }
    };

    return (
        <div className="w-full rounded-lg bg-[#2C3540] mb-4 mx-4 p-6">
            <h3 className="text-center font-bold text-2xl">
                Cours de {sportsNames(cours.Sports)}
            </h3>
            <h4 className="text-center font-light text-lg mb-6">
                {cours.owner?.firstName} {cours.owner?.lastName}
            </h4>
            {cours.detail !== "" && cours.detail !== null ? (
                <div>
                    <h4 className="text-md mb-3 flex items-center">
                        <IoIosInformationCircleOutline className="mr-1" />
                        Informations supplémentaires
                    </h4>
                    <p className="text-sm mb-4">{cours.detail}</p>
                </div>
            ) : (
                ""
            )}
            <div className="w-full flex flex-row flex-wrap justify-between text-sm">
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2">
                    <FaLocationDot className="mr-2" />
                    {cours.locations[0]}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center justify-end mb-2">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="w-5/12 flex flex-row flex-nowrap items-center mb-2">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="col-span-2 md:w-full flex items-center mb-2">
                    <FaUsers className="mr-2" />
                    {cours.places - cours.remainingPlaces} participants
                </div>
                <div className="col-span-2 md:w-full flex items-center mb-4">
                    <FaUserClock className="mr-2" />
                    {cours.remainingPlaces} places restantes
                </div>
                <div className="flex-1 flex items-center justify-end mb-2">
                    <FaCertificate className="mr-2" />
                    niveau {cours.levels[0]}
                </div>
                {!isOwner(userId ?? "", cours.owner?.id ?? "") ? (
                    <div className="w-full flex justify-center">
                        <NavLink
                            to={`/coach/${coursOwnerId}`}
                            className=" rounded-lg border-[3px] border-[#1f262e] p-2 hover:bg-[#2c35405a]"
                        >
                            Voir le coach
                        </NavLink>
                    </div>
                ) : (
                    ""
                )}
                {isOwner(userId ?? "", cours.owner?.id ?? "") ? (
                    <>
                        <div className="w-full flex flex-col mt-4">
                            {cours.Users?.length && cours.Users.length > 0 ? (
                                cours.Users.map((user, index) => (
                                    <>
                                        <div
                                            key={index}
                                            className="w-full flex flex-row flex-nowrap items-center mb-4"
                                        >
                                            <div className="mr-4">
                                                <ProfilPicture
                                                    src={user.profilePicture}
                                                    alt={`Photo de profil de ${user.firstName} ${user.lastName}`}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h4 className="text-left font-bold">
                                                    {user.firstName}{" "}
                                                    {user.lastName}
                                                </h4>

                                                <div className="w-full flex flex-col justify-between">
                                                    <div className="flex flex-row items-center">
                                                        <span className="mr-2">
                                                            Statut :
                                                        </span>{" "}
                                                        {user.Subscription &&
                                                        user.Subscription
                                                            .status ===
                                                            SubscriptionStatus.Pending ? (
                                                            <div className="flex items-center">
                                                                <span className="font-thin text-xs mr-1">
                                                                    En attente
                                                                </span>
                                                                <FaHourglassHalf className="text-orange-500" />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {user.Subscription &&
                                                        user.Subscription
                                                            .status ===
                                                            SubscriptionStatus.Accepted ? (
                                                            <div className="flex items-center">
                                                                <span className="font-thin text-xs mr-1">
                                                                    Validé
                                                                </span>
                                                                <FaCheck className="text-green-500" />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {user.Subscription &&
                                                        user.Subscription
                                                            .status ===
                                                            SubscriptionStatus.Rejected ? (
                                                            <div className="flex items-center">
                                                                <span className="font-thin text-xs mr-1">
                                                                    Refusé
                                                                </span>
                                                                <RxCross2 className="text-red-500" />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {user.Subscription &&
                                                        user.Subscription
                                                            .status ===
                                                            SubscriptionStatus.Canceled ? (
                                                            <div className="flex items-center">
                                                                <span className="font-thin text-xs mr-1">
                                                                    Abandon
                                                                </span>
                                                                <FaDoorOpen className="text-red-500" />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    {/* Afficher la gestion de l'inscription si l'utilisateur est le propriétaire du cours */}
                                                    {isOwner(
                                                        userId,
                                                        coursOwnerId
                                                    ) &&
                                                        user.Subscription &&
                                                        user.id && (
                                                            <div className="flex flex-wrap">
                                                                {user
                                                                    .Subscription
                                                                    .status ===
                                                                    SubscriptionStatus.Pending && (
                                                                    <>
                                                                        <button
                                                                            className="text-green-500 underline mr-4"
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    user
                                                                                        .Subscription
                                                                                        ?.id,
                                                                                    SubscriptionStatus.Accepted
                                                                                )
                                                                            }
                                                                        >
                                                                            Accepter
                                                                        </button>
                                                                        <button
                                                                            className="text-red-500 underline mr-4"
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    user
                                                                                        .Subscription
                                                                                        ?.id,
                                                                                    SubscriptionStatus.Rejected
                                                                                )
                                                                            }
                                                                        >
                                                                            Rejeter
                                                                        </button>
                                                                        <button
                                                                            className="w-full text-left text-blue-500 underline"
                                                                            onClick={() =>
                                                                                handleOpenModal(
                                                                                    user.uploadedDocs ??
                                                                                        []
                                                                                )
                                                                            }
                                                                        >
                                                                            Voir
                                                                            documents
                                                                        </button>
                                                                    </>
                                                                )}
                                                                {user
                                                                    .Subscription
                                                                    .status ===
                                                                    SubscriptionStatus.Accepted && (
                                                                    <>
                                                                        <button
                                                                            className="text-red-500 underline mr-4"
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    user
                                                                                        .Subscription
                                                                                        ?.id,
                                                                                    SubscriptionStatus.Rejected
                                                                                )
                                                                            }
                                                                        >
                                                                            Rejeter
                                                                        </button>
                                                                        <button
                                                                            className="text-blue-500 underline mr-4"
                                                                            onClick={() =>
                                                                                handleOpenModal(
                                                                                    user.uploadedDocs ??
                                                                                        []
                                                                                )
                                                                            }
                                                                        >
                                                                            Voir
                                                                            documents
                                                                        </button>
                                                                    </>
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
                                        <span className="w-full border-b-[0.1px] border-white mb-4"></span>
                                    </>
                                ))
                            ) : (
                                <p className="font-light text-center mb-4 mt-4">
                                    Aucun participant ..
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#1f262e] rounded-lg p-6 w-96 flex flex-col gap-4">
                        <h4 className="text-lg font-bold mb-4">
                            Documents téléchargés
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {selectedUserDocs.length > 0 ? (
                                selectedUserDocs.map((docUrl, index) => (
                                    <a
                                        key={index}
                                        href={docUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={docUrl}
                                            alt={`Document ${index + 1}`}
                                            className="w-full h-32 object-cover"
                                        />
                                    </a>
                                ))
                            ) : (
                                <p className="col-span-2">
                                    Aucun document disponible
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] text-white"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCoursDetail;
