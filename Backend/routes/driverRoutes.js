const express = require("express");
const multer = require("multer");
const router = express.Router();
const driverController = require("../controllers/driverController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/register", driverController.registerDriver);

router.post(
  "/upload/:id",
  upload.fields([
    { name: "cnicFront", maxCount: 1 },
    { name: "cnicBack", maxCount: 1 },
    { name: "selfieWithId", maxCount: 1 },
    { name: "licenseFront", maxCount: 1 },
    { name: "licenseBack", maxCount: 1 },
  ]),
  driverController.updateImages
);

router.put("/vehicle/:id", driverController.updateVehicleInfo);

module.exports = router;
