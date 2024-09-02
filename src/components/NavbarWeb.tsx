// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaHouse,
    FaUserNinja,
    FaCalendarDays,
    FaBook,
    FaUser,
} from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { userAtom } from "../utils/atom/userAtom";
import { FaSearch } from "react-icons/fa";

const NavbarWeb: React.FC = () => {
    const user = useRecoilValue(userAtom);
    return (
        <div className="bg-[#2C3540] text-white md:flex hidden justify-center my-10 py-4 rounded-2xl w-6/12 mx-auto">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex-1 text-center hover:text-red-500 ${
                        isActive ? "text-red-500" : "text-white"
                    }`
                }
            >
                {user ? (
                    <>
                        <FaSearch className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                        <span className="block text-xs text-white">
                            Recherche
                        </span>
                    </>
                ) : (
                    <>
                        <FaHouse className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                        <span className="block text-xs text-white">
                            Accueil
                        </span>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/coaching"
                className={({ isActive }) =>
                    `flex-1 text-center hover:text-red-500 ${
                        isActive ? "text-red-500" : "text-white"
                    }`
                }
            >
                <FaUserNinja className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                <span className="block text-xs text-white">Coaching</span>
            </NavLink>
            <NavLink
                to="/planning"
                className={({ isActive }) =>
                    `flex-1 text-center hover:text-red-500 ${
                        isActive ? "text-red-500" : "text-white"
                    }`
                }
            >
                <FaCalendarDays className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                <span className="block text-xs text-white">Planning</span>
            </NavLink>
            <NavLink
                to="/sports"
                className={({ isActive }) =>
                    `flex-1 text-center hover:text-red-500 ${
                        isActive ? "text-red-500" : "text-white"
                    }`
                }
            >
                <FaBook className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                <span className="block text-xs text-white">Sports</span>
            </NavLink>
            <NavLink
                to="/profil"
                className={({ isActive }) =>
                    `flex-1 text-center hover:text-red-500 ${
                        isActive ? "text-red-500" : "text-white"
                    }`
                }
            >
                <FaUser className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
                <span className="block text-xs text-white">Profil</span>
            </NavLink>
        </div>
    );
};

export default NavbarWeb;
