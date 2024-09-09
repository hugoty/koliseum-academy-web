import { NavLink } from "react-router-dom";

interface CardSportProps {
    id: number;
    label: string;
    image: string;
    description: string;
}

const CardSport: React.FC<CardSportProps> = ({
    id,
    label,
    image,
    description,
}) => {
    return (
        <NavLink
            to={`/sport/${id}`}
            className="relative w-full md:w-5/12 rounded-lg bg-[#2c3540b5] mb-4 md:mx-4 mx-0 p-4 hover:bg-[#2c35405a] flex flex-col items-center text-white"
        >
            <div className="relative w-full h-32 overflow-hidden rounded-lg mb-4">
                <img
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
                {/* Superposition noire */}
            </div>
            <h3 className="text-center font-bold text-xl mb-2">{label}</h3>
            <p className="text-justify text-sm">{description}</p>
        </NavLink>
    );
};

export default CardSport;
