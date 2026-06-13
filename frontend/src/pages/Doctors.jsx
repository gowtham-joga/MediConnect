import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Doctors() {
  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [doctors, setDoctors] =
    useState([]);

  const [expandedDoctor, setExpandedDoctor] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedSpecialization, setSelectedSpecialization] =
    useState("All");
  const [searchParams] = useSearchParams();

const aiSpecialization =
  searchParams.get("specialization");

  useEffect(() => {
    fetchDoctors();
  }, [aiSpecialization]);

  const fetchDoctors = async () => {
  try {
    let url =
      "http://localhost:5000/api/doctors?limit=20";

    if (aiSpecialization) {
      url += `&specialization=${aiSpecialization}`;
    }

    const response =
      await axios.get(url);

    setDoctors(response.data.doctors);

    if (aiSpecialization) {
      setSelectedSpecialization(
        aiSpecialization
      );
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleBookAppointment = async (
    doctorId,
    slot
  ) => {
    if (!appointmentDate) {
      alert("Please select a date");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId,
          appointmentDate,
          appointmentTime: slot,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Appointment Booked Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) => {
      const matchesSearch =
        doctor.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        doctor.hospital
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesSpecialization =
        selectedSpecialization ===
          "All" ||
        doctor.specialization ===
          selectedSpecialization;

      return (
        matchesSearch &&
        matchesSpecialization
      );
    }
  );

  const specializations = [
    "All",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
  ];

  return (
    <div
      style={{
        background:"#EEF4FA",
        minHeight:"100vh",
        padding:"30px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
          borderRadius:"30px",
          padding:"40px",
          color:"white",
          marginBottom:"30px",
        }}
      >
        <h1 style={{margin:0,fontSize:"42px"}}>
          Find Your Doctor
        </h1>

        <p
          style={{
            marginTop:"12px",
            fontSize:"18px",
          }}
        >
          Book appointments with trusted
          healthcare specialists.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search doctor or hospital..."
        value={searchTerm}
        onChange={(e)=>
          setSearchTerm(e.target.value)
        }
        style={{
          width:"100%",
          padding:"16px",
          borderRadius:"16px",
          border:"1px solid #D8E2EC",
          marginBottom:"20px",
        }}
      />

      <div
        style={{
          display:"flex",
          gap:"10px",
          flexWrap:"wrap",
          marginBottom:"30px",
        }}
      >
        {specializations.map((spec)=>(
          <button
            key={spec}
            onClick={() =>
              setSelectedSpecialization(spec)
            }
            style={{
              border:"none",
              padding:"10px 18px",
              borderRadius:"30px",
              cursor:"pointer",
              background:
                selectedSpecialization === spec
                  ? "#4F8EF7"
                  : "white",
              color:
                selectedSpecialization === spec
                  ? "white"
                  : "#1E293B",
              fontWeight:"600",
            }}
          >
            {spec}
          </button>
        ))}
      </div>
        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(520px,1fr))",
    gap: "25px",
  }}
>
      {filteredDoctors.map((doctor)=>(
        <div
          key={doctor.id}
          style={{
            background:"white",
            borderRadius:"20px",
            padding:"20px",
            marginBottom:"25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display:"flex",
              justifyContent:
                "space-between",
            }}
          >
           <div
  style={{
    display:"flex",
    gap:"15px",
    alignItems:"center",
  }}
>
  <div
    style={{
      width:"70px",
      height:"70px",
      borderRadius:"50%",
      background:
        "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      color:"white",
      fontSize:"28px",
      fontWeight:"700",
      flexShrink:0,
    }}
  >
    {doctor.name.replace("Dr. ", "").charAt(0)}
  </div>

  <div>
    <h2
      style={{
        margin:0,
        fontSize:"30px",
      }}
    >
      {doctor.name}
    </h2>

    <p
      style={{
        margin:"5px 0",
        color:"#4F8EF7",
        fontWeight:"600",
      }}
    >
      {doctor.specialization}
    </p>

    <p
      style={{
        margin:0,
        color:"#64748B",
      }}
    >
      {doctor.hospital}
    </p>
  </div>
</div>

           <div
  style={{
    background:"#FFF8E7",
    padding:"10px 15px",
    borderRadius:"12px",
    fontWeight:"600",
    height:"fit-content",
  }}
>
  ⭐ {doctor.rating}
</div>
          </div>

          <input
            type="date"
            value={appointmentDate}
            onChange={(e)=>
              setAppointmentDate(
                e.target.value
              )
            }
            style={{
              width:"100%",
              marginTop:"15px",
              padding:"12px",
              borderRadius:"12px",
              border:
                "1px solid #CBD5E1",
            }}
          />
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "20px",
  }}
>
  <div
    style={{
      background: "#F8FAFC",
      padding: "14px",
      borderRadius: "12px",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
        fontSize: "13px",
      }}
    >
      Experience
    </p>

    <h3
      style={{
        margin: "5px 0 0",
      }}
    >
      {doctor.experience} Years
    </h3>
  </div>

  <div
    style={{
      background: "#F8FAFC",
      padding: "14px",
      borderRadius: "12px",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
        fontSize: "13px",
      }}
    >
      Consultation Fee
    </p>

    <h3
      style={{
        margin: "5px 0 0",
      }}
    >
      ₹{doctor.fees}
    </h3>
  </div>

  <div
    style={{
      background: "#F8FAFC",
      padding: "14px",
      borderRadius: "12px",
      gridColumn: "1 / span 2",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
        fontSize: "13px",
      }}
    >
      Available Days
    </p>

    <h4
      style={{
        margin: "5px 0 0",
      }}
    >
      {doctor.availableDays?.join(", ")}
    </h4>
  </div>
</div>
          <button
            onClick={() =>
              setExpandedDoctor(
                expandedDoctor === doctor.id
                  ? null
                  : doctor.id
              )
            }
            style={{
              width:"100%",
              marginTop:"15px",
              padding:"14px",
              border:"none",
              borderRadius:"12px",
              background:"#4F8EF7",
              color:"white",
              fontWeight:"600",
              cursor:"pointer",
            }}
          >
            {expandedDoctor === doctor.id
              ? "Hide Slots"
              : "View Slots"}
          </button>

          {expandedDoctor === doctor.id && (
            <div
              style={{
                marginTop:"20px",
                paddingTop:"20px",
                borderTop:
                  "1px solid #E2E8F0",
              }}
            >
              <h4>
                Available Slots
              </h4>

              <div
                style={{
                  display:"flex",
                  gap:"10px",
                  flexWrap:"wrap",
                }}
              >
                {doctor.availableTimeSlots?.map(
                  (slot)=>(
                    <button
                      key={slot}
                      onClick={() =>
                        handleBookAppointment(
                          doctor.id,
                          slot
                        )
                      }
                      style={{
                        border:"none",
                        padding:
                          "10px 16px",
                        borderRadius:
                          "10px",
                        background:
                          "#2EC4B6",
                        color:"white",
                        cursor:"pointer",
                        fontWeight:"600",
                      }}
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}

export default Doctors;