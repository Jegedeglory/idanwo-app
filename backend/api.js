const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user.routes");

const api = express.Router();
api.use("/auth", authRoutes);
api.use("/users", userRoutes);

module.exports = api;