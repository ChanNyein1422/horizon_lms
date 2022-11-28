const MaterialModel = require("../models/material.model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

async function createMaterial(req, res) {
    // email, password
    // test for valid string, not empty, correct name
    const schema = Joi.object({
        material_title: Joi.string().required(),
        material_description: Joi.string().optional(),
        course: Joi.objectId().required(),
        file: Joi.string(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({
            message: result.error.details[0].message,
        });
    }
    const reqBody = req.body;
    try {
        const newMaterial = new MaterialModel(reqBody);

        await newMaterial.save();
        return res.status(201).send({
            message: "Material Uploaded Successful",
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

async function getMaterials(req, res) {
    const { course, limit, skip } = req.query;
    const schema = Joi.object({
        course: Joi.objectId().required(),
        limit: Joi.number().integer().default(10),
        skip: Joi.number().integer().default(0),
    });
    const result = schema.validate(req.query);
    if (result.error) {
        return res.status(400).send({
            message: result.error.details[0].message,
        });
    }
    try {
        const data = await MaterialModel.find({ course })
            .skip(skip ? parseInt(skip) : 0)
            .limit(limit ? parseInt(limit) : 10);
        const count = await MaterialModel.find({}).countDocuments();
        return res.status(200).send({ data, count });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

async function deleteMaterial(req, res) {
    try {
        await MaterialModel.deleteOne({ _id: req.params.id });
        return res.status(204).send();
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

async function updateMaterial(req, res) {
    try {
        const data = req.body;
        const id = req.params.id;
        const updateMaterial = await MaterialModel.findOneAndUpdate(
            { _id: id },
            data,
            {
                new: true,
            }
        );
        return res.status(200).send(updateMaterial);
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

async function findOneMaterial(req, res) {
    try {
        const course = await MaterialModel.findOne({ _id: req.params.id });
        return res.status(200).send(course);
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

module.exports = {
    createMaterial,
    getMaterials,
    deleteMaterial,
    findOneMaterial,
    updateMaterial,
};
