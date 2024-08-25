import React, { useState } from "react";
import sportDetail from "../data/sports.json";
import Select from "react-select";
import { Course, Level } from "../utils/types/types";
import { useApiCourse } from "../hooks/useApiCours";
import { useRecoilValue } from "recoil";
import { userAtom } from "../utils/atom/userAtom";
import { getKeyLevel } from "../utils/userUtils";

interface SportOption {
    value: number;
    label: string;
}

const CreationCoursForm: React.FC = () => {
    const sportOptions: SportOption[] = sportDetail.map((sport) => ({
        value: sport.id,
        label: sport.label,
    }));

    const user = useRecoilValue(userAtom);

    const [sports, setSports] = useState<SportOption[]>([]);
    const [participants, setParticipants] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [lieu, setLieu] = useState("");
    const [prix, setPrix] = useState("");
    const [niveau, setNiveau] = useState<{
        value: Level;
        label: string;
    } | null>(null);

    const { createCourse, error } = useApiCourse();

    // Options pour le niveau
    const niveauOptions = Object.values(Level).map((level) => ({
        value: level,
        label: level.charAt(0).toUpperCase() + level.slice(1),
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Extraire les IDs des sports sélectionnés
        const sportIds = sports.map((sport) => sport.value);

        const newCourse: Partial<Course> = {
            startDate: new Date(dateDebut),
            endDate: new Date(dateFin),
            places: Number(participants),
            locations: [lieu],
            levels: niveau ? [getKeyLevel(niveau.value)] : [], // Niveau doit être un tableau
            price: Number(prix),
            sportIds,
        };

        const success = await createCourse(newCourse);

        if (success) {
            window.location.assign("/planning");
        } else {
            console.error("Erreur lors de la création du cours :", error);
        }

        // Réinitialisation des champs du formulaire
        setSports([]);
        setParticipants("");
        setDateDebut("");
        setDateFin("");
        setLieu("");
        setPrix("");
        setNiveau(null);

        // Effectuer la requête pour ajouter le cours (votre code ici)
    };

    return (
        <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="sport" className="mb-4">
                        Sport
                    </label>
                    <Select
                        id="sport"
                        classNamePrefix="custom-select"
                        value={sports}
                        onChange={(selectedOptions) =>
                            setSports(selectedOptions as SportOption[])
                        }
                        options={sportOptions}
                        isMulti
                        isClearable
                        placeholder="Sélectionnez des sports de combat"
                        required
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: "#2c3540b5",
                                borderRadius: "0.5rem",
                                padding: "0.5rem 1rem 0.5rem 0rem",
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
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="participants" className="mb-4">
                        Nombre de participants
                    </label>
                    <input
                        type="number"
                        id="participants"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="niveau" className="mb-4">
                        Niveau
                    </label>
                    <Select
                        id="niveau"
                        classNamePrefix="custom-select"
                        value={niveau}
                        onChange={(selectedOption) => setNiveau(selectedOption)}
                        options={niveauOptions}
                        isClearable
                        placeholder="Sélectionnez un niveau"
                        required
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: "#2c3540b5",
                                borderRadius: "0.5rem",
                                padding: "0.5rem 1rem 0.5rem 0rem",
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
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dateDebut" className="mb-4">
                        Date de début
                    </label>
                    <input
                        type="date"
                        id="dateDebut"
                        value={dateDebut}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dateFin" className="mb-4">
                        Date de fin
                    </label>
                    <input
                        type="date"
                        id="dateFin"
                        value={dateFin}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="prix" className="mb-4">
                        Prix
                    </label>
                    <input
                        type="number"
                        id="prix"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="lieu" className="mb-4">
                        Lieu
                    </label>
                    <input
                        type="text"
                        id="lieu"
                        value={lieu}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setLieu(e.target.value)}
                        required
                    />
                </div>
                <button
                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white hover:bg-[#2c35405a] mb-10"
                    type="submit"
                >
                    Créer le cours
                </button>
            </form>
        </div>
    );
};

export default CreationCoursForm;
