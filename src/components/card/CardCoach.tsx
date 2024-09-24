import { NavLink } from "react-router-dom";
import { FaLocationDot, FaCalendar } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { ProfilPicture } from "../profile/ProfilPicture";
import { Course, User } from "../../utils/types/types";

import coach1 from "../../assets/coachs/coach1.jpeg";
import coach2 from "../../assets/coachs/coach2.avif";
import coach3 from "../../assets/coachs/coach3.webp";
import coach4 from "../../assets/coachs/coach4.jpg";
import coach5 from "../../assets/coachs/coach5.jpg";
interface CardCoachProps {
    coach: User;
}

const CardCoach: React.FC<CardCoachProps> = ({ coach }) => {
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

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const formattedDate = date.toLocaleDateString("fr-FR", options); // Date formatée en string
        const formattedTime = date.toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
        }); // Heure formatée en string
        const dayOfWeek =
            formattedDate.charAt(0).toUpperCase() +
            formattedDate.slice(1).split(" ")[0]; // Récupérer le jour de la semaine
        const dayOfMonth = formattedDate.split(" ")[1]; // Récupérer le jour du mois
        return `${dayOfWeek} ${dayOfMonth} à ${formattedTime}`; // Format final
    };

    return (
        <>
            {coach ? (
                <NavLink
                    to={`/coach/${coach.id}`}
                    rel={`Coach n°${coach.id}`}
                    className="md:flex-1 w-full rounded-lg bg-[#2c3540b5] mb-4 md:mx-2 mx-0 px-4 hover:bg-[#2c35405a] pt-6 pb-4"
                >
                    <div className="w-full flex flex-row flex-nowrap items-center mb-4">
                        <div className="mr-4">
                            <ProfilPicture
                                src={coach.profilePicture}
                                size="20"
                                alt={`Photo de profil de ${coach.firstName} ${coach.lastName}`}
                            />
                        </div>
                        <div>
                            <h4 className="text-left font-bold">
                                {coach.firstName} {coach.lastName}
                            </h4>
                            <h3 className="text-left font-light text-sm">
                                {coach &&
                                coach.Sports &&
                                coach.Sports.length > 0
                                    ? `Cours de ${coach.Sports[0].name}`
                                    : ""}
                            </h3>
                        </div>
                    </div>
                    <p className="font-light text-sm my-4 text-center">
                        Prochains cours
                    </p>
                    <div className="w-full flex flex-row flex-nowrap overflow-x-scroll pb-4">
                        {coach?.ownedCourses &&
                        coach?.ownedCourses.length > 0 &&
                        coach?.ownedCourses.filter((cours) => {
                            const currentDate = new Date(); // Date actuelle
                            const courseStartDate = new Date(cours.startDate); // Date de début du cours

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
                        }).length > 0 ? (
                            coach?.ownedCourses
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

                                    return (
                                        courseStartDateOnly >= currentDateOnly
                                    );
                                })
                                .map((cours) => (
                                    <div
                                        key={cours.id}
                                        className="w-full p-4 text-xs bg-[#1f262e] rounded-2xl mr-4"
                                    >
                                        <div className="w-full flex flex-row flex-nowrap items-center mr-4 mb-2">
                                            <FaLocationDot className="mr-2" />
                                            {cours.locations}
                                        </div>
                                        <div className="w-full flex flex-row flex-nowrap items-center">
                                            <FaCalendar className="mr-2" />
                                            {formatDate(
                                                String(cours.startDate)
                                            )}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <span className="w-full text-center text-xs">
                                Aucun cours prévus
                            </span>
                        )}
                    </div>
                </NavLink>
            ) : (
                <p>Aucun coach</p>
            )}
        </>
    );
};

export default CardCoach;
