const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.config');
const userRoutes = require('./routes/user.routes');
const quizRoutes = require('./routes/quiz');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Quiz App API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();


//
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const api = require("./api");
// const bodyParser = require("body-parser");
// const http = require("http");
// const database = require("./config/database");
// const errorMiddleware = require("./middleware/error.middleware");
//
// dotenv.config();
//
// const app = express();
// const PORT = process.env.PORT || 3001;
//
// // CORS configuration
// app.use(
//     cors({
//       origin: ["http://localhost:3000", "exp://192.168.175.27:8081"],
//       credentials: true,
//     })
// );
//
// app.use(bodyParser.json());
// app.use(
//     express.json({
//       verify: (req, res, buf) => {
//         req.rawBody = buf.toString();
//       },
//     })
// );
// app.set("trust proxy", 1);
//
// // Initialize database connection
// async function initializeApp() {
//   try {
//     await database.connect();
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Failed to connect to database:", error);
//     process.exit(1);
//   }
// }
//
// // API routes
// app.use("/api", api);
//
// // Home route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the Quiz App backend" });
// });
//
// // Routes
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/quizzes", require("./routes/quiz.routes"));
//
// // Error handling middleware
// app.use(errorMiddleware.notFound);
// app.use(errorMiddleware.databaseError);
// app.use(errorMiddleware.validationError);
// app.use(errorMiddleware.errorHandler);
//
// // Start server
// initializeApp().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });
//
// // Handle graceful shutdown
// process.on("SIGTERM", async () => {
//   console.log("SIGTERM received. Shutting down gracefully...");
//   await database.disconnect();
//   process.exit(0);
// });
