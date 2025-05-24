"use strict";
const { createRowSchema } = require("../config");

const QuizStructure = {
  space: "Quiz",
  description: "A Record Space for quizzes",
  structure: {
    title: {
      description: "Title of the quiz",
      required: true,
      type: String,
    },
    description: {
      description: "Description of the quiz",
      required: true,
      type: String,
    },
    questions: {
      description: "Array of quiz questions",
      required: true,
      type: Array,
    },
    timePerQuestion: {
      description: "Time allowed per question in seconds",
      required: true,
      type: Number,
      default: 30,
    },
    createdBy: {
      description: "Username of quiz creator",
      required: true,
      type: String,
    },
    createdAt: {
      description: "Creation timestamp",
      required: true,
      type: Date,
    },
    updatedAt: {
      description: "Last update timestamp",
      required: true,
      type: Date,
    },
  },
};

exports.QuizModel = createRowSchema(QuizStructure);
