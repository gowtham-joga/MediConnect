import { useEffect, useState } from "react";

import axios from "axios";

function PatientDashboard() {
  const [appointments, setAppointments] =
    useState([]);
  const [reportTitle, setReportTitle] =
  useState("");

const [selectedFile, setSelectedFile] =
  useState(null);

const [uploading, setUploading] =
  useState(false);
const [medicalRecords, setMedicalRecords] =
  useState([]);
  const totalAppointments =
  appointments.length;

const approvedAppointments =
  appointments.filter(
    (a) => a.status === "approved"
  ).length;

const pendingAppointments =
  appointments.filter(
    (a) => a.status === "pending"
  ).length;

const rejectedAppointments =
  appointments.filter(
    (a) => a.status === "rejected"
  ).length;
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/appointments/my-appointments",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setAppointments(response.data);
      const recordsResponse =
  await axios.get(
    "http://localhost:5000/api/medical-records/my-records",
    {
      headers: {
        authorization: token,
      },
    }
  );

setMedicalRecords(
  recordsResponse.data
);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (
  appointmentId
) => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.delete(
      "http://localhost:5000/api/appointments/cancel",
      {
        headers: {
          authorization: token,
        },
        data: {
          appointmentId,
        },
      }
    );

    alert("Appointment Cancelled");

    fetchAppointments();
  } catch (error) {
    console.log(error);
  }
};
const handleUploadReport = async () => {
  if (!reportTitle || !selectedFile) {
    alert(
      "Please enter a report title and select a file"
    );
    fetchAppointments();
    return;
  }

  try {
    setUploading(true);

    const token =
      localStorage.getItem("token");

    const formData = new FormData();

    formData.append(
      "title",
      reportTitle
    );

    formData.append(
      "report",
      selectedFile
    );

    await axios.post(
      "http://localhost:5000/api/medical-records/upload",
      formData,
      {
        headers: {
          authorization: token,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    alert(
      "Medical Record Uploaded Successfully"
    );

    setReportTitle("");
    setSelectedFile(null);
  } catch (error) {
    console.log(error);

    alert("Upload Failed");
  } finally {
    setUploading(false);
  }
};
  return (
    <div style={{ padding: "20px",background: "#EEF4FA",
    minHeight: "100vh", }}>
      <div
  style={{
    background:
      "linear-gradient(135deg,#4F8EF7,#2EC4B6)",
    borderRadius: "24px",
    padding: "35px",
    color: "white",
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "2rem",
    }}
  >
    My Appointments
  </h1>

  <p
    style={{
      marginTop: "10px",
      opacity: 0.95,
    }}
  >
    Track, manage and cancel your
    appointments.
  </p>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 6px 20px rgba(0,0,0,0.05)",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
      }}
    >
      Total Appointments
    </p>

    <h2>{totalAppointments}</h2>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 6px 20px rgba(0,0,0,0.05)",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
      }}
    >
      Approved
    </p>

    <h2
      style={{
        color: "#10B981",
      }}
    >
      {approvedAppointments}
    </h2>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 6px 20px rgba(0,0,0,0.05)",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
      }}
    >
      Pending
    </p>

    <h2
      style={{
        color: "#F59E0B",
      }}
    >
      {pendingAppointments}
    </h2>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 6px 20px rgba(0,0,0,0.05)",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
      }}
    >
      Rejected
    </p>

    <h2
      style={{
        color: "#EF4444",
      }}
    >
      {rejectedAppointments}
    </h2>
  </div>
</div>

<h2
  style={{
    color: "#1E293B",
    marginBottom: "20px",
  }}
>
  Appointment History
</h2>

      {appointments.map((appointment) => (
        <div
  key={appointment.id}
  style={{
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent:
        "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <h2
        style={{
          margin: 0,
        }}
      >
        {appointment.doctor?.name}
      </h2>

      <p
        style={{
          color: "#4F8EF7",
          fontWeight: "600",
          margin: "5px 0",
        }}
      >
        {
          appointment.doctor
            ?.specialization
        }
      </p>

      <p
        style={{
          color: "#64748B",
          margin: 0,
        }}
      >
        {
          appointment.doctor
            ?.hospital
        }
      </p>
    </div>

    <div
      style={{
        padding:
          "8px 16px",
        borderRadius:
          "999px",
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
        fontWeight:
          "600",
      }}
    >
      {appointment.status}
    </div>
  </div>

  <div
    style={{
      display: "flex",
      gap: "15px",
      marginTop: "20px",
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        background:
          "#F8FAFC",
        padding:
          "10px 15px",
        borderRadius:
          "12px",
      }}
    >
      📅 {
        appointment.appointmentDate
      }
    </div>

    <div
      style={{
        background:
          "#F8FAFC",
        padding:
          "10px 15px",
        borderRadius:
          "12px",
      }}
    >
      🕒 {
        appointment.appointmentTime
      }
    </div>
  </div>

  {appointment.status ===
    "pending" && (
    <button
      onClick={() =>
        cancelAppointment(
          appointment.id
        )
      }
      style={{
        marginTop:
          "20px",
        border: "none",
        background:
          "#EF4444",
        color: "white",
        padding:
          "12px 20px",
        borderRadius:
          "12px",
        cursor:
          "pointer",
        fontWeight:
          "600",
      }}
    >
      Cancel Appointment
    </button>
  )}
</div>

         
       
      ))}
  <div
  style={{
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    marginTop: "40px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.06)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#1E293B",
    }}
  >
    Medical Records
  </h2>

  <p
    style={{
      color: "#64748B",
      marginBottom: "20px",
    }}
  >
    Upload prescriptions, lab reports and
    medical documents securely.
  </p>

  <input
    type="text"
    placeholder="Report Title (e.g. Blood Test Report)"
    value={reportTitle}
    onChange={(e) =>
      setReportTitle(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #CBD5E1",
      marginBottom: "15px",
    }}
  />

  <input
    type="file"
    accept=".pdf,.png,.jpg,.jpeg"
    onChange={(e) =>
      setSelectedFile(
        e.target.files[0]
      )
    }
    style={{
      marginBottom: "20px",
    }}
  />

  <button
    onClick={handleUploadReport}
    style={{
      background: "#4F8EF7",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    {uploading
      ? "Uploading..."
      : "Upload Report"}
  </button>
  {medicalRecords.length > 0 && (
  <div
    style={{
      marginTop: "30px",
      borderTop: "1px solid #E2E8F0",
      paddingTop: "20px",
    }}
  >
    <h3
      style={{
        color: "#1E293B",
        marginBottom: "15px",
      }}
    >
      My Medical Records
    </h3>

    {medicalRecords.map((record) => (
      <div
        key={record.id}
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          background: "#F8FAFC",
          padding: "12px 16px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <strong>
            {record.title}
          </strong>
          <br />
          <small
            style={{
              color: "#64748B",
            }}
          >
            {record.originalName}
          </small>
        </div>

        <a
          href={`http://localhost:5000/${record.filePath.replace(
            /\\/g,
            "/"
          )}`}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#4F8EF7",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          View
        </a>
      </div>
    ))}
  </div>
)}
</div>
    </div>
  );
}

export default PatientDashboard;