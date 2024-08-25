import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CardCours from "../components/CardCours";
import CardCoach from "../components/CardCoach";
import coursData from "../data/cours.json";
import coachsData from "../data/coachs.json";
import SearchBarWithModal from "../components/SearchBarWithModal";

const Home: React.FC = () => {
    const [showAllCours, setShowAllCours] = useState(false);
    const [showAllCoachs, setShowAllCoachs] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState(coursData.cours);
    const [searchFilters, setSearchFilters] = useState({
        name: "",
        date: "",
        sportIds: [],
    });

    const toggleShowAllCours = () => {
        setShowAllCours(!showAllCours);
    };

    const toggleShowAllCoachs = () => {
        setShowAllCoachs(!showAllCoachs);
    };

    const handleSearch = (filters: {
        name?: string;
        date?: string;
        sportIds: number[];
    }) => {
        // traitement du listing de cours
    };

    const handleClearFilters = () => {
        setSearchFilters({
            name: "",
            date: "",
            sportIds: [],
        });
        setFilteredCourses(coursData.cours); // Réinitialiser les cours affichés
    };

    return (
        <div className="text-white flex md:flex-row flex-col items-center justify-between h-full md:flex-wrap flex-nowrap pb-10">
            <div className="w-full flex flex-col items-center">
                <SearchBarWithModal
                    onSearch={handleSearch}
                    initialFilters={searchFilters}
                    onClear={handleClearFilters}
                />

                <h2 className="w-full text-left font-light pb-2 mb-6 mt-4 border-b-[0.5px]">
                    Cours disponibles
                </h2>
                <div className="w-full flex justify-center flex-wrap">
                    {filteredCourses
                        .slice(0, showAllCours ? filteredCourses.length : 2)
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
                <button
                    onClick={toggleShowAllCours}
                    className="mt-4 rounded-lg bg-[#2c3540b5] px-4 py-2 text-white flex items-center"
                >
                    {showAllCours ? "Voir moins" : "Voir plus"}
                    {showAllCours ? (
                        <FaChevronUp className="ml-2" />
                    ) : (
                        <FaChevronDown className="ml-2" />
                    )}
                </button>
            </div>
            <div className="w-full flex flex-col items-center">
                <h2 className="w-full text-left font-light pb-2 mb-6 mt-4 border-b-[0.5px]">
                    Coachs disponibles
                </h2>
                <div className="w-full flex justify-center flex-wrap"></div>
                <button
                    onClick={toggleShowAllCoachs}
                    className="mt-4 rounded-lg bg-[#2c3540b5] px-4 py-2 text-white flex items-center"
                >
                    {showAllCoachs ? "Voir moins" : "Voir plus"}
                    {showAllCoachs ? (
                        <FaChevronUp className="ml-2" />
                    ) : (
                        <FaChevronDown className="ml-2" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Home;
