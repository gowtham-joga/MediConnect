import { useEffect, useState } from "react";

import axios from "axios";

function PatientDashboard() {
  const [appointments, setAppointments] =
    useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Dashboard</h1>

      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            Doctor ID:{" "}
            {appointment.doctorId}
          </p>

          <p>
            Date:{" "}
            {appointment.appointmentDate}
          </p>

          <p>
            Status: {appointment.status}
          </p>

          <p>
            Time:{" "}
            {appointment.appointmentTime}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PatientDashboard;