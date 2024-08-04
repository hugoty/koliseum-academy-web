import { useNavigate } from 'react-router-dom';
import CreationCoursForm from '../components/CreationCoursForm'; // Assurez-vous que le chemin est correct
import { FaAngleLeft } from 'react-icons/fa6';

const CreationCours: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col text-white">
            <div onClick={() => navigate(-1)} className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer">
                <FaAngleLeft />
            </div>
            <CreationCoursForm />
        </div>
    );
};

export default CreationCours;
