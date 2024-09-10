import { useNavigate } from "react-router-dom";
import CreationCoursForm from "../../components/form/CreationCoursForm"; // Assurez-vous que le chemin est correct
import { FaAngleLeft } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import { isCoach } from "../../utils/userUtils";
import { NotAuthorizedBloc } from "../../components/access/BlocNoAccessRights";

const CreationCours: React.FC = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);

    return (
        <>
            {isCoach(user) ? (
                <div className="w-full flex flex-col text-white">
                    <div
                        onClick={() => navigate(-1)}
                        className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
                    >
                        <FaAngleLeft />
                    </div>
                    <CreationCoursForm />
                </div>
            ) : (
                <NotAuthorizedBloc />
            )}
        </>
    );
};

export default CreationCours;
