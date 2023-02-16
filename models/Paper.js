const mongoose = require('mongoose');

const PaperSchema = mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      status: {
        type: String,
        required: false,
      },
      answer: {
        type: String,
        required: false,
      },
      correct: {
        type: Number,
        require: false,
      },
    },
  ],
  startedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: false,
  },
  marks: {
    type: Number,
    required: false,
  },
  attempted: {
    type: Number,
    required: false,
  },
  correct: {
    type: Number,
    required: false,
  },
  incorrect: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('paper', PaperSchema);
