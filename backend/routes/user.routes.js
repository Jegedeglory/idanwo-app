const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isRegistered, checkUser } = require("../middleware/auth.middleware");

// Register a new user
router.post("/register", isRegistered, async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.create({ username });
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login (verify user exists)
router.post("/login", checkUser, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Login successful',
      user: req.user
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
        .select('username score')
        .sort({ score: -1 })
        .limit(10);
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

// Update user score
router.put("/score", checkUser, async (req, res) => {
  try {
    const { username, score } = req.body;
    const updatedUser = await User.findOneAndUpdate(
        { username },
        { score },
        { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ error: "Error updating score" });
  }
});

module.exports = router;