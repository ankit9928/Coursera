import express from "express";
const app = express();

import { User, Course } from "../db/db";
import { authenticatejwt, generatejwt } from "../middleware/auth";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(404).json({ message: "user alredy exist" });
  } else {
    const newuser = new User({ username, password });
    await newuser.save();
    const token = generatejwt(newuser);
    res.json({ message: "user created succesfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });

  if (user) {
    token = generatejwt(user);
    res.json({ message: "loged in succesfully", token });
  } else {
    res.status(403).json({ message: "wrong credentilas" });
  }
});

router.get("/courses", authenticatejwt, async (req, res) => {
  const courses = await Course.find({});
  // console.log(courses);      its an arrya of objects
  res.json({ courses });
});

router.post("/courses/:courseid", authenticatejwt, async (req, res) => {
  const course = await Course.findById(req.params.courseid);
  if (course) {
    const user = await User.findOne({ username: req.user.username });

    if (user) {
      user.purchasedCourses.push(course); // even though we pushed the hole big course here but only the id of course is stored there
      await user.save();
      res.json({ message: "course purchased succesfully" });
    } else {
      res.status(403).json({ message: "user not found" });
    }
  } else {
    res.status(404).json({ message: "course not found" });
  }
});

router.get("/purchasedcourses", authenticatejwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "user not found" });
  }
});

export default router;
