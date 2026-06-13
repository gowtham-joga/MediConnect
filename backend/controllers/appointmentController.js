const db = require("../config/firebase");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, } = req.body;

    const selectedDate = new Date(
  appointmentDate
);

selectedDate.setHours(
  0,
  0,
  0,
  0
);

const today = new Date();

today.setHours(
  0,
  0,
  0,
  0
);

if (selectedDate < today) {
  return res.status(400).json({
    message:
      "Cannot book appointment for past dates",
  });
}
    const doctorDoc = await db
  .collection("doctors")
  .doc(doctorId)
  .get();

if (!doctorDoc.exists) {
  return res.status(404).json({
    message: "Doctor not found",
  });
}

const doctor = doctorDoc.data();

const appointmentDay = new Date(appointmentDate).toLocaleDateString(
  "en-US",
  {
    weekday: "long",
  }
);

if (!doctor.availableDays.includes(appointmentDay)) {
  return res.status(400).json({
    message: "Doctor not available on this day",
  });
}
if (
  !doctor.availableTimeSlots ||
  !doctor.availableTimeSlots.includes(
    appointmentTime
  )
) {
  return res.status(400).json({
    message: "Selected time slot not available",
  });
}
    const existingAppointment = await db
  .collection("appointments")
  .where("doctorId", "==", doctorId)
  .where("appointmentDate", "==", appointmentDate)
  .where("appointmentTime", "==", appointmentTime)
  .get();

if (!existingAppointment.empty) {
  return res.status(400).json({
    message: "Doctor already booked for this date",
  });
}

    await db.collection("appointments").add({
      patientId: req.user.id,
      doctorId,
      appointmentDate,
      appointmentTime,
      status: "pending",
      createdAt: new Date(),
    });

    res.json({
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("patientId", "==", req.user.id)
      .get();

    const appointments = await Promise.all(
  snapshot.docs.map(async (doc) => {
    const appointment = doc.data();

    const doctorDoc = await db
      .collection("doctors")
      .doc(appointment.doctorId)
      .get();

    return {
      id: doc.id,
      ...appointment,
      doctor: doctorDoc.data(),
    };
  })
);

    res.json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorSnapshot = await db
      .collection("doctors")
      .where("userId", "==", req.user.id)
      .get();

    if (doctorSnapshot.empty) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const doctorDoc = doctorSnapshot.docs[0];

    const appointmentsSnapshot = await db
      .collection("appointments")
      .where("doctorId", "==", doctorDoc.id)
      .get();

    const appointments = await Promise.all(
        appointmentsSnapshot.docs.map(async (doc) => {
            const appointment = doc.data();

            const patientDoc = await db
            .collection("users")
            .doc(appointment.patientId)
            .get();

            return {
            id: doc.id,
            ...appointment,
           patient: {
  name: patientDoc.data().name,
  email: patientDoc.data().email,
},
            };
        })
        );

    res.json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointmentId = req.params.id;

    const validStatuses = [
  "pending",
  "approved",
  "completed",
  "rejected",
];

if (!validStatuses.includes(status)) {
  return res.status(400).json({
    message: "Invalid status value",
  });
}
    await db
      .collection("appointments")
      .doc(appointmentId)
      .update({
        status,
      });

    res.json({
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};


const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentDoc = await db
      .collection("appointments")
      .doc(appointmentId)
      .get();

    if (!appointmentDoc.exists) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const appointment = appointmentDoc.data();

    if (appointment.patientId !== req.user.id) {
      return res.status(403).json({
        message: "You can only cancel your own appointments",
      });
    }

    await db
      .collection("appointments")
      .doc(appointmentId)
      .delete();

    res.json({
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const getUpcomingAppointments = async (req, res) => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("patientId", "==", req.user.id)
      .get();

    const appointments = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (appointment) => appointment.status !== "completed"
      );

    res.json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.query;

    const doctorDoc = await db
      .collection("doctors")
      .doc(doctorId)
      .get();

    if (!doctorDoc.exists) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const doctor = doctorDoc.data();

    const appointmentsSnapshot = await db
      .collection("appointments")
      .where("doctorId", "==", doctorId)
      .where("appointmentDate", "==", appointmentDate)
      .get();

    const bookedSlots = appointmentsSnapshot.docs.map(
      (doc) => doc.data().appointmentTime
    );

    const availableSlots =
      doctor.availableTimeSlots.filter(
        (slot) => !bookedSlots.includes(slot)
      );

    res.json(availableSlots);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getUpcomingAppointments,
  getAvailableSlots,
};