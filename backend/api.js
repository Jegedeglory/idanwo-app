// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// // Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = require("express");
// const auth_1 = __importDefault(require("./routes/auth"));

// const api = (0, express_1.Router)();
// api.use("/auth", auth_1.default);

// exports.default = api;

const express = require("express");
const authRoutes = require("./routes/auth");

const api = express.Router();
api.use("/auth", authRoutes);

module.exports = api;