const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminLevel: {
    type: Number,
    required: true,
    default: 0,
  },
  dept:{
    type: String,
    required: true
  }
});

AdminSchema.pre("save", async function (next) {
  let user = this;
  if (user.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.log(err);
    }
  }
});

AdminSchema.methods.comparePassword = async function (password, done) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    done(null, isMatch);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
};

module.exports = mongoose.model("admin", AdminSchema);
