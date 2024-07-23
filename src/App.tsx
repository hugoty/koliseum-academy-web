import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Planning from './pages/Planning';
import Sports from './pages/Sports';
import Profil from './pages/Profil';
import NavbarWeb from './components/NavbarWeb';
import CoursDetail from './pages/CoursDetail';
import Login from './pages/Login';  // Import Login component
import SignUp from './pages/Signup';  // Import SignUp component

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col justify-between items-center md:bg-[#1f262e] bg-black">
        <div className="bg-[#1f262e] w-full md:max-w-full max-w-md h-full mx-4 flex flex-col justify-between">
          <Header />
          <div className="w-full h-full overflow-hidden overflow-y-scroll py-4 md:px-0 px-6 md:w-6/12 md:mx-auto">
            <div className='w-full h-full'>
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/coaching" element={<Coaching />} />
                  <Route path="/planning" element={<Planning />} />
                  <Route path="/sports" element={<Sports />} />
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/cours/:id" element={<CoursDetail />} />
                  <Route path="/login" element={<Login />} />  {/* Add Login route */}
                  <Route path="/signup" element={<SignUp />} />  {/* Add SignUp route */}
                </Routes>
              </div>
            </div>
          </div>
          <Navbar />
          <NavbarWeb />
        </div>
      </div>
    </Router>
  );
}

const Header: React.FC = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/profil':
        return 'Mon compte';
      case '/login':
        return 'Se connecter'; // Set title for Login page
      case '/signup':
        return 'Inscription'; // Set title for Sign Up page
      case '/':
        return 'Koliseum Academy';
      default:
        return 'Koliseum Academy';
    }
  };

  return (
    <div className="text-white font-bold text-center mt-6 pb-6 font-reggae border-b-[0.1px] border-b-[#ffffff73]">
      {getTitle()}
    </div>
  );
};

export default App;
