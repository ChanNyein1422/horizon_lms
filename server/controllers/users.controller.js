const UserModel = require("../models/users.model");
const Joi = require("joi");

async function registerUser(req, res) {
  // email, password
  // test for valid string, not empty, correct name
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    date_of_birth: Joi.string().optional(),
    branch: Joi.string(),
    user_type: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.details[0].message,
    });
  }
  const reqBody = req.body;
  try {
    const newUser = new UserModel(reqBody);
    await newUser.save();
    return res.status(201).send({
      message: "Created Successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }
    if (user.password !== password) {
      return res.status(400).send({ error: "Invalid Credential" });
    }
    const basicString = `${email}:${password}`;
    const basicToken = Buffer.from(basicString).toString("base64"); //changed to token
    return res
      .status(200)
      .send({ token: basicToken, type: user.user_type, id: user._id });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    await UserModel.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getAllUsers(req, res) {
  const { limit, skip, user_type } = req.query;
  try {
    const data = await UserModel.find({})
      .skip(skip ? parseInt(skip) : 0)
      .limit(limit ? parseInt(limit) : 10);
    const count = await UserModel.find({}).countDocuments();
    return res.status(200).send({ data, count });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

async function getOneUser(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getOneUser,
  getAllUsers,
};
