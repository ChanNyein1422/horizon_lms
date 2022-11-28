const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  material_title: { type: String, required: true, unique: true },
  material_description: { type: String },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  file_type: { type: String },
  file_path: { type: String },
});
module.exports = mongoose.model("Material", materialSchema);
