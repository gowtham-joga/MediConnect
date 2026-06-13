require("dotenv").config();
const path = require("path");
const express = require("express");
const aiRoutes = require("./routes/aiRoutes");
const db = require("./config/firebase");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authorizeRoles = require("./middleware/roleMiddleware");
const medicalRecordRoutes = require(
  "./routes/medicalRecordRoutes"
);
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/ai", aiRoutes);
app.use(
  "/api/medical-records",
  medicalRecordRoutes
);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.get("/", async (req, res) => {
  try {
    const testRef = db.collection("test").doc("connection");

    await testRef.set({
      message: "Firebase connected successfully",
    });

    res.send("Firestore Connected 🚀");
  } catch (error) {
    console.log(error);

    res.status(500).send("Error");
  }
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get(
  "/api/doctor",
  protect,
  authorizeRoles("doctor"),
  (req, res) => {
    res.json({
      message: "Welcome Doctor",
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});