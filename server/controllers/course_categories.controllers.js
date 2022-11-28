const CourseCategoryModel = require("../models/course_categories.model");
const Joi = require("joi");
const CoursesModel = require("../models/courses.model");

async function createCourseCategory(req, res) {
  const schema = Joi.object({
    category: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const category = req.body.category;
  try {
    const newCategory = new CourseCategoryModel({ category });
    await newCategory.save();
    return res.status(201).send({
      message: "Category Created Successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getAllCategories(req, res) {
  try {
    const { limit, skip } = req.query;
    let data = await CourseCategoryModel.find({})
      .skip(skip ? parseInt(skip) : 0)
      .limit(limit ? parseInt(limit) : 10)
      .lean();

    data = data.map(async (cat) => {
      const courseCount = await CoursesModel.find({
        category: cat._id,
      }).countDocuments();
      return { ...cat, courseCount };
    });

    data = await Promise.all(data);
    const count = await CourseCategoryModel.find({}).countDocuments();
    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function deleteCourseCategory(req, res) {
  try {
    await CourseCategoryModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
}

async function getOneCategory(req, res) {
  try {
    const course = await CourseCategoryModel.findOne({ _id: req.params.id });
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function updateCourseCategory(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updatedCategory = await CourseCategoryModel.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    return res.status(200).send(updatedCategory);
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
}

module.exports = {
  createCourseCategory,
  getAllCategories,
  deleteCourseCategory,
  updateCourseCategory,
  getOneCategory,
};
