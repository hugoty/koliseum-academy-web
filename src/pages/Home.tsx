import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CardCours from "../components/CardCours";
import SearchBarWithModal from "../components/SearchBarWithModal";
import { useApiCourse } from "../hooks/useApiCours";
import Loader from "../components/Loader";
import { Course } from "../utils/types/types";

interface SearchFilters {
    coachName: string | null;
    locations: string[];
    sports: number[];
    minDate: Date | null;
    maxDate: Date | null;
    minPlaces: number | null;
    maxPlaces: number | null;
    minRemainingPlaces: number | null;
    maxRemainingPlaces: number | null;
    levels: string[];
}

const Home: React.FC = () => {
    const { searchCoursesByCriteria } = useApiCourse(); // Utiliser le hook
    const [showAllCours, setShowAllCours] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState<null | Course[]>(
        null
    ); // Initialiser à un tableau vide
    const [loading, setLoading] = useState(false); // Ajouté pour suivre l'état de chargement
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        coachName: null,
        locations: [],
        sports: [],
        minDate: null,
        maxDate: null,
        minPlaces: null,
        maxPlaces: null,
        minRemainingPlaces: null,
        maxRemainingPlaces: null,
        levels: [],
    });

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const allCourses = await searchCoursesByCriteria(searchFilters);
                setFilteredCourses(allCourses);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des cours:",
                    error
                );
                setFilteredCourses([]);
            } finally {
                setLoading(false);
            }
        };

        if (!loading && filteredCourses === null) {
            fetchCourses();
        }
    }, [searchFilters, searchCoursesByCriteria]); // Retirer 'loading' de la liste des dépendances

    const toggleShowAllCours = () => {
        setShowAllCours(!showAllCours);
    };

    // const toggleShowAllCoachs = () => {
    //     setShowAllCoachs(!showAllCoachs);
    // };

    const parseDate = (dateString: string | null): Date | null => {
        return dateString ? new Date(dateString) : null;
    };

    const handleSearch = async (filters: any) => {
        const updatedFilters: SearchFilters = {
            ...filters,
            minDate: parseDate(filters.minDate),
            maxDate: parseDate(filters.maxDate),
        };
        setSearchFilters(updatedFilters);

        try {
            const searchedCourses = await searchCoursesByCriteria(filters);
            setFilteredCourses(searchedCourses);
        } catch (error) {
            console.error("Erreur lors de la recherche des cours:", error);
        }
    };

    const handleClearFilters = async () => {
        const defaultFilters = {
            coachName: null,
            locations: [],
            sports: [],
            minDate: null,
            maxDate: null,
            minPlaces: null,
            maxPlaces: null,
            minRemainingPlaces: null,
            maxRemainingPlaces: null,
            levels: [],
        };
        setSearchFilters(defaultFilters);

        try {
            const allCourses = await searchCoursesByCriteria(defaultFilters);
            setFilteredCourses(allCourses);
        } catch (error) {
            console.error(
                "Erreur lors de la réinitialisation des filtres:",
                error
            );
        }
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
                    {loading ? (
                        <Loader /> // Afficher le Loader pendant le chargement
                    ) : filteredCourses !== null &&
                      filteredCourses.length > 0 ? (
                        filteredCourses
                            .slice(0, showAllCours ? filteredCourses.length : 2)
                            .map((cours, index) => (
                                <CardCours
                                    key={index}
                                    id={cours.id}
                                    nom={cours?.owner?.lastName}
                                    prenom={cours?.owner?.firstName}
                                    sport={cours?.Sports}
                                    position={cours.locations[0]}
                                    dateHoraire={cours.startDate}
                                    places={cours.places}
                                />
                            ))
                    ) : (
                        <p>Aucun cours disponible</p>
                    )}
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
            {/* <div className="w-full flex flex-col items-center">
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
            </div> */}
        </div>
    );
};

export default Home;
