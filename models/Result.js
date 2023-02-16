const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "paper",
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  qualified: {
    type: Boolean,
    required: true,
    default: false,
  },
  marks: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  attempted: {
    type: Number,
    required: true,
  },
  incorrect: {
    type: Number,
    required: true,
  },
  notAttempted: {
    type: Number,
    required: true,
  },
  correct: {
    type: Number,
    required: true,
  },
  totalQuestion: {
    type: Number,
    required: true,
  },
  testName: {
    type: String,
    required: true,
    default: "adsat",
  },
  timeTaken: {
    type: Number,
    required: true,
    default: 0,
  },
  categoryWise: [
    {
      categoryName: String,
      questionAttempted: Number,
      totalQuestion: Number,
      correct: Number,
    },
  ],
});

module.exports = mongoose.model("results", ResultSchema);
