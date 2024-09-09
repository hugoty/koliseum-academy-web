import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaLocationDot,
    FaCalendar,
    FaRegClock,
    FaUsers,
} from "react-icons/fa6";
import { Subscription, SubscriptionStatus } from "../../utils/types/types";

interface CardCoursProps {
    id?: number;
    nom?: string;
    prenom?: string;
    position?: string;
    dateHoraire?: Date;
    places: number;
    subscription: Subscription;
    isActif?: boolean;
}

const CardCoursWithStatut: React.FC<CardCoursProps> = ({
    id,
    nom,
    prenom,
    position,
    dateHoraire,
    places,
    subscription,
    isActif = false,
}) => {
    // Formater la date et l'heure
    const date = dateHoraire ? new Date(dateHoraire) : new Date();

    // Date actuelle
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date de demain
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Formater la date
    let formattedDate;
    if (date.toDateString() === today.toDateString()) {
        formattedDate = "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        formattedDate = "Demain";
    } else {
        formattedDate = date.toLocaleDateString();
    }

    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Stepper for subscription status
    const renderStepper = () => {
        const status = subscription.status;

        if (
            status === SubscriptionStatus.Pending ||
            status === SubscriptionStatus.Accepted
        ) {
            return (
                <div className="w-full px-6">
                    <div className="w-full flex items-center mt-4 px-4">
                        {/* Step 1 */}
                        <div
                            className={`flex flex-col items-center ${
                                status === SubscriptionStatus.Pending ||
                                status === SubscriptionStatus.Accepted
                                    ? "text-green-500"
                                    : "text-gray-400"
                            }`}
                        >
                            <div className="h-4 w-4 rounded-full border-2 border-green-500 bg-green-500"></div>
                        </div>
                        {/* Line between steps */}
                        <div className="h-px w-full border-[1px] border-white mx-2 border-dashed"></div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`h-4 w-4 rounded-full border-2 ${
                                    status === SubscriptionStatus.Accepted
                                        ? "border-green-500 bg-green-500"
                                        : "border-gray-400"
                                }`}
                            ></div>
                        </div>
                    </div>{" "}
                    <div
                        className={`w-full flex flex-row flex-nowrap justify-between font-thin ${
                            status === SubscriptionStatus.Accepted
                                ? "text-green-500"
                                : "text-white-400"
                        }`}
                    >
                        <span>Pending</span>
                        <span>Accepted</span>
                    </div>
                </div>
            );
        }

        if (
            status === SubscriptionStatus.Rejected ||
            status === SubscriptionStatus.Canceled
        ) {
            return (
                <div className="flex items-center mt-4">
                    <div className="flex items-center text-red-500">
                        <div className="h-4 w-4 rounded-full border-2 border-red-500 bg-red-500"></div>
                        <span className="ml-2">
                            {status === SubscriptionStatus.Rejected
                                ? "Rejected"
                                : "Canceled"}
                        </span>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <NavLink
            to={`/cours/${id}`}
            rel={`Cours n°${id}`}
            className="md:flex-1 w-full rounded-lg bg-[#2c3540b5] mb-4 md:mx-2 mx-0 p-4 hover:bg-[#2c35405a]"
        >
            {isActif === false ? (
                <span className="flex w-full justify-center mb-4">
                    Cours terminé
                </span>
            ) : (
                ""
            )}
            <h3 className="text-center font-bold">
                {prenom} {nom}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm w-full">
                <div className="flex items-center">
                    <FaLocationDot className="mr-2" />
                    {position}
                </div>
                <div className="sm:col-start-2 flex items-center">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="flex items-center mb-4">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="sm:col-start-2 flex items-center mb-4">
                    <FaUsers className="mr-2" />
                    {places} participants
                </div>
                <div className="col-span-2 text-center">
                    <p>Statut de l'inscription</p>
                    {renderStepper()}
                </div>
            </div>
        </NavLink>
    );
};

export default CardCoursWithStatut;
