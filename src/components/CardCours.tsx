import { NavLink } from "react-router-dom";
import {
    FaLocationDot,
    FaCalendar,
    FaRegClock,
    FaUsers,
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
}

const CardCours: React.FC<CardCoursProps> = ({
    id,
    nom,
    prenom,
    sport,
    position,
    dateHoraire,
    places,
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

    const isString = (value: any): value is string => typeof value === "string";

    return (
        <NavLink
            to={`/cours/${id}`}
            rel={`Cours n°${id}`}
            className="md:w-5/12 w-full rounded-lg bg-[#2c3540b5] mb-4 md:mx-4 mx-0 p-4 hover:bg-[#2c35405a]"
        >
            <h3 className="text-center font-bold">Cours de {sportsNames(cours}</h3>
            <h4 className="text-center font-light text-sm mb-4">
                {prenom} {nom}
            </h4>
            <div className="w-full flex flex-row flex-wrap justify-between text-sm">
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2">
                    <FaLocationDot className="mr-2" />
                    {position}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center">
                    <FaUsers className="mr-2" />
                    {places} participants
                </div>
            </div>
        </NavLink>
    );
};

export default CardCours;
