const CourseModel = require("../models/courses.model");
const Joi = require("joi");

async function createCourse(req, res) {
  // email, password
  // test for valid string, not empty, correct name
  const schema = Joi.object({
    course_code: Joi.string().required(),
    course_name: Joi.string().required(),
    end_date: Joi.string().required(),
    course_description: Joi.string().optional(),
    lecturer: Joi.string().required(),
    category: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const reqBody = req.body;

  try {
    const newCourse = new CourseModel(reqBody);
    await newCourse.save();
    return res.status(201).send({
      message: "Course Created Successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getCourses(req, res) {
  const schema = Joi.object({
    limit: Joi.number().integer().default(10),
    skip: Joi.number().integer().default(0),
    search: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  let filter = {};
  if (value.search) {
    filter.$or = [
      { course_name: { $regex: value.search } },
      { course_code: { $regex: value.search } },
    ];
  }
  try {
    const data = await CourseModel.find(filter)
      .skip(value.skip)
      .limit(value.limit)
      .populate("lecturer");

    const count = await CourseModel.find(filter).countDocuments();

    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function deleteCourse(req, res) {
  try {
    await CourseModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function updateCourse(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updateCourse = await CourseModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.status(200).send(updateCourse);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function findOneCourse(req, res) {
  try {
    const course = await CourseModel.findOne({ _id: req.params.id });
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  findOneCourse,
};
