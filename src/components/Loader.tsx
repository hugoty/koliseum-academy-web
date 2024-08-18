// Loader.tsx
import React from "react";
import Lottie from "react-lottie";
import animationData from "../data/loader.json"; // Chemin vers votre fichier .json

const Loader: React.FC = () => {
    const defaultOptions = {
        loop: true, // L'animation se répète en boucle
        autoplay: true, // L'animation démarre automatiquement
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="w-full h-screen">
            <Lottie options={defaultOptions} height={100} width={100} />
        </div>
    );
};

export default Loader;
