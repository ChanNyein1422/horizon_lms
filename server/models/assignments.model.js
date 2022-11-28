const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignment_name: { type: String, required: true, unique: true },
  assignment_description: { type: String },
  deadline: { type: Date, required: true },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
});
module.exports = mongoose.model("Assignment", assignmentSchema);
