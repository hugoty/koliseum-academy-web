import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyProfilPicture } from "./ProfilPicture";
import images from "../data/notConnectedImages.json";

const NotConnectedBloc: React.FC = () => {
    const [image, setImage] = useState<{ src: string; alt: string } | null>(
        null
    );

    useEffect(() => {
        // Choisir une image aléatoire à chaque rendu
        const randomIndex = Math.floor(Math.random() * images.length);
        setImage(images[randomIndex]);
    }, []);

    return (
        <div className="w-full my-20 px-10 text-white">
            <div className="w-full flex justify-center mb-4">
                {image && <MyProfilPicture src={image.src} alt={image.alt} />}
            </div>
            <div className="text-center text-lg mb-6">
                Connectez-vous pour accéder à ce contenu !
            </div>
            <div className="w-full flex justify-center">
                <NavLink
                    to={`/connexion`}
                    className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                >
                    Se connecter
                </NavLink>
            </div>
        </div>
    );
};

const NotAuthorizedBloc: React.FC = () => {
    return (
        <div className="w-full h-[400px] flex items-center justify-center text-white text-center flex-col">
            <div className="w-full flex justify-center mb-4">
                <MyProfilPicture
                    src="https://lesadeptesdelaboxe.com/wp-content/uploads/2016/04/Uppercut.jpg"
                    alt={`Photo pour bloc de non connexion}`}
                />
            </div>
            <p className="text-xl">
                Vous n'avez pas les droits pour consulter cette page
            </p>
        </div>
    );
};

export { NotConnectedBloc, NotAuthorizedBloc };
