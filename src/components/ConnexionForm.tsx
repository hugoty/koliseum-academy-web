import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface ConnexionFormProps {
    onSubmit: (email: string, password: string) => void;
    error?: { message: string } | null; // Modifier ici pour inclure 'null'
}

const ConnexionForm: React.FC<ConnexionFormProps> = ({ onSubmit, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <div className="w-full md:w-3/5 flex flex-col md:m-auto m-0">
            <form onSubmit={handleSubmit}>
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
                <div className="flex flex-col mb-8">
                    <label htmlFor="password" className="mb-4">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error.message}</div>}
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
