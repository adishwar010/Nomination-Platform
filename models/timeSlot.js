const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  },
  totalAttempted: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("timeSlot", timeSlotSchema);
