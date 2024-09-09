import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import sports from "../../data/sports.json";
import { FaAngleLeft } from "react-icons/fa6";

interface SportContent {
    title: string;
    text: string;
}

interface SportDetails {
    id: number;
    label: string;
    image: string;
    description: string;
    content: SportContent[];
}

const SportDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const sport = sports.find((sport) => sport.id.toString() === id);

    if (!sports) {
        return <div>Aucun détail trouvé pour le sport avec l'ID: {id}</div>;
    }
    return (
        <div className="text-white flex flex-col items-center justify-center h-full">
            <div
                onClick={() => navigate(-1)}
                className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
            >
                <FaAngleLeft />
            </div>
            <h1 className="text-3xl font-bold mb-4">{sport!.label}</h1>
            <img
                src={sport!.image}
                alt={sport!.label}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4"
            />
            <p className="mb-4 text-justify pb-4 border-b-[0.5px]">
                {sport!.description}
            </p>
            <div>
                {sport!.content.map((block: any, index: any) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            {block.title}
                        </h2>
                        <p className="text-justify">{block.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportDetail;
