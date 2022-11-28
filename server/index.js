const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: "./files/",
    filename: function (req, file, cb) {
        const fileName = Date.now() + "_" + file.originalname;
        req.body.file = fileName;
        cb(null, fileName);
    },
});
const upload = multer({ storage });

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
    getOneCategory,
} = require("./controllers/course_categories.controllers");

const {
    createCourse,
    getCourses,
    deleteCourse,
    updateCourse,
    findOneCourse,
} = require("./controllers/courses.controllers");

const {
    createMaterial,
    getMaterials,
    deleteMaterial,
    findOneMaterial,
    updateMaterial,
} = require("./controllers/materials.controller");

const {
    createAssignment,
    deleteAssignment,
    getAssignment,
    findOneAssignment,
    updateAssignment,
} = require("./controllers/assignments.controller");
const {
    submitAssignment,
    deleteAssignmentUpload,
    getAssignmentUpload,
    findOneAssignmentUpload,
    updateAssignmentUpload,
} = require("./controllers/assignment_uploads.controller");
const {
    markAsRead,
    checkProgress,
} = require("./controllers/progresses.controller");

const {
    enrollCourse,
    getEnrolledCourses,
    leaveCourse,
} = require("./controllers/course_enrolls.controller");

const app = express();

mongoose.connect(
    "mongodb+srv://admin:neokim@cluster0.y5mxg0a.mongodb.net/horizondb?retryWrites=true&w=majority"
);
mongoose.connection.once("error", (err) => {
    console.log(err);
});

app.use(cors());
app.use("/files", express.static(path.join(__dirname, "/files")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.single("file"));

// Users
app.get("/api/users/:id", authenticate, getOneUser);
app.get("/api/users", authenticate, getAllUsers);
app.patch("/api/users/:id", authenticate, updateUser);
app.delete("/api/users/:id", authenticate, authorizeAdmin, deleteUser);

app.post("/api/users/login", loginUser);
app.post("/api/users", registerUser);

//Course Category
app.post("/api/course_categories", authenticate, createCourseCategory);
app.get("/api/course_categories", authenticate, getAllCategories);
app.patch("/api/course_categories/:id", authenticate, getOneCategory);
app.delete("/api/course_categories/:id", authenticate, deleteCourseCategory);
app.get("/api/course_categories/:id", authenticate, updateCourseCategory);

//Courses
app.get("/api/courses/:id", authenticate, findOneCourse);
app.get("/api/courses", authenticate, getCourses);
app.patch("/api/courses/:id", authenticate, updateCourse);
app.delete("/api/courses/:id", authenticate, authorizeAdmin, deleteCourse);
app.post("/api/courses/", authenticate, createCourse);

//Materials
app.get("/api/materials/:id", authenticate, findOneMaterial);
app.get("/api/materials", authenticate, getMaterials);
app.patch("/api/materials/:id", authenticate, updateMaterial);
app.delete("/api/materials/:id", authenticate, authorizeAdmin, deleteMaterial);
app.post("/api/materials/", authenticate, createMaterial);

//Assignment
app.get("/api/assignments/:id", authenticate, findOneAssignment);
app.get("/api/assignments", authenticate, getAssignment);
app.patch("/api/assignments/:id", authenticate, updateAssignment);
app.delete("/api/assignments/:id", authenticate, deleteAssignment);
app.post("/api/assignments", authenticate, createAssignment);

//Assignment Upload
app.get("/api/assignments_uploads/:id", authenticate, findOneAssignmentUpload);
app.get("/api/assignments_uploads", authenticate, getAssignmentUpload);
app.patch("/api/assignments_uploads/:id", authenticate, updateAssignmentUpload);
app.delete(
    "/api/assignments_uploads/:id",
    authenticate,
    deleteAssignmentUpload
);
app.post("/api/assignments_uploads", authenticate, submitAssignment);

//Progress
app.get("/api/progresses", authenticate, checkProgress);
app.post("/api/progresses", authenticate, markAsRead);

//Course Enroll
app.post("/api/enroll_courses", authenticate, enrollCourse);
app.get("/api/enroll_courses", authenticate, getEnrolledCourses);
app.delete("/api/enroll_courses/:id", authenticate, leaveCourse);

app.use((req, res, next, err) => {
    return res
        .status(500)
        .send({ code: 500, message: "Internal Server Error" });
});

app.listen(5001, () => {
    console.log("Server started on port 5001");
});
