import React, { useState } from 'react';

const CreationCoursForm: React.FC = () => {
    const [sport, setSport] = useState('');
    const [participants, setParticipants] = useState('');
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCourse = {
            sport,
            participants: Number(participants), // Convertir les participants en nombre
            date,
            lieu
        };

        console.log('Nouveau cours créé :', newCourse);
        // Ajoutez ici la logique pour envoyer les données au backend ou mettre à jour l'état global

        // Réinitialiser le formulaire
        setSport('');
        setParticipants('');
        setDate('');
        setLieu('');
    };

    return (
        <div className="creation-cours-form">
            <h2>Créer un nouveau cours</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sport">Sport:</label>
                    <input
                        type="text"
                        id="sport"
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="participants">Nombre de participants:</label>
                    <input
                        type="number"
                        id="participants"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lieu">Lieu:</label>
                    <input
                        type="text"
                        id="lieu"
                        value={lieu}
                        onChange={(e) => setLieu(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Créer le cours</button>
            </form>
        </div>
    );
};

export default CreationCoursForm;
