const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const api = require("./api");
const bodyParser = require("body-parser");
const http = require("http");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "exp://192.168.175.27:8081"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }));
app.set("trust proxy", 1);

// API routes
app.use("/api", api);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Soole backend" });
});

// app.all("*", errorControllers.notFound);

// app.use(errorControllers.foundError);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});