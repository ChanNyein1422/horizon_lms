const AssignmentModel = require("../models/assignments.model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

async function createAssignment(req, res) {
  // email, password
  // test for valid string, not empty, correct name
  const schema = Joi.object({
    assignment_name: Joi.string().required(),
    assignment_description: Joi.string().optional(),
    deadline: Joi.date().iso().required(),
    lecturer: Joi.objectId().required(),
    course: Joi.objectId().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const reqBody = req.body;
  try {
    const newAssignment = new AssignmentModel(reqBody);

    await newAssignment.save();
    return res.status(201).send({
      message: "Assignment Created Successful",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getAssignment(req, res) {
  const { sort, filter, limit, skip } = req.query;
  try {
    const data = await AssignmentModel.find({})
      .skip(skip ? parseInt(skip) : 0)
      .limit(limit ? parseInt(limit) : 10)
      .populate();
    const count = await AssignmentModel.find({}).countDocuments();
    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function deleteAssignment(req, res) {
  try {
    await AssignmentModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function updateAssignment(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updatedAssignment = await AssignmentModel.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    return res.status(200).send(updatedAssignment);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function findOneAssignment(req, res) {
  try {
    const course = await AssignmentModel.findOne({ _id: req.params.id });
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  createAssignment,
  deleteAssignment,
  getAssignment,
  findOneAssignment,
  updateAssignment,
};
