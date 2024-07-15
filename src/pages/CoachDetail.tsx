import { useParams, useNavigate } from 'react-router-dom';
import sportsEvents from '../data/cours.json';
import { FaAngleLeft } from "react-icons/fa6";
import ProfilPicture from '../components/ProfilPicture';

const CoachDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const cours = sportsEvents.cours.find(event => event.id.toString() === id);
        
    if (!cours) {
        return <div className="text-white flex flex-col items-center justify-center h-full">Cours non trouvé</div>;
    }

    const { nom, prenom, sport, position, dateHoraire, places } = cours;
    const date = new Date(dateHoraire);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    return (
            <div className="text-white flex flex-col items-center justify-between h-full pt-4">
                <div onClick={() => navigate(-1)} className="hover:text-red-500 w-full text-left text-2xl mb-4">
                    <FaAngleLeft />
                </div>
                <div className='mb-6'>
                    <ProfilPicture src="https://fotografias.lasexta.com/clipping/cmsimages02/2022/11/09/BB9231C1-00FF-4618-9016-63EAAD9663FC/connor-mcgregor_98.jpg?crop=3000,1688,x0,y0&width=1900&height=1069&optimize=low&format=webply" alt={`Photo de profil de ${cours.prenom} ${cours.nom}`} />
                </div>
                <h2 className=" flex-1 mb-4 text-2xl">Cours de {cours.sport}</h2>
                <h3 className=" flex-1 font-light mb-4 text-xl">{cours.prenom} {cours.nom}</h3>
                
            </div>
    );
};

export default CoachDetail;