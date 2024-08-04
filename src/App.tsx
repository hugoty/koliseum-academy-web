import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Planning from './pages/Planning';
import Sports from './pages/Sports';
import Profil from './pages/Profil';
import NavbarWeb from './components/NavbarWeb';
import CoursDetail from './pages/CoursDetail';
import CoachDetail from './pages/CoachDetail';
import ParticipantDetail from './pages/ParticipantDetail';
import CreationCours from './pages/CreationCours';

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col justify-between items-center md:bg-[#1f262e] bg-black">
        <div className="bg-[#1f262e] w-full md:max-w-full max-w-md h-full mx-4 flex flex-col justify-between">
          <div className="text-white font-bold text-center mt-6 pb-6 font-reggae border-b-[0.1px] border-b-[#ffffff73]">Koliseum Academy</div>
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
                  <Route path="/coach/:id" element={<CoachDetail />} />
                  <Route path="/user/:id" element={<ParticipantDetail />} />
                  <Route path="/cours/creation" element={<CreationCours />} />
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

export default App;
