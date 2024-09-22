import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateConnexionForm } from "../../utils/formErrorUtils";

interface ConnexionFormProps {
    onSubmit: (email: string, password: string) => void;
    error?: { message: string } | null;
}

const ConnexionForm: React.FC<ConnexionFormProps> = ({ onSubmit, error }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        sqlInjection?: string;
    }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formValues = { email, password };
        const validationErrors = validateConnexionForm(formValues); // Renommé en fonction spécifique

        if (Object.keys(validationErrors).length === 0) {
            // Si pas d'erreurs, soumettre le formulaire
            onSubmit(email, password);
        } else {
            // Si erreurs, les afficher
            setErrors(validationErrors);
        }
    };

    return (
        <div className="w-full flex flex-col md:m-auto m-0">
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-4">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && (
                        <span className="text-red-500 mt-2">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="flex flex-col mb-8">
                    <label htmlFor="password" className="mb-4">
                        Mot de passe *
                    </label>
                    <div className="flex relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="rounded-lg bg-[#2c3540b5] px-4 py-2 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="absolute right-5 top-2.5 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </div>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 mt-2">
                            {errors.password}
                        </span>
                    )}
                </div>

                {errors.sqlInjection && (
                    <div className="text-red-500 mb-4 mt-2">
                        {errors.sqlInjection}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 mb-4">{error.message}</div>
                )}
                <div className="text-xs font-thin mb-6">
                    (*) Champs obligatoires
                </div>
                <div className="w-full flex flex-row justify-between">
                    <button
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                        type="submit"
                    >
                        Se connecter
                    </button>
                    <NavLink
                        to={`/inscription`}
                        rel="s'inscrire"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                    >
                        S'inscrire
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default ConnexionForm;
