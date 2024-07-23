import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="text-white flex flex-col items-center h-screen overflow-y-auto font-montserrat">
      <div className="w-full max-w-md space-y-6">
        <LoginFormInput label="Email" />
        <LoginFormInput label="Mot de passe" type="password" />
      </div>
      <div className="w-full max-w-md mt-6 flex gap-36 ">
      <button className="bg-[rgba(188,25,32,0.2)] text-white p-2 rounded-lg w-1/2 text-sm">Inscription</button>
      <button className="bg-[#2C3540] text-white p-2 rounded-lg w-1/2 text-sm">Valider</button>
      </div>
    </div>
  );
};

const LoginFormInput: React.FC<{ label: string, type?: string }> = ({ label, type = "text" }) => (
  <div>
    <label className="block text-lg pb-1 font-normal">{label}</label>
    <input 
      type={type} 
      className="w-full bg-[#2C3540] rounded-lg p-4 text-gray-300 font-medium border-none outline-none" 
    />
  </div>
);

export default Login;
