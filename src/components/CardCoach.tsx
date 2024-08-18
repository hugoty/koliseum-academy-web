import { NavLink } from "react-router-dom";
import { FaLocationDot, FaCalendar } from "react-icons/fa6";
import React from "react";
import { ProfilPicture } from "./ProfilPicture";

interface Cours {
    id: string;
    dateHoraire: string;
    position: string;
}

interface Coach {
    id: string;
    nom: string;
    prenom: string;
    sport: string;
    profilPicture: string;
    cours: Cours[];
}

interface CardCoachProps {
    coach: Coach;
}

const CardCoach: React.FC<CardCoachProps> = ({ coach }) => {
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
        <NavLink
            to={`/coach/${coach.id}`}
            rel={`Coach n°${coach.id}`}
            className="md:w-5/12 w-full rounded-lg bg-[#2c3540b5] mb-4 md:mx-4 mx-0 px-4 hover:bg-[#2c35405a] pt-6 pb-4"
        >
            <div className="w-full flex flex-row flex-nowrap items-center mb-4">
                <div className="mr-4">
                    <ProfilPicture
                        src={coach.profilPicture}
                        size="20"
                        alt={`Photo de profil de ${coach.prenom} ${coach.nom}`}
                    />
                </div>
                <div>
                    <h4 className="text-left font-bold">
                        {coach.prenom} {coach.nom}
                    </h4>
                    <h3 className="text-left font-light text-sm">
                        Cours de {coach.sport}
                    </h3>
                </div>
            </div>
            <p className="font-light text-sm my-4 text-center">
                Prochains cours
            </p>
            <div className="w-full flex flex-row flex-nowrap overflow-x-scroll pb-4">
                {coach.cours.map((cours) => (
                    <div
                        key={cours.id}
                        className="w-full p-4 text-xs bg-[#1f262e] rounded-2xl mr-4"
                    >
                        <div className="w-full flex flex-row flex-nowrap items-center mr-4 mb-2">
                            <FaLocationDot className="mr-2" />
                            {cours.position}
                        </div>
                        <div className="w-full flex flex-row flex-nowrap items-center">
                            <FaCalendar className="mr-2" />
                            {formatDate(cours.dateHoraire)}
                        </div>
                    </div>
                ))}
            </div>
        </NavLink>
    );
};

export default CardCoach;
