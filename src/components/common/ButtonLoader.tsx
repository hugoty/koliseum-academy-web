// Loader.tsx
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../data/loader.json"; // Chemin vers votre fichier .json

const ButtonLoader: React.FC = () => {
    const defaultOptions = {
        loop: true, // L'animation se répète en boucle
        autoplay: true, // L'animation démarre automatiquement
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie options={defaultOptions} height={25} width={25} />;
};

export default ButtonLoader;
