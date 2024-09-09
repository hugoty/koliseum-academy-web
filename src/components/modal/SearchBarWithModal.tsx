import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import sportsData from "../../data/sports.json";
import { RxCross2 } from "react-icons/rx";
import { Level } from "../../utils/types/types";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import { NavLink } from "react-router-dom";

interface SportOption {
    value: number;
    label: string;
}

interface SearchBarWithModalProps {
    onSearch: (filters: {
        coachName?: string | null;
        locations?: string[];
        sports?: number[];
        minDate?: Date | null;
        maxDate?: Date | null;
        minPlaces?: number | null;
        maxPlaces?: number | null;
        minRemainingPlaces?: number | null;
        maxRemainingPlaces?: number | null;
        levels?: string[];
    }) => void;
    initialFilters?: {
        coachName?: string | null;
        locations?: string[];
        sports?: number[];
        minDate?: Date | null;
        maxDate?: Date | null;
        minPlaces?: number | null;
        maxPlaces?: number | null;
        minRemainingPlaces?: number | null;
        maxRemainingPlaces?: number | null;
        levels?: string[];
    };
    onClear: () => void;
}

const SearchBarWithModal: React.FC<SearchBarWithModalProps> = ({
    onSearch,
    initialFilters,
    onClear,
}) => {
    const user = useRecoilValue(userAtom);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coachName, setCoachName] = useState("");
    const [searchDate, setSearchDate] = useState<string | Date>("");
    const [selectedSports, setSelectedSports] = useState<SportOption[]>([]);
    const [minPlaces, setMinPlaces] = useState<number | null>(null);
    const [maxPlaces, setMaxPlaces] = useState<number | null>(null);
    const [levels, setLevels] = useState<string[]>([]);

    const modalRef = useRef<HTMLDivElement>(null);

    const sportOptions: SportOption[] = React.useMemo(() => {
        return sportsData.map((sport) => ({
            value: sport.id,
            label: sport.label,
        }));
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (initialFilters) {
            setCoachName(initialFilters.coachName || "");
            setSearchDate(initialFilters.minDate || "");
            setSelectedSports(
                sportOptions.filter((option) =>
                    initialFilters.sports?.includes(option.value)
                )
            );
            setMinPlaces(initialFilters.minPlaces || null);
            setMaxPlaces(initialFilters.maxPlaces || null);
            setLevels(initialFilters.levels || []);
        }
    }, [initialFilters, sportOptions]);

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

    const handleCoachNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCoachName(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchDate(event.target.value);
    };

    const handleSportChange = (selectedOptions: any) => {
        setSelectedSports(selectedOptions || []);
    };

    const handleMinPlacesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMinPlaces(Number(event.target.value) || null);
    };

    const handleMaxPlacesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMaxPlaces(Number(event.target.value) || null);
    };

    const handleLevelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const level = event.target.value;
        setLevels((prevLevels) =>
            prevLevels.includes(level)
                ? prevLevels.filter((l) => l !== level)
                : [...prevLevels, level]
        );
    };

    const handleSubmit = () => {
        const sportIds = selectedSports.map((sport) => sport.value);
        const levelKeys = levels.map((level) => level);
        const filters = {
            coachName,
            sports: sportIds,
            minDate: searchDate ? new Date(searchDate) : null,
            maxDate: searchDate ? new Date(searchDate) : null,
            minPlaces,
            maxPlaces,
            levels: levelKeys,
        };
        onSearch(filters);
        handleCloseModal();
    };

    const handleClear = () => {
        setCoachName("");
        setSearchDate("");
        setSelectedSports([]);
        setMinPlaces(null);
        setMaxPlaces(null);
        setLevels([]);
        onClear();
        handleCloseModal();
    };

    const isSubmitDisabled =
        !coachName &&
        !searchDate &&
        selectedSports.length === 0 &&
        minPlaces === undefined &&
        maxPlaces === undefined &&
        levels.length === 0;

    const today = new Date().toISOString().split("T")[0];

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
                        className="bg-[#1f262e] p-6 rounded-lg w-full max-w-md relative mx-4"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-5 text-white"
                        >
                            <RxCross2 className="fill-black text-2xl" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Recherche Avancée
                        </h2>
                        <input
                            type="text"
                            placeholder="Nom du coach..."
                            value={coachName}
                            onChange={handleCoachNameChange}
                            className="rounded-lg bg-[#2c3540b5] text-white px-4 py-2 w-full mb-4"
                        />
                        <input
                            type="date"
                            value={String(searchDate)}
                            onChange={handleDateChange}
                            className="rounded-lg bg-[#2c3540b5] px-4 py-2 w-full mb-4"
                            min={today}
                        />
                        <Select
                            className="mb-4"
                            isMulti
                            value={selectedSports}
                            onChange={handleSportChange}
                            options={sportOptions}
                            placeholder="Sélectionner des sports..."
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "#2c3540b5",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    color: "white",
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? "#3b4a5a"
                                        : "#2c3540b5",
                                    color: "white",
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#3b4a5a",
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    backgroundColor: "#3b4a5a",
                                    color: "white",
                                }),
                                multiValueRemove: (base) => ({
                                    ...base,
                                    color: "white",
                                    ":hover": {
                                        backgroundColor: "#3b4a5a",
                                        color: "white",
                                    },
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#2c3540",
                                    borderRadius: "0.5rem",
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Places minimum"
                            value={minPlaces || ""}
                            onChange={handleMinPlacesChange}
                            className="rounded-lg rounded-lg bg-[#2c3540b5] px-4 py-2 w-full mb-4"
                        />
                        <input
                            type="number"
                            placeholder="Places maximum"
                            value={maxPlaces || ""}
                            onChange={handleMaxPlacesChange}
                            className="rounded-lg rounded-lg bg-[#2c3540b5] px-4 py-2 w-full mb-4"
                        />
                        <div className="mb-4">
                            <label className="block font-medium mb-4">
                                Niveau :
                            </label>
                            <div className="flex flex-wrap">
                                {Object.keys(Level).map((level) => (
                                    <label
                                        key={level}
                                        className="mr-4 flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            value={level}
                                            checked={levels.includes(level)}
                                            onChange={handleLevelsChange}
                                            className="mr-2"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {user ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitDisabled}
                                    className={`w-full rounded-lg px-4 py-2 text-white ${
                                        isSubmitDisabled
                                            ? "bg-red-600"
                                            : "bg-[#2c3540b5] hover:bg-[#2c35405a]"
                                    }`}
                                >
                                    Rechercher
                                </button>
                                <button
                                    onClick={handleClear}
                                    className="w-full rounded-lg px-4 py-2 text-white bg-red-600 hover:bg-red-600"
                                >
                                    Effacer
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-center mb-4">
                                    Vous devez être connecté pour rechercher des
                                    cours.
                                </p>
                                <NavLink
                                    to={`/connexion`}
                                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                                >
                                    Se connecter
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBarWithModal;
