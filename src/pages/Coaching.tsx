import React, { useState } from 'react';
import CardCours from '../components/CardCours';
import CardCoach from '../components/CardCoach';
import coursData from '../data/cours.json';
import coachsData from '../data/coachs.json';

interface Participant {
  id: string;
  nom: string;
  prenom: string;
  profilPicture: string;
}

interface Coach {
  id: string;
  nom: string;
  prenom: string;
  profilPicture: string;
}

interface Cours {
  id: string;
  position: string;
  dateHoraire: string;
  places: number;
  sport: string;
  nom: string;
  prenom: string;
  participants: Participant[];
  coachs: Coach[];
}

const Coaching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coaching' | 'cours'>('coaching');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isToday = (date: Date) => {
    return date >= today && date < tomorrow;
  };

  const isTomorrow = (date: Date) => {
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
    return date >= tomorrow && date < dayAfterTomorrow;
  };

  const isFutureOrToday = (date: Date) => {
    return date >= today;
  };

  const todayCourses: Cours[] = [];
  const tomorrowCourses: Cours[] = [];
  const upcomingCourses: Cours[] = [];

  coursData.cours.forEach(cours => {
    const coursDate = new Date(cours.dateHoraire);
    if (isFutureOrToday(coursDate)) {
      if (isToday(coursDate)) {
        todayCourses.push(cours);
      } else if (isTomorrow(coursDate)) {
        tomorrowCourses.push(cours);
      } else {
        upcomingCourses.push(cours);
      }
    }
  });

  return (
    <div className="text-white flex flex-col items-center justify-center h-full">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('coaching')}
          className={`px-4 py-2 hover:font-bold hover:border-b-[1px] ${activeTab === 'coaching' ? 'border-b-[1px] font-bold' : ''}`}
        >
          Coaching
        </button>
        <button
          onClick={() => setActiveTab('cours')}
          className={`px-4 py-2 hover:font-bold hover:border-b-[1px] ${activeTab === 'cours' ? 'border-b-[1px] font-bold' : ''}`}
        >
          Cours
        </button>
      </div>
      {activeTab === 'cours' && (
        <>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mb-4 font-bold w-full border-b-[0.5px] pb-2">Aujourd'hui</h2>
            {todayCourses.length > 0 ? (
              todayCourses.map((cours, index) => (
                <div className="w-full flex justify-center">
                  <CardCours
                    key={index}
                    id={cours.id}
                    nom={cours.nom}
                    prenom={cours.prenom}
                    sport={cours.sport}
                    position={cours.position}
                    dateHoraire={cours.dateHoraire}
                    places={cours.places}
                  />
                </div>
              ))
            ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours aujourd'hui ..</p>
            )}
          </div>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">Demain</h2>
              {tomorrowCourses.length > 0 ? (
                tomorrowCourses.map((cours, index) => (
                  <div className="w-full flex justify-center">
                    <CardCours
                      key={index}
                      id={cours.id}
                      nom={cours.nom}
                      prenom={cours.prenom}
                      sport={cours.sport}
                      position={cours.position}
                      dateHoraire={cours.dateHoraire}
                      places={cours.places}
                    />
                  </div>
                ))
              ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours demain ..</p>
              )}
          </div>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">Prochainement</h2>
            {upcomingCourses.length > 0 ? (
              upcomingCourses.map((cours, index) => (
                <div className="w-full flex justify-center">
                  <CardCours
                    key={index}
                    id={cours.id}
                    nom={cours.nom}
                    prenom={cours.prenom}
                    sport={cours.sport}
                    position={cours.position}
                    dateHoraire={cours.dateHoraire}
                    places={cours.places}
                  />
                </div>
              ))
            ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours de programmés ..</p>
            )}
          </div>
        </>
      )}
      {activeTab === 'coaching' && (
        <div className="w-full flex justify-center flex-wrap">
          {coachsData.coachs.map((coach, index) => (
            <CardCoach
              key={index}
              coach={coach}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Coaching;
