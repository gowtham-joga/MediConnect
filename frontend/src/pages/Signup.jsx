import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "patient",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background:
          "linear-gradient(135deg,#EEF5F9,#F4FAFC)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow:
            "0 20px 50px rgba(15,23,42,0.08)",
          backgroundColor: "#F8FBFD",
          border:
            "1px solid #E2E8F0",
        }}
      >
        {/* Left Side */}

        <div
          style={{
            flex: 1,
            background:
              "linear-gradient(135deg,#60A5FA,#2DD4BF)",
            color: "white",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              lineHeight: "1.1",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Join
            <br />
            MediConnect
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              marginBottom: "35px",
              color:
                "rgba(255,255,255,0.95)",
            }}
          >
            Create your account and
            connect with trusted
            healthcare professionals.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "18px",
            }}
          >
            <span>
              ✓ Book Appointments
            </span>

            <span>
              ✓ Track Medical History
            </span>

            <span>
              ✓ Connect With Doctors
            </span>
          </div>
        </div>

        {/* Right Side */}

        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "25px",
              color: "#0F172A",
            }}
          >
            Sign Up
          </h1>

          <form
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "18px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "14px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
                transition: "0.3s",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "18px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "14px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
                transition: "0.3s",
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={
                formData.password
              }
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "18px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "14px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
                transition: "0.3s",
              }}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "22px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "14px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
                transition: "0.3s",
              }}
            >
              <option value="patient">
                Patient
              </option>

              <option value="doctor">
                Doctor
              </option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg,#4F8EF7,#2DD4BF)",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Create Account
            </button>
          </form>

          <p
            style={{
              marginTop: "22px",
              color: "#64748B",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#4F8EF7",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;