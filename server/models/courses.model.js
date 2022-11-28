const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_code: { type: String, required: true, unique: true },
  course_name: { type: String, required: true },
  end_date: { type: String, required: true },
  course_description: { type: String },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CourseCategory",
  },
});
module.exports = mongoose.model("Course", courseSchema);
