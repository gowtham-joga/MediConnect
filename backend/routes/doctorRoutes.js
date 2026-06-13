const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createDoctorProfile,
  getAllDoctors,
  getMyDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
} = require("../controllers/doctorController");

router.post(
  "/create-profile",
  protect,
  authorizeRoles("doctor"),
  createDoctorProfile
);
router.get("/", getAllDoctors);
router.get(
  "/my-profile",
  protect,
  authorizeRoles("doctor"),
  getMyDoctorProfile
);
router.put(
  "/update-profile",
  protect,
  authorizeRoles("doctor"),
  updateDoctorProfile
);
router.delete(
  "/delete-profile",
  protect,
  authorizeRoles("doctor"),
  deleteDoctorProfile
);
module.exports = router;