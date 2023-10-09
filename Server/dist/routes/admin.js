"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const app = (0, express_1.default)();
const db_1 = require("../db/db");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield db_1.Admin.findById(req.headers.userId);
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({
        username: admin.username,
    });
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: "i am already here" });
    }
    else {
        const newAdmin = new db_1.Admin({ username, password });
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, auth_1.SECRET, { expiresIn: "1h" });
        res.json({ message: "Admin creates succesfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, auth_1.SECRET, { expiresIn: "1h" });
        // const token = generatejwt(admin);
        res.json({ message: "loged in succes", token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
router.post("/courses", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new db_1.Course(req.body);
    yield course.save();
    res.json({ message: "course created successfully", courseId: course.id });
}));
// for updating the course
router.put("/courses/:courseid", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findByIdAndUpdate(req.params.courseid, req.body);
    if (course) {
        res.json({ message: "Course updated succesfully" });
    }
    else {
        res.status(404).json({ message: "course not found" });
    }
}));
router.get("/courses", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    res.json({ courses });
}));
// for getting the single course
router.get("/course/:courseId", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield db_1.Course.findById(courseId);
    if (!course) {
        res.json({ message: "course not found" });
    }
    else {
        res.status(200).json({ course });
    }
}));
// i need to do the put here insted of the delete because the this enpoint was working with the postman
// but when i was doing it from the frontend using the axios the token was not working
router.delete("/course/:courseId", auth_2.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    yield db_1.Course.deleteOne({ _id: courseId });
    res.status(200).json({ message: "course deleted" });
}));
exports.default = router;
