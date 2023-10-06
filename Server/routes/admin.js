const express = require("express");
const app = express();

const { Admin, Course } = require("../db/db");
const jwt = require("jsonwebtoken");
const { authenticatejwt, generatejwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticatejwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(403).json({ message: "i am already here" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generatejwt(newAdmin);
    res.json({ message: "Admin creates succesfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generatejwt(admin);
    res.json({ message: "loged in succes", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticatejwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "course created successfully", courseId: course.id });
});

router.put("/courses/:courseid", authenticatejwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseid, req.body);

  if (course) {
    res.json({ message: "Course updated succesfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});

router.get("/courses", authenticatejwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/course/:courseId" , authenticatejwt, async (req, res) => {
  
  const  courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({course});

})

module.exports = router;
