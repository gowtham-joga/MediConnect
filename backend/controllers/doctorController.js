const db = require("../config/firebase");

const createDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      hospital,
      fees,
      availableDays,
      availableTimeSlots,
    } = req.body;

    const existingDoctor = await db
  .collection("doctors")
  .where("userId", "==", req.user.id)
  .get();

if (!existingDoctor.empty) {
  return res.status(400).json({
    message: "Doctor profile already exists",
  });
}
    await db.collection("doctors").add({
      userId: req.user.id,
      specialization,
      experience,
      hospital,
      fees,
      availableDays,
      availableTimeSlots,
      createdAt: new Date(),
    });

    res.json({
      message: "Doctor Profile Created",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};


const getAllDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;
let query = db.collection("doctors");

if (req.query.specialization) {
  query = query.where(
    "specialization",
    "==",
    req.query.specialization
  );
}

if (req.query.hospital) {
  query = query.where(
    "hospital",
    "==",
    req.query.hospital
  );
}

const snapshot = await query.get();
    const allDoctors = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    const paginatedDoctors = allDoctors.slice(
      startIndex,
      endIndex
    );

    res.json({
      totalDoctors: allDoctors.length,
      currentPage: page,
      totalPages: Math.ceil(
        allDoctors.length / limit
      ),
      doctors: paginatedDoctors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const updateDoctorProfile = async (req, res) => {
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

    await db
      .collection("doctors")
      .doc(doctorDoc.id)
      .update(req.body);

    res.json({
      message: "Doctor Profile Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};

const deleteDoctorProfile = async (req, res) => {
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

if (!appointmentsSnapshot.empty) {
  return res.status(400).json({
    message:
      "Cannot delete profile with existing appointments",
  });
}

    await db
  .collection("doctors")
  .doc(doctorDoc.id)
  .update({
    isDeleted: true,
  });

    res.json({
      message: "Doctor Profile Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Server Error");
  }
};
module.exports = {
  createDoctorProfile,
  getAllDoctors,
  updateDoctorProfile,
  deleteDoctorProfile,
};