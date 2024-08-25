import {
    FaCalendar,
    FaLocationDot,
    FaRegClock,
    FaUsers,
} from "react-icons/fa6";
import { Course } from "../utils/types/types";
import { sportsNames } from "../utils/userUtils";
import { ProfilPicture } from "./ProfilPicture";

interface CardCoursDetailProps {
    cours: Course | null;
}

const CardCoursDetail: React.FC<CardCoursDetailProps> = ({ cours }) => {
    if (!cours) {
        return <div>No course data available</div>;
    }

    const date = new Date(cours.startDate);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="md:w-5/12 w-full rounded-lg bg-[#2C3540] mb-4 mx-4 p-6">
            <h3 className="text-center font-bold text-2xl">
                Cours de {sportsNames(cours.Sports)}
            </h3>
            <h4 className="text-center font-light text-lg mb-6">
                {cours.owner?.firstName} {cours.owner?.lastName}
            </h4>
            <div className="w-full flex flex-row flex-wrap justify-between text-sm">
                <div className="w-5/12 flex flex-row flex-nowrap items-center mr-4 mb-2">
                    <FaLocationDot className="mr-2" />
                    {cours.locations[0]}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2">
                    <FaCalendar className="mr-2" />
                    {formattedDate}
                </div>
                <div className="w-full flex flex-row flex-nowrap items-center mb-10">
                    <FaRegClock className="mr-2" />
                    {formattedTime}
                </div>
                <div className="flex-1 flex flex-row flex-nowrap items-center mb-2">
                    <FaUsers className="mr-2" />
                    {cours.Users?.length}{" "}
                    {cours.Users?.length && cours.Users?.length > 1
                        ? " participants"
                        : "participant"}
                </div>
                <div className="w-full flex flex-col mb-4 mt-4">
                    {cours.Users?.length && cours.Users.length > 0 ? (
                        cours.Users.map((user) => (
                            <div className="w-full flex flex-row flex-nowrap items-center mb-4">
                                <div className="mr-4">
                                    <ProfilPicture
                                        src={
                                            "https://www.fredzone.org/wp-content/uploads/2018/12/anakin-1200x675.jpg"
                                        }
                                        alt={`Photo de profil de ${user.firstName} ${user.lastName}`}
                                    />
                                </div>
                                <div>
                                    <h4 className="text-left font-bold">
                                        {user.firstName} {user.lastName}
                                    </h4>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="font-light text-center mb-4 mt-4">
                            Aucun participant ..
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardCoursDetail;
