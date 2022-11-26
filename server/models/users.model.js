const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: {
    type: String,
    required: true,
    enum: ["ADMIN", "STUDENT", "TEACHER"],
    default: "STUDENT",
  },
});
module.exports = mongoose.model("User", userSchema);
