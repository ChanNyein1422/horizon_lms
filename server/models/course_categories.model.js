const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("CourseCategory", schema, "course_categories");
