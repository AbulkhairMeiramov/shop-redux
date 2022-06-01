import "./styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ApplicationModal } from "./components/ApplicationModal";

export default function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes> */}
      <ApplicationModal />
    </div>
  );
}
