const UserModel = require("../models/users.model");

async function registerUser(req, res) {
  // username, password
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
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }
  if (user.password !== password) {
    return res.status(400).send({ error: "Invalid Credential" });
  }
  const basicString = `${email}:${password}`;
  const basicToken = Buffer.from(basicString).toString("base64"); //changed to token
  return res.status(200).send({ token: basicToken });
}

async function deleteUser(req, res) {
  await UserModel.deleteOne({ _id: req.params.id });
  return res.status(204).send();
}

async function updateUser(req, res) {
  const data = req.body;
  const id = req.params.id;
  const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res.status(200).send(updatedUser);
}
async function getAllUsers(req, res) {
  const { limit, skip, user_type } = req.query;

  const data = await UserModel.find({})
    .skip(skip ? parseInt(skip) : 0)
    .limit(limit ? parseInt(limit) : 10);
  const count = await UserModel.find({}).countDocuments();
  return res.status(200).send({ data, count });
}

async function getOneUser(req, res) {
  const user = await UserModel.findOne({ _id: req.params.id });
  return res.status(200).send(user);
}
module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getOneUser,
  getAllUsers,
};
