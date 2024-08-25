import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import sportsData from "../data/sports.json";
import { RxCross2 } from "react-icons/rx";

// Définir les types pour les options de sport
interface SportOption {
    value: number;
    label: string;
}

interface SearchBarWithModalProps {
    onSearch: (filters: {
        name?: string;
        date?: string;
        sportIds: number[];
    }) => void;
    initialFilters?: {
        name?: string;
        date?: string;
        sportIds: number[];
    };
    onClear: () => void;
}

const SearchBarWithModal: React.FC<SearchBarWithModalProps> = ({
    onSearch,
    initialFilters,
    onClear,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [selectedSports, setSelectedSports] = useState<SportOption[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    // Calculer sportOptions une seule fois
    const sportOptions: SportOption[] = React.useMemo(() => {
        return sportsData.map((sport) => ({
            value: sport.id,
            label: sport.label,
        }));
    }, []);

    // Ouvrir la modale
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Fermer la modale
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Réinitialiser les champs de recherche dans la modale
    useEffect(() => {
        if (initialFilters) {
            setSearchTerm(initialFilters.name || "");
            setSearchDate(initialFilters.date || "");
            setSelectedSports(
                sportOptions.filter((option) =>
                    initialFilters.sportIds.includes(option.value)
                )
            );
        }
    }, [initialFilters, sportOptions]);

    // Gérer le clic en dehors de la modale pour la fermer
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Gérer les changements dans les champs de recherche
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchDate(event.target.value);
    };

    const handleSportChange = (selectedOptions: any) => {
        setSelectedSports(selectedOptions || []);
    };

    const handleSubmit = () => {
        const sportIds = selectedSports.map((sport) => sport.value);
        onSearch({
            name: searchTerm,
            date: searchDate,
            sportIds,
        });
        handleCloseModal();
    };

    const handleClear = () => {
        setSearchTerm("");
        setSearchDate("");
        setSelectedSports([]);
        onClear(); // Réinitialiser les filtres dans la page principale
        handleCloseModal();
    };

    const isSubmitDisabled =
        !searchTerm && !searchDate && selectedSports.length === 0;

    return (
        <div className="relative w-full max-w-md mt-2 mb-6">
            <button
                onClick={handleOpenModal}
                className="rounded-lg bg-[#2c3540b5] px-4 py-2 w-full flex items-center justify-between"
            >
                <span>Rechercher</span>
                <FaSearch />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg w-full max-w-md relative"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <RxCross2 className="fill-black" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            Recherche Avancée
                        </h2>
                        <input
                            type="text"
                            placeholder="Rechercher par nom..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="rounded-lg bg-[#f5f5f5] px-4 py-2 w-full mb-2"
                        />
                        <input
                            type="date"
                            value={searchDate}
                            onChange={handleDateChange}
                            className="rounded-lg bg-[#f5f5f5] px-4 py-2 w-full mb-2"
                        />
                        <Select
                            className="mb-4"
                            isMulti
                            value={selectedSports}
                            onChange={handleSportChange}
                            options={sportOptions}
                            placeholder="Sélectionner des sports..."
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled}
                                className={`w-full rounded-lg px-4 py-2 text-white ${
                                    isSubmitDisabled
                                        ? "bg-gray-400"
                                        : "bg-[#2c3540b5] hover:bg-[#2c35405a]"
                                }`}
                            >
                                Rechercher
                            </button>
                            <button
                                onClick={handleClear}
                                className="w-full rounded-lg px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                            >
                                Effacer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBarWithModal;
