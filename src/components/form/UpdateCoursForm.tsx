import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Course, Level } from "../../utils/types/types";
import sportDetail from "../../data/sports.json";
import { useApiCourse } from "../../hooks/useApiCours";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../utils/atom/userAtom";
import { getKeyLevel } from "../../utils/userUtils";
import { validateUpdateCoursForm } from "../../utils/formErrorUtils";
import ButtonLoader from "../common/ButtonLoader";

interface SportOption {
    value: number | undefined;
    label: string;
}

interface UpdateCoursFormProps {
    course: Course;
}

const UpdateCoursForm: React.FC<UpdateCoursFormProps> = ({ course }) => {
    const user = useRecoilValue(userAtom);

    const [sports, setSports] = useState<SportOption[]>([]);
    const [detail, setDetail] = useState("");
    const [participants, setParticipants] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [lieu, setLieu] = useState("");
    const [prix, setPrix] = useState("");
    const [niveau, setNiveau] = useState<{
        value: Level;
        label: string;
    } | null>(null);
    const [errors, setErrors] = useState<{
        sports?: string;
        participants?: string;
        dateDebut?: string;
        dateFin?: string;
        lieu?: string;
        prix?: string;
        niveau?: string;
        sqlInjection?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { updateCourse, error } = useApiCourse();

    // Options pour le niveau
    const niveauOptions = Object.values(Level).map((level) => ({
        value: level,
        label: level.charAt(0).toUpperCase() + level.slice(1),
    }));

    useEffect(() => {
        setSports(
            course.Sports.map((sport) => ({
                value: sport.id,
                label: sport.name,
            }))
        );
        setDetail(course.detail?.toString() ? course.detail?.toString() : "");
        setParticipants(course.places.toString());
        setDateDebut(new Date(course.startDate).toISOString().split("T")[0]);
        setDateFin(new Date(course.endDate).toISOString().split("T")[0]);
        setLieu(course.locations[0]);
        setPrix(course.price.toString());

        const level = course.levels[0];
        setNiveau({
            value: level as Level,
            label: getLevelLabel(level),
        });
    }, [course]);

    const getLevelLabel = (level: string): string => {
        return Object.values(Level).includes(level as Level)
            ? Level[level as keyof typeof Level]
            : "Unknown";
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const validSports = sports
            .filter((sport) => sport.value !== undefined)
            .map((sport) => ({
                value: sport.value as number, // On force `value` à être un `number`
                label: sport.label,
            }));

        const formValues = {
            sports: validSports,
            participants,
            dateDebut,
            dateFin,
            lieu,
            prix,
            niveau,
        };

        const validationErrors = validateUpdateCoursForm(formValues);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);

            const updatedCourse: Partial<Course> = {
                ...course,
                detail: detail ? detail : "",
                startDate: new Date(dateDebut),
                endDate: new Date(dateFin),
                places: Number(participants),
                locations: [lieu],
                levels: niveau ? [getKeyLevel(niveau.value)] : course.levels,
                price: Number(prix),
                sportIds: sports
                    .map((sport) => sport.value)
                    .filter((id): id is number => id !== undefined),
            };

            const success = await updateCourse(
                String(course.owner?.id) ?? undefined,
                updatedCourse
            );

            setIsSubmitting(false);

            if (success) {
                window.location.assign(`/cours/${course.id}`);
            } else {
                console.error("Error updating course:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="w-full flex flex-col">
            <form onSubmit={handleUpdate} noValidate>
                <div className="flex flex-col mb-4">
                    <label htmlFor="sport" className="mb-4">
                        Sport *
                    </label>
                    <Select
                        id="sport"
                        classNamePrefix="custom-select"
                        value={sports}
                        onChange={(selectedOptions) => {
                            const filteredOptions = (
                                selectedOptions as {
                                    value: number | undefined;
                                    label: string;
                                }[]
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
                        placeholder="Sélectionnez des sports de combat"
                        required
                        isDisabled={isSubmitting}
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
                    {errors.sports && (
                        <span className="text-red-500 mt-2">
                            {errors.sports}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="detail" className="mb-4">
                        Details
                    </label>
                    <input
                        type="text"
                        id="detail"
                        value={detail}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDetail(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="participants" className="mb-4">
                        Nombre de participants *
                    </label>
                    <input
                        type="number"
                        id="participants"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />{" "}
                    {errors.participants && (
                        <span className="text-red-500 mt-2">
                            {errors.participants}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="niveau" className="mb-4">
                        Niveau *
                    </label>
                    <Select
                        id="niveau"
                        classNamePrefix="custom-select"
                        value={niveau}
                        onChange={(selectedOption) => setNiveau(selectedOption)}
                        options={Object.values(Level).map((level) => ({
                            value: level,
                            label:
                                level.charAt(0).toUpperCase() + level.slice(1),
                        }))}
                        isClearable
                        placeholder="Sélectionnez un niveau"
                        required
                        isDisabled={isSubmitting}
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
                    />{" "}
                    {errors.niveau && (
                        <span className="text-red-500 mt-2">
                            {errors.niveau}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dateDebut" className="mb-4">
                        Date de début *
                    </label>
                    <input
                        type="date"
                        id="dateDebut"
                        value={dateDebut}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />{" "}
                    {errors.dateDebut && (
                        <span className="text-red-500 mt-2">
                            {errors.dateDebut}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dateFin" className="mb-4">
                        Date de fin *
                    </label>
                    <input
                        type="date"
                        id="dateFin"
                        value={dateFin}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />{" "}
                    {errors.dateFin && (
                        <span className="text-red-500 mt-2">
                            {errors.dateFin}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="prix" className="mb-4">
                        Prix *
                    </label>
                    <input
                        type="number"
                        id="prix"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />{" "}
                    {errors.prix && (
                        <span className="text-red-500 mt-2">{errors.prix}</span>
                    )}
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="lieu" className="mb-4">
                        Lieu *
                    </label>
                    <input
                        type="text"
                        id="lieu"
                        value={lieu}
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white"
                        onChange={(e) => setLieu(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />{" "}
                    {errors.lieu && (
                        <span className="text-red-500 mt-2">{errors.lieu}</span>
                    )}
                </div>
                <div className="text-xs font-thin mb-6">
                    (*) Champs obligatoires
                </div>
                <button
                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 text-white hover:bg-[#2c35405a] mb-10"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex flex-row flex-nowrap">
                            <ButtonLoader />
                            <span className="ml-2">
                                Mise à jour en cours...
                            </span>{" "}
                        </div>
                    ) : (
                        "Mettre à jour le cours"
                    )}
                </button>
            </form>
        </div>
    );
};

export default UpdateCoursForm;
