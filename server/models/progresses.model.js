const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Material",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Progress", progressSchema);
