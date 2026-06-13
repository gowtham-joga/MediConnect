import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateDoctorProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      specialization: "",
      experience: "",
      hospital: "",
      fees: "",
      availableDays: "",
      availableTimeSlots: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/doctors/create-profile",
        {
          specialization:
            formData.specialization,

          experience: Number(
            formData.experience
          ),

          hospital:
            formData.hospital,

          fees: Number(
            formData.fees
          ),

          availableDays:
            formData.availableDays
              .split(",")
              .map((day) =>
                day.trim()
              ),

          availableTimeSlots:
            formData.availableTimeSlots
              .split(",")
              .map((slot) =>
                slot.trim()
              ),
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert(
        "Profile Created Successfully"
      );

      navigate(
        "/doctor-dashboard"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to create profile"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid #CBD5E1",
    fontSize: "15px",
    marginBottom: "15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#EEF6FF,#F8FBFF)",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          Create Doctor Profile
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "30px",
          }}
        >
          Complete your profile to
          start receiving
          appointments.
        </p>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Specialization"
            value={
              formData.specialization
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                specialization:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Experience (Years)"
            value={
              formData.experience
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                experience:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Hospital Name"
            value={
              formData.hospital
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                hospital:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Consultation Fee"
            value={formData.fees}
            onChange={(e) =>
              setFormData({
                ...formData,
                fees:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Available Days (Monday, Tuesday)"
            value={
              formData.availableDays
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                availableDays:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Available Slots (9:00 AM, 2:00 PM)"
            value={
              formData.availableTimeSlots
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                availableTimeSlots:
                  e.target.value,
              })
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDoctorProfile;