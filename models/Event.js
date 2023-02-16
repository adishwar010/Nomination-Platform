const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['test', 'assignment', 'liveClass', 'readingMaterial'],
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test',
    required: false,
  },
  liveClassLink: {
    type: String,
    required: false,
  },
  liveClassDescription: {
    type: String,
    required: false,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'assignment',
    required: false,
  },
  readingMaterialLink: {
    type: String,
    required: false,
  },
  readingMaterialDescription: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('event', EventSchema);
