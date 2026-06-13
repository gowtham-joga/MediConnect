import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      const tokenData = JSON.parse(
        atob(response.data.token.split(".")[1])
        );
 if (tokenData.role === "doctor") {
  try {
    await axios.get(
      "http://localhost:5000/api/doctors/my-profile",
      {
        headers: {
          authorization:
            response.data.token,
        },
      }
    );

    navigate("/doctor-dashboard");
  } catch (error) {
    navigate(
      "/create-doctor-profile"
    );
  }
}else {
  navigate("/patient-dashboard");
}
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

 return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #F0F9FF 0%, #ECFEFF 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background Blob 1 */}
    <div
      style={{
        position: "absolute",
        width: "450px",
        height: "450px",
        background:
          "rgba(59,130,246,0.12)",
        borderRadius: "50%",
        top: "-150px",
        right: "-150px",
        filter: "blur(90px)",
      }}
    />

    {/* Background Blob 2 */}
    <div
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background:
          "rgba(20,184,166,0.12)",
        borderRadius: "50%",
        bottom: "-150px",
        left: "-150px",
        filter: "blur(90px)",
      }}
    />

    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "1100px",
        background:
          "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        borderRadius: "30px",
        overflow: "hidden",
        boxShadow:
          "0 20px 50px rgba(0,0,0,0.08)",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          background:
            "linear-gradient(135deg,#3B82F6,#14B8A6)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.2rem",
            marginBottom: "20px",
            color: "white",
            lineHeight: "1.1",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            opacity: "0.95",
          }}
        >
          Access your appointments,
          healthcare records and stay
          connected with trusted doctors
          through MediConnect.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: "16px",
          }}
        >
          <div>
            ✓ Secure Healthcare Platform
          </div>

          <div>
            ✓ Manage Appointments Easily
          </div>

          <div>
            ✓ Connect With Trusted Doctors
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          background:
            "rgba(255,255,255,0.95)",
        }}
      >
        <h2
          style={{
            color: "#1E293B",
            marginBottom: "30px",
            fontSize: "2rem",
          }}
        >
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              padding: "15px",
              borderRadius: "12px",
              border:
                "1px solid #CBD5E1",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              padding: "15px",
              borderRadius: "12px",
              border:
                "1px solid #CBD5E1",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#4F9CF9",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            color: "#64748B",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate("/signup")
            }
            style={{
              color: "#4F9CF9",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;