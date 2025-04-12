// "use strict";
// // Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = require("express");
// const auth_controllers_1 = require("../controllers/authController");
// const auth = (0, express_1.Router)();
// auth.post("/", auth_controllers_1.enterGame);
// exports.default = auth;



const express = require("express");
const { enterGame } = require("../controllers/authController");

const auth = express.Router();
auth.post("/", enterGame);

module.exports = auth; 