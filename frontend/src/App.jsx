import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Doctors />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
  path="/patient-dashboard"
  element={
    <ProtectedRoute allowedRole="patient">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor-dashboard"
  element={
    <ProtectedRoute allowedRole="doctor">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;