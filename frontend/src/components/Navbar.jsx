import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const decodedToken = JSON.parse(
      atob(token.split(".")[1])
    );

    role = decodedToken.role;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navButtonStyle = {
    textDecoration: "none",
    color: "#1E293B",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "999px",
    transition: "0.3s",
    background: "rgba(255,255,255,0.5)",
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "18px 40px",
        background:
          "rgba(220,238,255,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom:
          "1px solid rgba(79,156,249,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontSize: "30px",
          fontWeight: "700",
          color: "#1E293B",
        }}
      >
        MediConnect
      </Link>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {!token && (
          <>
            <Link
              to="/doctors"
              style={navButtonStyle}
            >
              Doctors
            </Link>

            <Link
              to="/login"
              style={navButtonStyle}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                ...navButtonStyle,
                background: "#4F9CF9",
                color: "white",
              }}
            >
              Signup
            </Link>
          </>
        )}

       {token &&
  role === "patient" && (
    <>
      <Link
        to="/doctors"
        style={navButtonStyle}
      >
        Doctors
      </Link>

      <Link
        to="/ai-symptom-checker"
        style={navButtonStyle}
      >
        AI Checker
      </Link>

      <Link
        to="/patient-dashboard"
        style={navButtonStyle}
      >
        Dashboard
      </Link>
    </>
)}

       {token &&
  role === "doctor" && (
    <>
      <Link
        to="/doctor-dashboard"
        style={navButtonStyle}
      >
        Dashboard
      </Link>

      <Link
        to="/doctor-profile"
        style={navButtonStyle}
      >
        My Profile
      </Link>
    </>
  )}

        {token && (
          <button
            onClick={handleLogout}
            style={{
              background: "#2EC4B6",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;