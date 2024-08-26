import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, isLoadingUserAtom } from "../utils/atom/userAtom";
import Loader from "../components/Loader";
import { MyProfilPicture } from "../components/ProfilPicture";
import { NotConnectedBloc } from "../components/BlocNoAccessRights";
import { levelTraduction } from "../utils/userUtils";

const Profil: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const isLoadingUser = useRecoilValue(isLoadingUserAtom);

    // Fonction pour se déconnecter
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    if (isLoadingUser) {
        return <Loader />; // Afficher le loader si en chargement
    }

    const dateOfBirth = user?.dateOfBirth
        ? typeof user.dateOfBirth === "string"
            ? new Date(user.dateOfBirth)
            : user.dateOfBirth
        : null;

    const renderDateOfBirth = () => {
        if (dateOfBirth) {
            // Convertir la date en chaîne lisible pour l'affichage
            return dateOfBirth.toLocaleDateString(); // Utilise un format de date local
        }
        return "Date of birth is not available.";
    };

    const nonEmptySports = user?.Sports?.filter(
        (sport) => sport.name.trim() !== ""
    );

    return (
        <div className="text-white flex flex-col items-center justify-center h-full px-4">
            {user ? (
                <>
                    <div className="w-full flex justify-center mb-4">
                        <MyProfilPicture
                            src="https://www.fredzone.org/wp-content/uploads/2018/12/anakin-1200x675.jpg"
                            alt={`Photo de profil de ${user.firstName} ${user.lastName}`}
                        />
                    </div>
                    <h2 className=" flex-1 mb-4 text-2xl">
                        {user?.firstName + " " + user?.lastName}
                    </h2>
                    {dateOfBirth != null ? (
                        <p className="mb-3">{renderDateOfBirth()}</p>
                    ) : (
                        ""
                    )}
                    <span className="w-3/6 border-b-[0.5px] border-white mb-3"></span>
                    <p className="my-2 font-light text-xl mb-4">Sports</p>
                    <div className="w-full flex justify-center flex-row mb-4 flex-wrap">
                        {nonEmptySports && nonEmptySports?.length > 0 ? (
                            nonEmptySports.map((sport, index) => (
                                <p
                                    key={index}
                                    className="max-w-1/2 mr-2 p-2 border-[2px] border-[#2c3540b5] rounded-lg mb-2"
                                >
                                    {sport.name} :{" "}
                                    {levelTraduction(sport.UserSport.level)}
                                </p>
                            ))
                        ) : (
                            <p>Aucun sport sélectionné</p> // Optionnel : afficher un message si le tableau est vide
                        )}
                    </div>
                    <div className="w-full flex items-stretch flex-row mt-4">
                        <NavLink
                            to={`/profil-modification`}
                            className="flex-1 text-center rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] mr-4 text-sm md:text-lg"
                        >
                            Modifier le profil
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="flex-1 text-center rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a] text-sm md:text-lg"
                        >
                            Se déconnecter
                        </button>
                    </div>
                </>
            ) : (
                <NotConnectedBloc />
            )}
        </div>
    );
};

export default Profil;
