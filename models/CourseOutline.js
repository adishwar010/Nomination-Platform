const mongoose = require('mongoose');

const OutlineSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  subtopic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtopic' }],
});

module.exports = mongoose.model('outline', OutlineSchema);
