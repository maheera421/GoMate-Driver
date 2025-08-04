// backend/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const licenseRoutes = require("./routes/license.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// Routes
app.use("/api/license", licenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
