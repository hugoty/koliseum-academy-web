import React, { useState, useEffect } from 'react';
import { FaPen, FaTimes, FaEye } from 'react-icons/fa';
import profileData from '../data/profilData.json';

const Profil: React.FC = () => {
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    setProfile(profileData);
  }, []);

  return (
    <div className="text-white flex flex-col items-center h-screen overflow-y-auto font-montserrat">
      <div className="w-full max-w-md space-y-6">
        <ProfileDetail label="Email" value={profile.email} />
        <ProfileDetail label="Mot de passe" value={profile.password} />
        <ProfileDetail label="Age" value={profile.age} />
        <ProfileDetail label="Sports" value={profile.sports} />
      </div>
      <div className="w-full max-w-md mt-6">
        <label className="block text-lg pb-1 font-normal">Documents</label>
        <div className="space-y-2">
          {profile.documents && profile.documents.map((doc: string, index: number) => (
            <ProfileDocument key={index} label={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileDetail: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div>
    <label className="block text-lg pb-1 font-normal">{label}</label>
    <div className="flex items-center justify-between bg-[#2C3540] rounded-lg p-4 text-gray-300 font-medium">
      <span>{value}</span>
      <FaPen className="text-white" />
    </div>
  </div>
);

const ProfileDocument: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center justify-between bg-[#2C3540] rounded-lg p-4 text-gray-300 font-medium">
    <span>{label}</span>
    <div className="flex space-x-2">
      <FaEye className="text-white" />
      <FaTimes className="text-white" />
    </div>
  </div>
);

export default Profil;
