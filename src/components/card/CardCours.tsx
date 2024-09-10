import { NavLink } from "react-router-dom";
import {
    FaLocationDot,
    FaCalendar,
    FaRegClock,
    FaUsers,
    FaCertificate,
    FaUserClock,
} from "react-icons/fa6";

interface Sports {
    id?: number;
    description?: string;
    name?: string;
}
interface CardCoursProps {
    id?: number;
    nom?: string;
    prenom?: string;
    sport: Sports[];
    position?: string;
    dateHoraire?: Date;
    places: number;
    remainingPlaces: number;
    level: string[];
}

const CardCours: React.FC<CardCoursProps> = ({
    id,
    nom,
    prenom,
    sport,
    position,
    dateHoraire,
    places,
    remainingPlaces,
    level,
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

    return (
        <NavLink
            to={`/cours/${id}`}
            rel={`Cours n°${id}`}
            className="w-full rounded-lg bg-[#2c3540b5] mb-4 md:mx-2 mx-0 p-4 hover:bg-[#2c35405a]"
        >
            <h3 className="text-center font-bold flex-n">
                Cours de {sport[0].name}
            </h3>
            <h4 className="text-center font-light text-sm mb-4">
                {prenom} {nom}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm w-full">
                <div className="flex items-center">
                    <FaLocationDot className="mr-2" />
                    {position}
                </div>
                <div className="sm:col-start-2 flex items-center">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="flex items-center">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="sm:col-start-2 flex items-center">
                    <FaCertificate className="mr-2" />
                    niveau {level[0]}
                </div>
                <div className="col-span-2 flex items-center">
                    <FaUsers className="mr-2" />
                    {places - remainingPlaces} participants
                </div>
                <div className="col-span-2 flex items-center">
                    <FaUserClock className="mr-2" />
                    {remainingPlaces} places restantes
                </div>
            </div>
        </NavLink>
    );
};

export default CardCours;
