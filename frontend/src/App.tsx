import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StartScreenPage from "./pages/auth/start-screen-page";
import LoginScreenPage from "./pages/auth/login-screen-page";
import ForgotPasswordPage from "./pages/auth/forgot-password-page";
import EmailVerificationPage from "./pages/auth/email-verification-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import Game from "./pages/in-game-visualizer";
import UploadGame from "./pages/in-game-visualizer2";
import Campaign from "./pages/cart";
import CampaignDetails from "./pages/cart2";
import UserProfile from "./pages/Profile/userProfile";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to start screen */}
        <Route path="/" element={<Navigate to="/start-screen" replace />} />

        {/* Auth routes */}
        <Route path="/start-screen" element={<StartScreenPage />} />
        <Route path="/login-screen" element={<LoginScreenPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />

        {/* Other routes */}
        <Route path="/dashboard" element={<Game />} />
        <Route path="/upload-game" element={<UploadGame />} />
        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/campaign-details" element={<CampaignDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
