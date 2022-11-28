const ProgressModel = require("../models/progresses.model");
const Joi = require("joi");
const MaterialModel = require("../models/material.model");
Joi.objectId = require("joi-objectid")(Joi);

async function markAsRead(req, res) {
  // email, password
  // test for valid string, not empty, correct name
  const schema = Joi.object({
    course: Joi.objectId().required(),
    student: Joi.objectId().required(),
    material: Joi.objectId().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const reqBody = req.body;
  try {
    const newProgress = new ProgressModel(reqBody);

    await newProgress.save();
    return res.status(201).send({
      message: "Progress Counted",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function checkProgress(req, res) {
  const schema = Joi.object({
    course: Joi.objectId().required(),
    student: Joi.objectId().required(),
  });
  const result = schema.validate(req.query);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  try {
    const count = await ProgressModel.find(req.query).countDocuments();
    const total = await MaterialModel.find({
      course: req.query.course,
    }).countDocuments();
    return res.status(200).send({ count, total });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  markAsRead,
  checkProgress,
};
