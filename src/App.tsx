import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Planning from './pages/Planning';
import Sports from './pages/Sports';
import Profil from './pages/Profil';

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col justify-between items-center bg-black">
        <div className="bg-[#1f262e] w-full max-w-md h-full mx-4 flex flex-col justify-between">
          <div className="text-white font-bold text-center mt-10 font-reggae">Koliseum Academy</div>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </div>
          <Navbar />
        </div>
      </div>
    </Router>
  );
}

export default App;
