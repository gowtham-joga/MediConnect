import { useEffect, useState } from "react";
import axios from "axios";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [profileNotFound, setProfileNotFound] =
  useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);
  const [isEditing, setIsEditing] =
  useState(false);

const [formData, setFormData] =
  useState({
    specialization: "",
    hospital: "",
    experience: "",
    fees: "",
    availableDays: "",
    availableTimeSlots: "",
  });
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/doctors/my-profile",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setDoctor(response.data);
      setFormData({
  specialization:
    response.data.specialization || "",
  hospital:
    response.data.hospital || "",
  experience:
    response.data.experience || "",
  fees:
    response.data.fees || "",
  availableDays:
    response.data.availableDays?.join(", ") ||
    "",
  availableTimeSlots:
    response.data.availableTimeSlots?.join(", ") ||
    "",
});
    } catch (error) {
  if (error.response?.status === 404) {
    setProfileNotFound(true);
  } else {
    console.log(error);
  }
}
};
  const handleUpdateProfile =
  async () => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/doctors/update-profile",
        {
          specialization:
            formData.specialization,
          hospital:
            formData.hospital,
          experience:
            Number(formData.experience),
          fees:
            Number(formData.fees),
          availableDays:
            formData.availableDays
              .split(",")
              .map((d) => d.trim()),
          availableTimeSlots:
            formData.availableTimeSlots
              .split(",")
              .map((t) => t.trim()),
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert(
        "Profile Updated Successfully"
      );

      setIsEditing(false);

      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

if (profileNotFound) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1>No Doctor Profile Found</h1>

        <p>
          Create your profile to start
          receiving appointments.
        </p>

        <button
          style={{
            background:
              "#4F8EF7",
            color: "white",
            border: "none",
            padding:
              "14px 24px",
            borderRadius:
              "12px",
            cursor:
              "pointer",
            marginTop:
              "15px",
          }}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}

if (!doctor) {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
      }}
    >
      Loading Profile...
    </div>
  );
}
  const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  fontSize: "15px",
};
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to bottom, #EEF6FF, #F8FBFF)",
      }}
    >
      {/* Profile Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.08)",
          borderLeft: "8px solid #4F8EF7",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            {doctor.name?.charAt(4)}
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                color: "#1E293B",
                fontSize: "40px",
              }}
            >
              {doctor.name}
            </h1>

            <p
              style={{
                marginTop: "8px",
                marginBottom: "4px",
                color: "#4F8EF7",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              {doctor.specialization}
            </p>

            <p
              style={{
                color: "#64748B",
                margin: 0,
              }}
            >
              {doctor.hospital}
            </p>
          </div>
        </div>
        <button
  onClick={() =>
    setIsEditing(!isEditing)
  }
  style={{
    background:
      "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
    color: "white",
    border: "none",
    padding: "14px 26px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  {isEditing
    ? "Cancel"
    : "Edit Profile"}
</button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              color: "#64748B",
              marginBottom: "10px",
            }}
          >
            Experience
          </h3>

          <h1
            style={{
              color: "#4F8EF7",
              margin: 0,
            }}
          >
            {doctor.experience} Years
          </h1>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              color: "#64748B",
              marginBottom: "10px",
            }}
          >
            Consultation Fee
          </h3>

          <h1
            style={{
              color: "#2EC4B6",
              margin: 0,
            }}
          >
            ₹{doctor.fees}
          </h1>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              color: "#64748B",
              marginBottom: "10px",
            }}
          >
            Rating
          </h3>

          <h1
            style={{
              color: "#F59E0B",
              margin: 0,
            }}
          >
            {doctor.rating || 4.8}
          </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1E293B",
            }}
          >
            Available Days
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {doctor.availableDays?.map((day) => (
              <span
                key={day}
                style={{
                  padding: "10px 16px",
                  borderRadius: "30px",
                  backgroundColor: "#E8F1FF",
                  color: "#2563EB",
                  fontWeight: "600",
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>


        {isEditing && (
  <div
    style={{
      marginTop: "30px",
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.06)",
    }}
  >
    <h2>Edit Profile</h2>

    <input
      type="text"
      placeholder="Specialization"
      value={formData.specialization}
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
      type="text"
      placeholder="Hospital"
      value={formData.hospital}
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
      placeholder="Experience"
      value={formData.experience}
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
      placeholder="Monday, Tuesday"
      value={formData.availableDays}
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
      placeholder="9:00 AM, 2:00 PM"
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
      onClick={
        handleUpdateProfile
      }
      style={{
        marginTop: "20px",
        background:
          "#4F8EF7",
        color: "white",
        border: "none",
        padding:
          "12px 24px",
        borderRadius:
          "12px",
        cursor:
          "pointer",
        fontWeight:
          "600",
      }}
    >
      Save Changes
    </button>
  </div>
)}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1E293B",
            }}
          >
            Available Slots
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {doctor.availableTimeSlots?.map(
              (slot) => (
                <span
                  key={slot}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "30px",
                    backgroundColor: "#DDF8F3",
                    color: "#0F766E",
                    fontWeight: "600",
                  }}
                >
                  {slot}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;