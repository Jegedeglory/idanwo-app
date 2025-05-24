const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Sample quiz data
const quizData = {
  title: "Basic Math Quiz",
  questions: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "What is 3 x 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "9"
    }
  ]
};

// Route to create a quiz
router.post('/create-sample', async (req, res) => {
  try {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;