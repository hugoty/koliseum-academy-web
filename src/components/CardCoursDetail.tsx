
import { NavLink } from 'react-router-dom';
import { FaLocationDot, FaCalendar, FaRegClock, FaUsers } from 'react-icons/fa6';
import sportsEvents from '../data/cours.json';
import ProfilPicture from './ProfilPicture';

interface CardCoursDetailProps {
  id: string;
}

const CardCoursDetail: React.FC<CardCoursDetailProps> = ({ id }) => {
    const cours = sportsEvents.cours.find(event => event.id.toString() === id);

    if (!cours) {
        return <div className="text-white flex flex-col items-center justify-center h-full">Cours non trouvé</div>;
    }

    const { nom, prenom, sport, position, dateHoraire, places } = cours;
    
    const date = new Date(dateHoraire);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="md:w-5/12 w-full rounded-lg bg-[#2C3540] mb-4 mx-4 p-6">
            <h3 className="text-center font-bold text-2xl">Cours de {sport}</h3>
            <h4 className="text-center font-light text-lg mb-6">{prenom} {nom}</h4>
            <div className="w-full flex flex-row flex-wrap justify-between text-sm">
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2"><FaLocationDot className="mr-2" />{position}</div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2"><FaCalendar className="mr-2" />{formattedDate}</div>
                <div className="w-full flex flex-row flex-nowrap items-center mb-10"><FaRegClock className="mr-2" />{formattedTime}</div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2"><FaUsers className="mr-2" />{cours.participants.length} participants</div>
                <div className='w-full flex flex-col mb-4'>
                    {cours.participants.map((participant: any, index: any) => (
                        <NavLink to={`/user/${participant.id}`} rel={`Coach n°${participant.id}`} key={index} className="flex items-center py-2 group cursor-pointer">
                            <div className="mr-2">
                                <ProfilPicture src={participant.profilPicture} alt={`Photo de profil de ${participant.prenom} ${participant.nom}`} />
                            </div>
                            <span className="group-hover:underline">{participant.prenom} {participant.nom}</span>
                        </NavLink>
                    ))}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center"><FaUsers className="mr-2" />{cours.coachs.length} coachs</div>
                <div className='w-full flex flex-col'>
                    {cours.coachs.map((coach: any, index: any) => (
                        <NavLink to={`/coach/${coach.id}`} rel={`Coach n°${coach.id}`} key={index} className="flex items-center py-2 group cursor-pointer">
                            <div className="mr-2">
                                <ProfilPicture src={coach.profilPicture} alt={`Photo de profil de ${coach.prenom} ${coach.nom}`} />
                            </div>
                            <span className="group-hover:underline">{coach.prenom} {coach.nom}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCoursDetail;
