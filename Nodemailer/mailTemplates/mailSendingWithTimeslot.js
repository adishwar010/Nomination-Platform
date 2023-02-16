const connectDb = require("../../config/db");
const User = require("../../models/User");
//connectDb();

let status;

async function getAllUserList() {
  try {
    const users = await User.find().select("email");
    console.log(users);
  } catch (err) {
    console.log(err);
    status = "User List fetch from database failed";
  }
}

setTimeout(getAllUserList, 2000);
