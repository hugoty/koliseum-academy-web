import React, { useState } from "react";
import sportsCombat from "../data/sportsCombat.json";
import Select from "react-select";

const CreationCoursForm: React.FC = () => {
    const [sport, setSport] = useState<{ value: string; label: string } | null>(
        null
    );
    const [participants, setParticipants] = useState("");
    const [date, setDate] = useState("");
    const [lieu, setLieu] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCourse = {
            sport: sport?.value,
            participants: Number(participants),
            date,
            lieu,
        };

        console.log("Nouveau cours créé :", newCourse);

        setSport(null);
        setParticipants("");
        setDate("");
        setLieu("");
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
                        value={sport}
                        onChange={(selectedOption) => setSport(selectedOption)}
                        options={sportsCombat}
                        isClearable
                        placeholder="Sélectionnez un sport de combat"
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
                                backgroundColor: state.isFocused ? "#3b4a5a" : "#2c3540b5",
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
                    <label htmlFor="date" className="mb-4">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDate(e.target.value)}
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
                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white hover:bg-[#2c35405a]"
                    type="submit"
                >
                    Créer le cours
                </button>
            </form>
        </div>
    );
};

export default CreationCoursForm;
