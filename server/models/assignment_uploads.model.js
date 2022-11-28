const mongoose = require("mongoose");

const assignmentUploadSchema = new mongoose.Schema(
  {
    assignment_submit: { type: String, required: true },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Assignment",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AssignmentUpload",
  assignmentUploadSchema,
  "assignment_uploads"
);
