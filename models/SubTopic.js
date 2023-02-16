const mongoose = require("mongoose");

const SubTopicSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  program: {
    type: String,
    required: false,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
});

module.exports = mongoose.model("subtopic", SubTopicSchema);
