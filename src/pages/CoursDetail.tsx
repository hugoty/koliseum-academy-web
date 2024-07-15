import { useParams, useNavigate } from 'react-router-dom';
import sportsEvents from '../data/cours.json';
import { FaAngleLeft } from "react-icons/fa6";
import CardCoursDetail from '../components/CardCoursDetail';

const CoursDetail: React.FC = () => {
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
                <div onClick={() => navigate(-1)} className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer">
                    <FaAngleLeft />
                </div>
                <CardCoursDetail id={id ? id : ""} />
            </div>
    );
};

export default CoursDetail;