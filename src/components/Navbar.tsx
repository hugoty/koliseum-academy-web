// src/components/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHouse, FaUserNinja, FaCalendarDays, FaBook, FaUser } from 'react-icons/fa6';

const Navbar: React.FC = () => {
  return (
    <div className="bg-[#1f262e] text-white flex justify-around py-2 mb-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex-1 text-center ${isActive ? 'text-red-500' : 'text-white'}`
        }
      >
        <FaHouse className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
        <span className="block text-xs text-white">Accueil</span>
      </NavLink>
      <NavLink
        to="/coaching"
        className={({ isActive }) =>
          `flex-1 text-center ${isActive ? 'text-red-500' : 'text-white'}`
        }
      >
        <FaUserNinja className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
        <span className="block text-xs text-white">Coaching</span>
      </NavLink>
      <NavLink
        to="/planning"
        className={({ isActive }) =>
          `flex-1 text-center ${isActive ? 'text-red-500' : 'text-white'}`
        }
      >
        <FaCalendarDays className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
        <span className="block text-xs text-white">Planning</span>
      </NavLink>
      <NavLink
        to="/sports"
        className={({ isActive }) =>
          `flex-1 text-center ${isActive ? 'text-red-500' : 'text-white'}`
        }
      >
        <FaBook className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
        <span className="block text-xs text-white">Sports</span>
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          `flex-1 text-center ${isActive ? 'text-red-500' : 'text-white'}`
        }
      >
        <FaUser className="w-6 h-6 mx-auto transition-colors duration-300 ease-in-out" />
        <span className="block text-xs text-white">Profil</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
