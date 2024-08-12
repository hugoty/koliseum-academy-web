import React, { useState } from "react";

interface InscriptionFormProps {
    onSubmit: (email: string, password: string, firstName: string, lastName: string) => void;
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password, firstName, lastName);
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
                <div className="flex flex-col mb-4">
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
                <div className="flex flex-col mb-8">
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
