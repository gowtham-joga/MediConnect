import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function AISymptomChecker() {
    const [symptoms, setSymptoms] =
      useState("");
    const [loading, setLoading] =
  useState(false);

const [result, setResult] =
  useState(null);
  const navigate = useNavigate();
    const handleFindDoctor = async () => {
      if (!symptoms.trim()) {
        alert("Enter symptoms");
        return;
      }
    
      try {
        setLoading(true);
    
        const response =
          await axios.post(
            "http://localhost:5000/api/ai/suggest-doctor",
            {
              symptoms,
            }
          );
    
        setResult(response.data);
      } catch (error) {
        console.log(error);
    
        alert(
          "Failed to get recommendation"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        AI Symptom Checker
      </h1>

      <p>
        Describe your symptoms and
        we'll suggest the right
        specialist.
      </p>

      <textarea
        rows="6"
        value={symptoms}
        onChange={(e) =>
          setSymptoms(e.target.value)
        }
        placeholder="Example: Chest pain, shortness of breath..."
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "12px",
        }}
      />

     <button
  onClick={handleFindDoctor}
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    background: "#4F8EF7",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  {loading
    ? "Searching..."
    : "Find Doctor"}
</button>
{result && (
  <div
    style={{
      marginTop: "30px",
      padding: "20px",
      background: "#F8FAFC",
      borderRadius: "12px",
    }}
  >
    <h2>
      Recommended Specialist:
    </h2>

    <h3
      style={{
        color: "#4F8EF7",
      }}
    >
      {result.recommendedSpecialist}
    </h3>
  </div>
)}
{result?.doctors?.map((doctor) => (
  <div
    key={doctor.id}
    style={{
      background: "white",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h2>{doctor.name}</h2>

    <p>
      Specialization:
      {doctor.specialization}
    </p>

    <p>
      Hospital:
      {doctor.hospital}
    </p>

    <p>
      Experience:
      {doctor.experience} Years
    </p>

   <p>
  Consultation Fee:
  ₹{doctor.fees}
</p>
<button
  onClick={() =>
    navigate(
      `/doctors?specialization=${doctor.specialization}`
    )
  }
  style={{
    marginTop: "15px",
    background: "#4F8EF7",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  View Matching Doctors
</button>
  </div>
))}
    </div>
  );
}

export default AISymptomChecker;