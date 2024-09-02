import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaDumbbell,
    FaUserShield,
    FaCalendarAlt,
    FaSearch,
    FaCertificate,
    FaPeopleArrows,
    FaStar,
    FaShieldAlt,
    FaSearchPlus,
} from "react-icons/fa";

const LandingPage: React.FC = () => {
    return (
        <div className=" text-white min-h-screen flex flex-col items-center">
            {/* Section d'en-tête */}
            <header className="w-full p-6 flex flex-col items-center text-center ">
                <h1 className="text-3xl font-bold mb-2 font-reggae">
                    Koliseum Academy 🥋
                </h1>
                <p className="text-md max-w-2xl mb-4">
                    La plateforme ultime pour trouver, créer ou gérer des cours
                    de sports de combat en toute sécurité !
                </p>
            </header>

            {/* Section Fonctionnalités Principales */}
            <section className="w-full py-8 px-6 flex flex-col items-center mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Fonctionnalités Principales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaDumbbell className="text-4xl text-blue-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Cours Flexibles</h3>
                        <p>Créez ou rejoignez des cours sans engagement.</p>
                    </div>
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaUserShield className="text-4xl text-green-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">
                            Sécurité et Certification
                        </h3>
                        <p>Coach certifiés et documents validés.</p>
                    </div>
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaCalendarAlt className="text-4xl text-yellow-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Pas d'Engagement</h3>
                        <p>Paiement à la séance pour plus de flexibilité.</p>
                    </div>
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaSearch className="text-4xl text-red-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">
                            Recherche Optimisée
                        </h3>
                        <p>Trouvez des cours adaptés à vos besoins.</p>
                    </div>
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaCertificate className="text-4xl text-purple-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">
                            Gestion des Documents
                        </h3>
                        <p>Suivez les certificats médicaux facilement.</p>
                    </div>
                    <div className="bg-[#2c3540b5] p-6 rounded-lg hover:bg-[#2c35405a] text-center">
                        <FaPeopleArrows className="text-4xl text-pink-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Communauté</h3>
                        <p>
                            Rencontrez d'autres passionnés et partagez votre
                            passion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Avantages */}
            <section className="w-full py-8 px-6 flex flex-col items-center bg-[#2c3540b5] rounded-xl">
                <h2 className="text-2xl font-semibold mb-10">
                    Pourquoi Choisir Koliseum Academy ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                    <div className="text-center">
                        <FaStar className="text-4xl text-yellow-400 mx-auto mb-2" />
                        <p className="mb-2">
                            Accédez facilement à une grande variété de sports de
                            combat.
                        </p>
                    </div>
                    <div className="text-center">
                        <FaShieldAlt className="text-4xl text-blue-400 mx-auto mb-2" />
                        <p className="mb-2">
                            Entraînez-vous avec des coachs certifiés pour
                            assurer votre sécurité.
                        </p>
                    </div>
                    <div className="text-center">
                        <FaSearchPlus className="text-4xl text-green-400 mx-auto mb-2" />
                        <p className="mb-2">
                            Utilisez notre interface moderne pour trouver et
                            réserver des cours.
                        </p>
                    </div>
                </div>
                <NavLink
                    to={`/inscription`}
                    className="mt-4 rounded-lg border-2 border-red-600 hover:border-red-500 px-4 py-2 hover:bg-[#2c35405a]"
                >
                    Créer un compte
                </NavLink>
            </section>

            {/* Section Contact et Appel à l'action */}
            <section className="w-full py-8 px-6 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Prêt à commencer ?
                </h2>
                <p className="text-md max-w-xl text-center mb-4">
                    Inscrivez-vous maintenant et rejoignez une communauté de
                    passionnés de sports de combat ! 💪
                </p>
                <NavLink
                    to={`/connexion`}
                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                >
                    Se connecter
                </NavLink>
            </section>
        </div>
    );
};

export default LandingPage;
