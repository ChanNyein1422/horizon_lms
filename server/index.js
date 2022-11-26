const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/users.model");
const { authenticate, authorizeAdmin } = require("./middlewares.js");
const {
  registerUser,
  loginUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} = require("./controllers/users.controller");
const {
  createCourseCategory,
  getAllCategories,
  deleteCourseCategory,
  updateCourseCategory,
} = require("./controllers/course_categories.controllers");
const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://admin:neokim@cluster0.y5mxg0a.mongodb.net/horizondb?retryWrites=true&w=majority"
);
mongoose.connection.once("error", (err) => {
  console.log(err);
});

app.get("/api/users/:id", authenticate, getOneUser);
app.get("/api/users", authenticate, getAllUsers);
app.patch("/api/users/:id", authenticate, updateUser);
app.delete("/api/users/:id", authenticate, authorizeAdmin, deleteUser);
app.post("/api/users/login", loginUser);
app.post("/api/users", registerUser);

app.post("/api/course_categories", authenticate, createCourseCategory);
app.get("/api/course_categories", authenticate, getAllCategories);
app.delete("/api/course_categories/:id", authenticate, deleteCourseCategory);
app.patch("/api/course_categories/:id", authenticate, updateCourseCategory);

app.use((req, res, next, err) => {
  return res.status(500).send({ code: 500, message: "Internal Server Error" });
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
