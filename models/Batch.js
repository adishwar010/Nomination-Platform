const mongoose = require('mongoose');

const BatchSchema = mongoose.Schema({
  totalNumberOfStudents: {
    type: Number,
    default: 0,
  },
  maxNumberOfStudent: {
    type: Number,
    default: 250,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  subtopic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtopic' }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('batch', BatchSchema);
