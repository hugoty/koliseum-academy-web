
import { NavLink } from 'react-router-dom';
import { FaLocationDot, FaCalendar, FaRegClock, FaUsers } from 'react-icons/fa6';

interface CardCoursProps {
  id: string;
  nom: string;
  prenom: string;
  sport: string;
  position: string;
  dateHoraire: string;
  places: number;
}

const CardCours: React.FC<CardCoursProps> = ({ id, nom, prenom, sport, position, dateHoraire, places }) => {
  // Formater la date et l'heure
  const date = new Date(dateHoraire);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <NavLink to={`/cours/${id}`} rel={`Cours n°${id}`} className="md:w-5/12 w-full rounded-lg bg-[#2c3540b5] mb-4 mx-4 p-4 hover:bg-[#2c35405a]">
        <h3 className="text-center font-bold">Cours de {sport}</h3>
        <h4 className="text-center font-light text-sm mb-4">{prenom} {nom}</h4>
        <div className="w-full flex flex-row flex-wrap justify-between text-sm">
            <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2"><FaLocationDot className="mr-2" />{position}</div>
            <div className="flex-1 flex flex-row flex-nowrap items-center mb-2"><FaCalendar className="mr-2" />{formattedDate}</div>
            <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4"><FaRegClock className="mr-2" />{formattedTime}</div>
            <div className="flex-1 flex flex-row flex-nowrap items-center"><FaUsers className="mr-2" />{places} participants</div>
        </div>
    </NavLink>
  );
};

export default CardCours;
