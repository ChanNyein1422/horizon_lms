const AssignmentUploadModel = require("../models/assignment_uploads.model");
const AssignmentModel = require("../models/assignments.model");
const moment = require("moment");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

async function submitAssignment(req, res) {
  // email, password
  // test for valid string, not empty, correct name
  const schema = Joi.object({
    assignment_submit: Joi.string().required(),
    assignment: Joi.objectId().required(),
    student: Joi.objectId().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  try {
    const assignment = AssignmentModel.findById(result.value.assignment);
    if (moment(assignment.deadline).utc().isBefore(moment().utc())) {
      return res.status(400).send({
        message: "Dead Line Exceeded",
      });
    }

    const newAssignmentUpload = new AssignmentUploadModel(result.value);
    await newAssignmentUpload.save();
    return res.status(201).send({
      message: "Assignment Submitted",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getAssignmentUpload(req, res) {
  const { sort, filter, limit, skip } = req.query;
  try {
    const data = await AssignmentUploadModel.find({})
      .populate("student")
      .populate("assignment")
      .skip(skip ? parseInt(skip) : 0)
      .limit(limit ? parseInt(limit) : 10);
    const count = await AssignmentUploadModel.find({}).countDocuments();
    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function deleteAssignmentUpload(req, res) {
  try {
    await AssignmentUploadModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function updateAssignmentUpload(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updatedAssignmentUpload =
      await AssignmentUploadModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
    return res.status(200).send(updatedAssignmentUpload);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function findOneAssignmentUpload(req, res) {
  try {
    const course = await AssignmentUploadModel.findOne({ _id: req.params.id });
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  submitAssignment,
  deleteAssignmentUpload,
  getAssignmentUpload,
  findOneAssignmentUpload,
  updateAssignmentUpload,
};
