import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorProfile from "./pages/DoctorProfile";
import CreateDoctorProfile from "./pages/CreateDoctorProfile";
import AISymptomChecker from "./pages/AISymptomChecker";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
  path="/"
  element={<Home />}
/>
<Route
  path="/doctors"
  element={<Doctors />}
/>

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
<Route
  path="/doctor-profile"
  element={
    <ProtectedRoute allowedRole="doctor">
      <DoctorProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/create-doctor-profile"
  element={
    <ProtectedRoute allowedRole="doctor">
      <CreateDoctorProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai-symptom-checker"
  element={
    <ProtectedRoute allowedRole="patient">
      <AISymptomChecker />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;