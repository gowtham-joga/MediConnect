import { useEffect, useState } from "react";
import axios from "axios";

function DoctorDashboard() {
  const [appointments, setAppointments] =
    useState([]);
  const [searchTerm, setSearchTerm] =
  useState("");

const [selectedFilter, setSelectedFilter] =
  useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/appointments/doctor-appointments",
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(response.data);

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    appointmentId,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/appointments/update-status/${appointmentId}`,
        {
          status,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert(`Appointment ${status}`);

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const pendingCount =
    appointments.filter(
      (a) => a.status === "pending"
    ).length;

  const approvedCount =
    appointments.filter(
      (a) => a.status === "approved"
    ).length;

  const rejectedCount =
    appointments.filter(
      (a) => a.status === "rejected"
    ).length;
  
  const today = new Date()
  .toISOString()
  .split("T")[0];

const todaysAppointments =
  appointments.filter(
    (appointment) =>
      appointment.appointmentDate ===
      today
  );

    const filteredAppointments =
  appointments.filter((appointment) => {

    const matchesSearch =
      appointment.patient?.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesFilter =
      selectedFilter === "all"
        ? true
        : appointment.status ===
          selectedFilter;

    return (
      matchesSearch &&
      matchesFilter
    );
  });
  return (
    <div
      style={{
        padding: "40px",
        background:
          "linear-gradient(to bottom, #EEF6FF, #F8FAFC)",
        minHeight: "100vh",
      }}
    >
     <div
  style={{
    background:
      "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
    borderRadius: "24px",
    padding: "35px",
    color: "white",
    marginBottom: "30px",
    boxShadow:
      "0 10px 30px rgba(79,142,247,0.2)",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "2rem",
    }}
  >
    Welcome Back Doctor!
  </h1>

  <p
    style={{
      marginTop: "10px",
      opacity: 0.95,
      fontSize: "1rem",
    }}
  >
    Manage appointments, approve
    requests and track patient visits.
  </p>

  <div
    style={{
      marginTop: "20px",
      fontSize: "1.1rem",
      fontWeight: "600",
    }}
  >
    Total Appointments:{" "}
    {appointments.length}
  </div>
</div>

<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="Search patient..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(
        e.target.value
      )
    }
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "14px",
      borderRadius: "12px",
      border:
        "1px solid #CBD5E1",
      fontSize: "15px",
      outline: "none",
      background: "white",
    }}
  />

  <button
    onClick={() =>
      setSelectedFilter("all")
    }
    style={{
      padding:
        "12px 20px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background:
        selectedFilter === "all"
          ? "#4F8EF7"
          : "white",
      color:
        selectedFilter === "all"
          ? "white"
          : "#334155",
    }}
  >
    All
  </button>

  <button
    onClick={() =>
      setSelectedFilter(
        "pending"
      )
    }
    style={{
      padding:
        "12px 20px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background:
        selectedFilter ===
        "pending"
          ? "#F59E0B"
          : "white",
      color:
        selectedFilter ===
        "pending"
          ? "white"
          : "#334155",
    }}
  >
    Pending
  </button>

  <button
    onClick={() =>
      setSelectedFilter(
        "approved"
      )
    }
    style={{
      padding:
        "12px 20px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background:
        selectedFilter ===
        "approved"
          ? "#10B981"
          : "white",
      color:
        selectedFilter ===
        "approved"
          ? "white"
          : "#334155",
    }}
  >
    Approved
  </button>

  <button
    onClick={() =>
      setSelectedFilter(
        "rejected"
      )
    }
    style={{
      padding:
        "12px 20px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background:
        selectedFilter ===
        "rejected"
          ? "#EF4444"
          : "white",
      color:
        selectedFilter ===
        "rejected"
          ? "white"
          : "#334155",
    }}
  >
    Rejected
  </button>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Total</h3>
          <h1>{appointments.length}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Pending</h3>
          <h1
            style={{
              color: "#F59E0B",
            }}
          >
            {pendingCount}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Approved</h3>
          <h1
            style={{
              color: "#10B981",
            }}
          >
            {approvedCount}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Rejected</h3>
          <h1
            style={{
              color: "#EF4444",
            }}
          >
            {rejectedCount}
          </h1>
        </div>
      </div>
      
      <h2
  style={{
    marginBottom: "20px",
    color: "#1E293B",
  }}
>
  Today's Schedule
</h2>

<div
  style={{
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "35px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.05)",
  }}
>
  {todaysAppointments.length === 0 ? (
    <p
      style={{
        color: "#64748B",
      }}
    >
      No appointments scheduled for
      today.
    </p>
  ) : (
    todaysAppointments.map(
      (appointment) => (
        <div
          key={appointment.id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom:
              "1px solid #E2E8F0",
          }}
        >
          <div>
            <h4
              style={{
                margin: 0,
              }}
            >
              {
                appointment.patient
                  ?.name
              }
            </h4>

            <p
              style={{
                margin:
                  "5px 0 0 0",
                color:
                  "#64748B",
              }}
            >
              {
                appointment.patient
                  ?.email
              }
            </p>
          </div>

          <div
            style={{
              fontWeight:
                "600",
              color:
                "#2563EB",
            }}
          >
            {
              appointment.appointmentTime
            }
          </div>
        </div>
      )
    )
  )}
</div>

<h2
  style={{
    marginBottom: "20px",
    color: "#1E293B",
  }}
>
  Recent Appointments
</h2>


      {filteredAppointments.map(
  (appointment) => (
    <div
      key={appointment.id}
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.05)",
        border:
          "1px solid #E2E8F0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              color: "#1E293B",
            }}
          >
            {
              appointment.patient
                ?.name
            }
          </h3>

          <p
            style={{
              margin:
                "5px 0 0 0",
              color: "#64748B",
            }}
          >
            {
              appointment.patient
                ?.email
            }
          </p>
        </div>

        <span
          style={{
            padding:
              "8px 16px",
            borderRadius:
              "999px",
            fontWeight:
              "600",
            background:
              appointment.status ===
              "approved"
                ? "#DCFCE7"
                : appointment.status ===
                  "pending"
                ? "#FEF3C7"
                : "#FEE2E2",
            color:
              appointment.status ===
              "approved"
                ? "#166534"
                : appointment.status ===
                  "pending"
                ? "#92400E"
                : "#991B1B",
          }}
        >
          {appointment.status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background:
              "#F8FAFC",
            padding:
              "10px 14px",
            borderRadius:
              "10px",
          }}
        >
          {" "}
          {
            appointment.appointmentDate
          }
        </div>

        <div
          style={{
            background:
              "#F8FAFC",
            padding:
              "10px 14px",
            borderRadius:
              "10px",
          }}
        >
          {" "}
          {
            appointment.appointmentTime
          }
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            updateStatus(
              appointment.id,
              "approved"
            )
          }
          style={{
            background:
              "#10B981",
            color: "white",
            border: "none",
            padding:
              "10px 18px",
            borderRadius:
              "10px",
            cursor:
              "pointer",
            fontWeight:
              "600",
          }}
        >
          Approve
        </button>

        <button
          onClick={() =>
            updateStatus(
              appointment.id,
              "rejected"
            )
          }
          style={{
            background:
              "#EF4444",
            color: "white",
            border: "none",
            padding:
              "10px 18px",
            borderRadius:
              "10px",
            cursor:
              "pointer",
            fontWeight:
              "600",
          }}
        >
          Reject
        </button>
      </div>
    </div>
  )
)}
    </div>
  );
}

export default DoctorDashboard;