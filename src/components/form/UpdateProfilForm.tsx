import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Select from "react-select";
import { userAtom } from "../../utils/atom/userAtom";
import { User } from "../../utils/types/types";
import sportDetail from "../../data/sports.json";

interface SportOption {
    value: number | undefined;
    label: string;
}

interface UpdateProfilFormProps {
    onSubmit: (user: Partial<User>) => void;
    error?: { message: string } | null;
}

const UpdateProfilForm: React.FC<UpdateProfilFormProps> = ({ onSubmit }) => {
    const user = useRecoilValue(userAtom);

    const formatDate = (date: string | Date | null): string => {
        if (date instanceof Date) {
            return date.toISOString().split("T")[0];
        } else if (typeof date === "string") {
            return new Date(date).toISOString().split("T")[0];
        }
        return "";
    };

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [dateOfBirth, setDateOfBirth] = useState(
        formatDate(user?.dateOfBirth || null)
    );
    const [sports, setSports] = useState<SportOption[]>([]); // Utilisation de SportOption pour le select

    useEffect(() => {
        // Transformation des sports utilisateur en options du select
        setSports(
            user?.Sports?.map((sport) => ({
                value: sport.id,
                label: sport.name,
            })) || []
        );
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUser: Partial<User> = {
            firstName,
            lastName,
            email,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            // Conversion des sports sélectionnés en un tableau d'IDs pour l'envoi
            sports: sports
                .map((sport) => ({
                    id: sport.value as number, // Assure que chaque objet sport a un champ 'id'
                }))
                .filter((sport) => sport.id !== undefined), // Filtre les sports sans id
        };

        onSubmit(updatedUser);
    };

    return (
        <div className="w-full md:w-3/5 flex flex-col md:m-auto m-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="firstName" className="mb-4">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="lastName" className="mb-4">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-4">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dateOfBirth" className="mb-4">
                        Date de Naissance
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="sport" className="mb-4">
                        Sports
                    </label>
                    <Select
                        id="sport"
                        classNamePrefix="custom-select"
                        value={sports} // Sports sélectionnés actuellement
                        onChange={(selectedOptions) => {
                            const filteredOptions = (
                                selectedOptions as SportOption[]
                            )
                                .filter((option) => option.value !== undefined)
                                .map((option) => ({
                                    value: option.value as number,
                                    label: option.label,
                                }));

                            setSports(filteredOptions);
                        }}
                        options={sportDetail.map((sport) => ({
                            value: sport.id,
                            label: sport.label,
                        }))}
                        isMulti
                        isClearable
                        placeholder="Sélectionnez un ou plusieurs sports"
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
                                backgroundColor: "#2c3540",
                                color: "white",
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                backgroundColor: "#2c3540",
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
                <div className="w-full flex justify-center">
                    <button
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] mb-10"
                        type="submit"
                    >
                        Mettre à jour le profil
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfilForm;
