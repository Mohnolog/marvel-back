require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRoutes = require("./routes/user");
const marvelRoutes = require("./routes/marvel");
const searchRoutes = require("./routes/search");
app.use(userRoutes);
app.use(marvelRoutes);
app.use(searchRoutes);

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur l'API Marvel");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started 🔥🔥🔥🔥🚀 🚀 🚀 ");
});
