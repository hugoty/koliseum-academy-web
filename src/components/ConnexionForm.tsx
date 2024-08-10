import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ConnexionForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
        };

        console.log("Nouveau cours créé :", newUser);
        // Ajoutez ici la logique pour envoyer les données au backend ou mettre à jour l'état global

        // Réinitialiser le formulaire
        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="sport" className="mb-4">
                        Email
                    </label>
                    <input
                        type="email"
                        id="sport"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="participants" className="mb-4">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="participants"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
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
