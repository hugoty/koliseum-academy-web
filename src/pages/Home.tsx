import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CardCours from "../components/CardCours";
import CardCoach from "../components/CardCoach";
import coursData from "../data/cours.json";
import coachsData from "../data/coachs.json";
import { NavLink } from "react-router-dom";
import { isCoach } from "../utils/userUtils";
import { useRecoilValue } from "recoil";
import { userAtom } from "../utils/atom/userAtom";

const Home: React.FC = () => {
    const [showAllCours, setShowAllCours] = useState(false);
    const [showAllCoachs, setShowAllCoachs] = useState(false);
    const user = useRecoilValue(userAtom);

    const toggleShowAllCours = () => {
        setShowAllCours(!showAllCours);
    };

    const toggleShowAllCoachs = () => {
        setShowAllCoachs(!showAllCoachs);
    };

    return (
        <div className="text-white flex md:flex-row flex-col items-center justify-between h-full md:flex-wrap flex-nowrap pb-10">
            {isCoach(user) ? (
                <div className="w-full flex justify-end">
                    <NavLink
                        to={`/cours/creation`}
                        rel="créer un cours"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                    >
                        Créer un cours
                    </NavLink>
                </div>
            ) : null}
            <h2 className="w-full text-left font-light pb-2 mb-6 mt-4 border-b-[0.5px]">
                Cours disponibles
            </h2>
            <div className="w-full flex justify-center flex-wrap">
                {coursData.cours
                    .slice(0, showAllCours ? coursData.cours.length : 2)
                    .map((cours, index) => (
                        <CardCours
                            key={index}
                            id={cours.id}
                            nom={cours.nom}
                            prenom={cours.prenom}
                            sport={cours.sport}
                            position={cours.position}
                            dateHoraire={cours.dateHoraire}
                            places={cours.places}
                        />
                    ))}
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={toggleShowAllCours}
                    className="mt-2 text-xl text-white flex items-center bg-[#2C3540] p-2 rounded-full hover:text-red-500"
                >
                    {showAllCours ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            <h2 className="w-full text-left font-light pb-2 my-6 border-b-[0.5px]">
                Coachs disponibles
            </h2>
            <div className="w-full flex justify-center flex-wrap">
                {coachsData.coachs
                    .slice(0, showAllCoachs ? coachsData.coachs.length : 2)
                    .map((coach, index) => (
                        <CardCoach key={index} coach={coach} />
                    ))}
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={toggleShowAllCoachs}
                    className="mt-2 text-xl text-white flex items-center bg-[#2C3540] p-2 rounded-full hover:text-red-500"
                >
                    {showAllCoachs ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
        </div>
    );
};

export default Home;
