const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getUpcomingAppointments,
  getAvailableSlots,
} = require("../controllers/appointmentController");

router.post("/book", protect, bookAppointment);
router.get("/my-appointments", protect, getMyAppointments);
router.get(
  "/doctor-appointments",
  protect,
  getDoctorAppointments
);
router.put(
  "/update-status",
  protect,
  authorizeRoles("doctor"),
  updateAppointmentStatus
);
router.delete(
  "/cancel",
  protect,
  cancelAppointment
);
router.get(
  "/upcoming",
  protect,
  getUpcomingAppointments
);
router.get(
  "/available-slots",
  getAvailableSlots
);
module.exports = router;