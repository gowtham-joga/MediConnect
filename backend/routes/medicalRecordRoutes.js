const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const upload = require("../config/multer");

const {
  uploadMedicalRecord,
  getMyMedicalRecords,
} = require("../controllers/medicalRecordController");

router.post(
  "/upload",
  protect,
  authorizeRoles("patient"),
  upload.single("report"),
  uploadMedicalRecord
);
router.get(
  "/my-records",
  protect,
  authorizeRoles("patient"),
  getMyMedicalRecords
);
module.exports = router;