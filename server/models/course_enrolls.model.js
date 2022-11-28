const mongoose = require("mongoose");

const enrolSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "CourseEnrollment",
  enrolSchema,
  "course_enrollments"
);
