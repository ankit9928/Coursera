const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const secret = "acbhsabchbsc";
app.use(cors());
app.use(express.json());

// define the schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

mongoose.connect(
  "mongodb+srv://ankit9928meena:mubjih-4qaxnI-xirdud@ankit.hgyhudj.mongodb.net/ankit"
);

const generatejwt = (user) => {
  const paylode = { username: user.username };
  return jwt.sign(paylode, secret, { expiresIn: "1h" });
};

const authenticatejwt = (req, res, next) => {
  const authheader = req.headers.authorization;

  if (authheader) {
    const token = authheader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = user; // we here know that we have passed paylode of{usernmae: }
        // when we generaetd the token
        next();
      }
    });
  } else {
    res.status(403).json({ message: "invalid token or no token" });
  }
};

// me route

app.get("/admin/me", authenticatejwt, (req, res) => {
  res.json({ username: req.user.username });
});

// admin route

app.post("/admin/signup", async (req, res) => {
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

app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;
  const admin = Admin.findOne({ username, password });
  console.log(admin); // for the bug remove it after the use

  if (admin) {
    const token = generatejwt(admin);
    res.json({ message: "loged in succes", token });
  } else {
    res.status(403).json({ message: "auth failed" });
  }
});

app.post("/admin/courses", authenticatejwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseid", authenticatejwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseid, req.body);

  if (course) {
    res.json({ message: "Course updated succesfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});

app.get("/admin/courses", authenticatejwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

// users  routesss

app.post("/users/signup", async (req, res) => {
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

app.post("/users/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });

  if (user) {
    token = generatejwt(user);
    res.json({ message: "loged in succesfully", token });
  } else {
    res.status(403).json({ message: "wrong credentilas" });
  }
});

app.get("/users/courses", authenticatejwt, async (req, res) => {
  const courses = await Course.find({});
  // console.log(courses);      its an arrya of objects
  res.json({ courses });
});

app.post("/users/courses/:courseid", authenticatejwt, async (req, res) => {
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

app.get("/users/purchasedcourses", authenticatejwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "user not found" });
  }
});

app.listen(3000, () => {
  console.log("listing on port 3000");
});
