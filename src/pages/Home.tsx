import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CardCours from '../components/CardCours';
import sportsEvents from '../data/cours.json';

const Home: React.FC = () => {
  const [showAllCours, setShowAllCours] = useState(false);

  const toggleShowAll = () => {
    setShowAllCours(!showAllCours);
  };
  
  return (
    <div className="text-white flex md:flex-row flex-col items-center justify-between h-full md:flex-wrap flex-nowrap pb-10">
      <h2 className="w-full text-left font-light pb-2 mb-6 mt-4 border-b border-white">Cours disponibles</h2>
      {sportsEvents.cours.slice(0, showAllCours ? sportsEvents.cours.length : 2).map((event, index) => (
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
      <button onClick={toggleShowAll} className="mt-2 text-xl text-white flex items-center bg-[#2C3540] p-2 rounded-full hover:text-red-500">
        {showAllCours ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <h2 className="w-full text-left font-light pb-2 my-6 border-b border-white">Coachs disponibles</h2>
      <button onClick={toggleShowAll} className="mt-2 text-xl text-white flex items-center bg-[#2C3540] p-2 rounded-full hover:text-red-500">
        {showAllCours ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    </div>
  );
};

export default Home;
