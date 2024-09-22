import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./pages/Home";
import Coaching from "./pages/coach/Coaching";
import Planning from "./pages/user/Planning";
import Sports from "./pages/sports/Sports";
import Profil from "./pages/user/Profil";
import NavbarWeb from "./components/header/NavbarWeb";
import CoursDetail from "./pages/cours/CoursDetail";
import CoachDetail from "./pages/coach/CoachDetail";
import ParticipantDetail from "./pages/user/ParticipantDetail";
import CreationCours from "./pages/cours/CreationCours";
import Connexion from "./pages/user/Connexion";
import Inscription from "./pages/user/Inscription";
import SportDetail from "./pages/sports/SportDetail";
import { useAuth } from "./hooks/useAuth";
import UpdateProfil from "./pages/user/UpdateProfil";
import UpdateCours from "./pages/cours/UpdateCours";
import NotFound from "./pages/NotFound";

function App() {
    useAuth();

    return (
        <Router>
            <div className="w-full h-screen flex flex-col justify-between items-center md:bg-[#1f262e] bg-black">
                <div className="bg-[#1f262e] w-full md:max-w-full max-w-md h-full mx-4 flex flex-col justify-between">
                    <Header />
                    <div className="w-full h-full overflow-hidden overflow-y-auto py-4 md:px-0 px-6 md:w-6/12 md:mx-auto">
                        <div className="w-full h-full">
                            <div className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/coaching"
                                        element={<Coaching />}
                                    />
                                    <Route
                                        path="/planning"
                                        element={<Planning />}
                                    />
                                    <Route
                                        path="/sports"
                                        element={<Sports />}
                                    />
                                    <Route
                                        path="/profil"
                                        element={<Profil />}
                                    />
                                    <Route
                                        path="/profil-modification"
                                        element={<UpdateProfil />}
                                    />
                                    <Route
                                        path="/coach/:coachId"
                                        element={<CoachDetail />}
                                    />
                                    <Route
                                        path="/user/:id"
                                        element={<ParticipantDetail />}
                                    />
                                    <Route
                                        path="/cours/:courseId"
                                        element={<CoursDetail />}
                                    />
                                    <Route
                                        path="/cours/creation"
                                        element={<CreationCours />}
                                    />
                                    <Route
                                        path="/cours/modification/:courseId"
                                        element={<UpdateCours />}
                                    />
                                    <Route
                                        path="/connexion"
                                        element={<Connexion />}
                                    />
                                    <Route
                                        path="/inscription"
                                        element={<Inscription />}
                                    />
                                    <Route
                                        path="/sport/:id"
                                        element={<SportDetail />}
                                    />
                                    <Route path="*" element={<NotFound />} />
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
            case "/profil":
                return "Mon compte";
            case "/login":
                return "Se connecter";
            case "/signup":
                return "Inscription";
            case "/coaching":
                return "Coachs disponibles";
            case "/planning":
                return "Mes prochains cours";
            case "/sports":
                return "Wiki des sports";
            case "/connexion":
                return "Espace de connexion";
            case "/inscription":
                return "Espace d'inscription";
            case "/":
                return "Koliseum Academy";
            default:
                return "Koliseum Academy";
        }
    };

    return (
        <div className="text-white font-bold text-center mt-6 pb-6 font-reggae border-b-[0.1px] border-b-[#ffffff73]">
            {getTitle()}
        </div>
    );
};

export default App;
