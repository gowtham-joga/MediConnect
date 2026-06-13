const db = require("../config/firebase");

const uploadMedicalRecord = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded" });
    }

    // Get logged in patient's id from JWT middleware
    const patientId = req.user.id;

    const newRecord = {
      patientId,
      title,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      uploadedAt: new Date(),
    };

    const docRef = await db
      .collection("medicalRecords")
      .add(newRecord);

    res.status(201).json({
      message: "Medical record uploaded successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server Error" });
  }
};
const getMyMedicalRecords = async (
  req,
  res
) => {
  try {
    const snapshot = await db
      .collection("medicalRecords")
      .where(
        "patientId",
        "==",
        req.user.id
      )
      .get();

    const records = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    res.json(records);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({
        message: "Server Error",
      });
  }
};
module.exports = {
  uploadMedicalRecord,
  getMyMedicalRecords,
};