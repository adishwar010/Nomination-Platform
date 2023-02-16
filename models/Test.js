const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
    unique: true,
  },
  durationOfTest: {
    type: Number,
    required: true,
    default: 10,
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  questionBank: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions",
    },
  ],
  marksPerQuestions: {
    type: Number,
    required: true,
    default: 4.0,
  },
  negativeMarksPerQuestion: {
    type: Number,
    required: true,
    default: 0.0,
  },
  testDifficultyLevel: {
    type: Number,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: false,
  },
  displayable: {
    type: Boolean,
    required: true,
    default: true,
  },
  password:{
    type : String,
  }
});

module.exports = mongoose.model("test", TestSchema);
