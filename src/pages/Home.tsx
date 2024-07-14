import React from 'react';
import CardCours from '../components/CardCours';
import sportsEvents from '../data/cours.json';

const Home: React.FC = () => {
  return (
    <div className="text-white flex md:flex-row flex-col items-center justify-between h-full md:flex-wrap flex-nowrap">
      {sportsEvents.cours.map((event, index) => (
        <CardCours
          key={index}
          id={event.id}
          nom={event.nom}
          prenom={event.prenom}
          sport={event.sport}
          position={event.position}
          dateHoraire={event.dateHoraire}
          places={event.places}
        />
      ))}
    </div>
  );
};

export default Home;
