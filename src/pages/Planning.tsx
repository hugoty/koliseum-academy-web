import userData from '../data/users.json';
import CardCours from '../components/CardCours';

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

const Planning: React.FC = () => {
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

  userData.users[0].cours.forEach(cours => {
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
      <>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mb-4 font-bold w-full border-b-[0.5px] pb-2">Aujourd'hui</h2>
            {todayCourses.length > 0 ? (
              todayCourses.map((cours, index) => (
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
              ))
            ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours aujourd'hui ..</p>
            )}
          </div>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">Demain</h2>
              {tomorrowCourses.length > 0 ? (
                tomorrowCourses.map((cours, index) => (
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
                ))
              ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours demain ..</p>
              )}
          </div>
          <div className="w-full flex flex-col justify-center flex-wrap">
            <h2 className="mt-4 mb-4 font-bold w-full border-b-[0.5px] pb-2">Prochainement</h2>
            {upcomingCourses.length > 0 ? (
              upcomingCourses.map((cours, index) => (
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
              ))
            ) : (
              <p className="font-light text-center mb-4 mt-4">Aucun cours de programmés ..</p>
            )}
          </div>
        </>
    </div>
  );
};

export default Planning;