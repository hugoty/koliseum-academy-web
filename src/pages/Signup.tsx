import React from 'react';

const SignUp: React.FC = () => {
  return (
    <div className="text-white flex flex-col items-center h-screen overflow-y-auto font-montserrat">
      <div className="w-full max-w-md space-y-6">
        <LoginFormInput label="Email" />
        <LoginFormInput label="Mot de passe" type="password" />
      </div>
      <div className="w-full max-w-md mt-6 flex justify-between space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Inscription</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full">Valider</button>
      </div>
    </div>
  );
};

const LoginFormInput: React.FC<{ label: string, type?: string }> = ({ label, type = "text" }) => (
  <div>
    <label className="block text-lg pb-1 font-normal">{label}</label>
    <input 
      type={type} 
      className="w-full bg-[#2C3540] rounded-lg p-4 text-gray-300 font-medium" 
    />
  </div>
);

export default SignUp;
