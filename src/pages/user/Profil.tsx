import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, isLoadingUserAtom } from "../../utils/atom/userAtom";
import Loader from "../../components/common/Loader";
import { MyProfilPicture } from "../../components/profile/ProfilPicture";
import { NotConnectedBloc } from "../../components/access/BlocNoAccessRights";
import { levelTraduction } from "../../utils/userUtils";
import defaultPP from "../../assets/user/default-pp.jpg";
import { Cloudinary } from "@cloudinary/url-gen";

const Profil: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const isLoadingUser = useRecoilValue(isLoadingUserAtom);

    // Fonction pour se déconnecter
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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

    if (!user && !localStorage.getItem("token"))
        return (
            <>
                <NotConnectedBloc />
                <div className="w-full flex justify-center flex-col flex-wrap">
                    <button
                        onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
                        className="mt-4 text-white px-4 py-2 rounded-lg underline"
                    >
                        {showPrivacyPolicy
                            ? "Masquer la Politique de confidentialité"
                            : "Afficher la Politique de confidentialité"}
                    </button>
                    {showPrivacyPolicy && (
                        <div className="max-w-4xl py-6 shadow-md rounded-lg mt-6 bg-[#2c3540b5] text-white px-6">
                            <h1 className="text-2xl font-bold mb-4">
                                Politique de confidentialité et traitement des
                                documents administratifs
                            </h1>

                            <p className="mb-4">
                                Dans le cadre de votre inscription à notre
                                application, nous collectons des{" "}
                                <strong>
                                    documents administratifs sensibles
                                </strong>{" "}
                                (tels que des justificatifs d’identité ou de
                                domicile) afin de valider votre éligibilité à
                                nos services. Nous tenons à vous informer de la
                                manière dont ces documents sont traités et
                                protégés conformément au Règlement Général sur
                                la Protection des Données (RGPD).
                            </p>

                            <h2 className="text-xl font-semibold mb-2">
                                Stockage des documents
                            </h2>
                            <p className="mb-4">
                                Vos documents administratifs sont stockés de
                                manière sécurisée sur notre plateforme
                                partenaire, <strong>Cloudinary</strong>.
                                Cloudinary est un service qui respecte les
                                normes de protection des données imposées par la
                                RGPD :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Chiffrement :</strong> Les fichiers
                                    sont chiffrés lorsqu’ils sont transférés et
                                    lorsqu’ils sont stockés sur les serveurs de
                                    Cloudinary.
                                </li>
                                <li>
                                    <strong>Accès limité :</strong> Seuls les
                                    utilisateurs autorisés, tels que vous et les
                                    coachs de notre application, peuvent accéder
                                    à ces documents pour valider votre
                                    inscription.
                                </li>
                                <li>
                                    <strong>Sécurité des serveurs :</strong>{" "}
                                    Cloudinary applique des politiques de
                                    sécurité strictes pour protéger vos données.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2">
                                Utilisation des documents dans notre application
                            </h2>
                            <p className="mb-4">
                                L’utilisation des documents administratifs est
                                strictement limitée :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Objectif unique :</strong> Vos
                                    documents sont utilisés uniquement pour
                                    permettre aux coachs de valider votre
                                    inscription. Ils ne sont en aucun cas
                                    exploités à d’autres fins.
                                </li>
                                <li>
                                    <strong>Visualisation temporaire :</strong>{" "}
                                    Les coachs accèdent à vos documents
                                    uniquement pour vérifier les informations.
                                    Une fois la vérification effectuée, les
                                    documents ne sont plus accessibles.
                                </li>
                                <li>
                                    <strong>
                                        Protection de votre vie privée :
                                    </strong>{" "}
                                    Vos documents ne seront ni partagés ni
                                    utilisés à des fins commerciales ou
                                    publicitaires.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2">
                                Vos droits
                            </h2>
                            <p className="mb-4">
                                Conformément à la RGPD, vous avez des droits sur
                                vos données personnelles :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Droit d’accès :</strong> Vous pouvez
                                    à tout moment demander à accéder à vos
                                    documents stockés.
                                </li>
                                <li>
                                    <strong>Droit de rectification :</strong> Si
                                    les documents fournis contiennent des
                                    erreurs, vous pouvez les corriger.
                                </li>
                                <li>
                                    <strong>Droit à l’effacement :</strong> Vous
                                    pouvez demander la suppression de vos
                                    documents lorsqu’ils ne sont plus
                                    nécessaires.
                                </li>
                            </ul>

                            <p className="mb-4">
                                Si vous avez des questions sur la gestion de vos
                                documents ou sur vos droits en matière de
                                protection des données, n’hésitez pas à nous
                                contacter à{" "}
                                <a
                                    href="mailto:contact.koliseum@gmail.com"
                                    className="text-blue-500 hover:underline"
                                >
                                    support@votreapp.com
                                </a>
                                .
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    if (!user && localStorage.getItem("token")) return <Loader />;

    return (
        <div className="text-white flex flex-col items-center justify-center h-full px-4">
            {user ? (
                <>
                    <div className="w-full flex justify-center mb-4">
                        <MyProfilPicture
                            src={user.profilePicture || defaultPP}
                            user={user}
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
                    <div className="w-full flex items-stretch flex-row mt-4 mb-2">
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
                    <span className="w-3/6 border-b-[0.5px] border-white my-6"></span>
                    <p className="font-light text-xl mb-4">Sports</p>
                    <div className="w-full flex justify-center flex-row mb-4 flex-wrap">
                        {nonEmptySports && nonEmptySports?.length > 0 ? (
                            nonEmptySports.map((sport, index) => (
                                <p
                                    key={index}
                                    className="w-full mr-2 p-2 border-[2px] border-[#2c3540b5] rounded-lg mb-2 text-center"
                                >
                                    {sport.name} :{" "}
                                    {levelTraduction(sport.UserSport.level)}
                                </p>
                            ))
                        ) : (
                            <p>Aucun sport sélectionné</p> // Optionnel : afficher un message si le tableau est vide
                        )}
                    </div>

                    <button
                        onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
                        className="mt-4 bg-[#2c3540b5] text-white px-4 py-2 rounded-lg"
                    >
                        {showPrivacyPolicy
                            ? "Masquer la Politique de confidentialité"
                            : "Afficher la Politique de confidentialité"}
                    </button>
                    {showPrivacyPolicy && (
                        <div className="max-w-4xl py-6 shadow-md rounded-lg mt-6 bg-[#2c3540b5] text-white px-6">
                            <h1 className="text-2xl font-bold mb-4">
                                Politique de confidentialité et traitement des
                                documents administratifs
                            </h1>

                            <p className="mb-4">
                                Dans le cadre de votre inscription à notre
                                application, nous collectons des{" "}
                                <strong>
                                    documents administratifs sensibles
                                </strong>{" "}
                                (tels que des justificatifs d’identité ou de
                                domicile) afin de valider votre éligibilité à
                                nos services. Nous tenons à vous informer de la
                                manière dont ces documents sont traités et
                                protégés conformément au Règlement Général sur
                                la Protection des Données (RGPD).
                            </p>

                            <h2 className="text-xl font-semibold mb-2">
                                Stockage des documents
                            </h2>
                            <p className="mb-4">
                                Vos documents administratifs sont stockés de
                                manière sécurisée sur notre plateforme
                                partenaire, <strong>Cloudinary</strong>.
                                Cloudinary est un service qui respecte les
                                normes de protection des données imposées par la
                                RGPD :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Chiffrement :</strong> Les fichiers
                                    sont chiffrés lorsqu’ils sont transférés et
                                    lorsqu’ils sont stockés sur les serveurs de
                                    Cloudinary.
                                </li>
                                <li>
                                    <strong>Accès limité :</strong> Seuls les
                                    utilisateurs autorisés, tels que vous et les
                                    coachs de notre application, peuvent accéder
                                    à ces documents pour valider votre
                                    inscription.
                                </li>
                                <li>
                                    <strong>Sécurité des serveurs :</strong>{" "}
                                    Cloudinary applique des politiques de
                                    sécurité strictes pour protéger vos données.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2">
                                Utilisation des documents dans notre application
                            </h2>
                            <p className="mb-4">
                                L’utilisation des documents administratifs est
                                strictement limitée :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Objectif unique :</strong> Vos
                                    documents sont utilisés uniquement pour
                                    permettre aux coachs de valider votre
                                    inscription. Ils ne sont en aucun cas
                                    exploités à d’autres fins.
                                </li>
                                <li>
                                    <strong>Visualisation temporaire :</strong>{" "}
                                    Les coachs accèdent à vos documents
                                    uniquement pour vérifier les informations.
                                    Une fois la vérification effectuée, les
                                    documents ne sont plus accessibles.
                                </li>
                                <li>
                                    <strong>
                                        Protection de votre vie privée :
                                    </strong>{" "}
                                    Vos documents ne seront ni partagés ni
                                    utilisés à des fins commerciales ou
                                    publicitaires.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2">
                                Vos droits
                            </h2>
                            <p className="mb-4">
                                Conformément à la RGPD, vous avez des droits sur
                                vos données personnelles :
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <strong>Droit d’accès :</strong> Vous pouvez
                                    à tout moment demander à accéder à vos
                                    documents stockés.
                                </li>
                                <li>
                                    <strong>Droit de rectification :</strong> Si
                                    les documents fournis contiennent des
                                    erreurs, vous pouvez les corriger.
                                </li>
                                <li>
                                    <strong>Droit à l’effacement :</strong> Vous
                                    pouvez demander la suppression de vos
                                    documents lorsqu’ils ne sont plus
                                    nécessaires.
                                </li>
                            </ul>

                            <p className="mb-4">
                                Si vous avez des questions sur la gestion de vos
                                documents ou sur vos droits en matière de
                                protection des données, n’hésitez pas à nous
                                contacter à{" "}
                                <a
                                    href="mailto:contact.koliseum@gmail.com"
                                    className="text-blue-500 hover:underline"
                                >
                                    support@votreapp.com
                                </a>
                                .
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <NotConnectedBloc />
            )}
        </div>
    );
};

export default Profil;
