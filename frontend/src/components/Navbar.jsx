import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        backgroundColor: "#eee",
      }}
    >
      <Link to="/">Doctors</Link>

      <Link to="/login">Login</Link>

      <Link to="/signup">Signup</Link>

      <Link to="/patient-dashboard">
        Patient Dashboard
      </Link>

      <Link to="/doctor-dashboard">
        Doctor Dashboard
      </Link>
    </div>
  );
}

export default Navbar;