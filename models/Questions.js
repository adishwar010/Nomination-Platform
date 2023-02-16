const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  A: {
    text: String,
    imageUrl: String,
  },
  B: {
    text: String,
    imageUrl: String,
  },
  C: {
    text: String,
    imageUrl: String,
  },
  D: {
    text: String,
    imageUrl: String,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  questionImage: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: true,
  },
  subtopic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("questions", QuestionSchema);
