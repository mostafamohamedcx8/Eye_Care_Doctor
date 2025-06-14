import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Examination from "./pages/Examination";
import ResetPassword from "./pages/Resetpassword";
import OtpCode from "./pages/OTP";
import Newpassword from "./pages/NewPassword";
import ExaminationReport from "./pages/ExaminationReport";
import DoctorCard from "./pages/DoctorPage";
// import DoctorDetailes from "./pages/DoctorDetailes";
import ProfilePage from "./pages/ProfilePage";
import PatientPage from "../src/pages/PatientPage";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/VerifyEmail";
import PatientTableUI from "./pages/AllPatient";
import ArchivedPatients from "./pages/ArchivePatient";
import ReportsList from "./pages/ReportsList";
import Career from "./pages/Career";
import Team from "./pages/Team";
import Protection from "./pages/Protection";
import Terms from "./pages/Terms";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Privacy from "./pages/Privacy";
import Advertise from "./pages/Advertise";

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/team" element={<Team />} />
          <Route path="/protection" element={<Protection />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/advertise" element={<Advertise />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/OtpCode" element={<OtpCode />} />
          <Route path="/NewPassword" element={<Newpassword />} />
          <Route
            path="/PatientPage"
            element={
              <ProtectedRoute>
                <PatientPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ExaminationReport/:id"
            element={
              <ProtectedRoute>
                <ExaminationReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? <PatientTableUI /> : <Home />
            }
          />
          <Route
            path="/DoctorCard/:id"
            element={
              <ProtectedRoute>
                <DoctorCard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/DoctorDetailes/:id"
            element={
              <ProtectedRoute>
                <DoctorDetailes />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/Examination/:id"
            element={
              <ProtectedRoute>
                <Examination />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ArchivedPatients"
            element={
              <ProtectedRoute>
                <ArchivedPatients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProfilePage"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ReportsList/:id"
            element={
              <ProtectedRoute>
                <ReportsList />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
        <ToastContainer position="top-left" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
