import React, { useState } from "react";

const InscriptionForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

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
        setNom("");
        setPrenom("");
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
                <div className="flex flex-col mb-4">
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
                <div className="flex flex-col mb-4">
                    <label htmlFor="prenom" className="mb-4">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="prenom"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={nom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="nom" className="mb-4">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="nom"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full flex flex-row justify-between">
                    <button
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                        type="submit"
                    >
                        S'inscrire
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InscriptionForm;
