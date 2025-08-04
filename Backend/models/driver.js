const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  email: String,
  cnicFront: String,
  cnicBack: String,
  selfieWithId: String,
  licenseFront: String,
  licenseBack: String,
  vehicleType: String,
  model: String,
  color: String,
  registrationNo: String,
  plateNo: String,
});

module.exports = mongoose.model("Driver", driverSchema);