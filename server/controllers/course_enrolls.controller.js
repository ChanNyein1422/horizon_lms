const CourseEnrollModel = require("../models/course_enrolls.model");
const Joi = require("joi");

async function enrollCourse(req, res) {
  const schema = Joi.object({
    student: Joi.string().required(),
    course: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const reqBody = req.body;
  try {
    const newCourse = new CourseEnrollModel(reqBody);
    await newCourse.save();
    return res.status(201).send({
      message: "Course Enroll Successful",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getEnrolledCourses(req, res) {
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
      { student: { $regex: value.search } },
      { course: { $regex: value.search } },
    ];
  }
  try {
    const data = await CourseEnrollModel.find(filter)
      .skip(value.skip)
      .limit(value.limit);
    const count = await CourseEnrollModel.find({}).countDocuments();
    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function leaveCourse(req, res) {
  try {
    await CourseEnrollModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  enrollCourse,
  getEnrolledCourses,
  leaveCourse,
};
