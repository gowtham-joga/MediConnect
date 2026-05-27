import { useEffect, useState } from "react";

import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/doctors"
      );
      console.log(response.data);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookAppointment = async (
  doctorId
) => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/appointments/book",
      {
        doctorId,
        appointmentDate: "2026-06-03",
        appointmentTime: "11:00 AM",
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    alert("Appointment Booked");
  } catch (error) {
    console.log(error);

    alert("Booking Failed");
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctors</h1>

      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{doctor.specialization}</h3>

          <p>Hospital: {doctor.hospital}</p>

          <p>Fees: ₹{doctor.fees}</p>

          <p>
            Experience: {doctor.experience} years
          </p>
          <button
  onClick={() =>
    handleBookAppointment(doctor.id)
  }
>
  Book Appointment
</button>
        </div>
      ))}
    </div>
  );
}

export default Doctors;