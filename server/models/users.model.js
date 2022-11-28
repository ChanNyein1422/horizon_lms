const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  branch: {
    type: String,
    required: true,
    enum: ["YANGON-1", "YANGON-2", "MANDALAY", "NAYPYIDAW"],
  },
  user_type: {
    type: String,
    required: true,
    enum: ["ADMIN", "STUDENT", "LECTURER"],
    default: "STUDENT",
  },
});
module.exports = mongoose.model("User", userSchema);
