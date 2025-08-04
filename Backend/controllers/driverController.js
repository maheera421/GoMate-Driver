const Driver = require("../models/driver");

exports.registerDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json({ success: true, id: driver._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateImages = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};

    if (req.files) {
      if (req.files["cnicFront"]) update.cnicFront = req.files["cnicFront"][0].path;
      if (req.files["cnicBack"]) update.cnicBack = req.files["cnicBack"][0].path;
      if (req.files["selfieWithId"]) update.selfieWithId = req.files["selfieWithId"][0].path;
      if (req.files["licenseFront"]) update.licenseFront = req.files["licenseFront"][0].path;
      if (req.files["licenseBack"]) update.licenseBack = req.files["licenseBack"][0].path;
    }

    await Driver.findByIdAndUpdate(id, update);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateVehicleInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await Driver.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};