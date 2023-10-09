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
const app = (0, express_1.default)();
const db_1 = require("../db/db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        res.status(404).json({ message: "user alredy exist" });
    }
    else {
        const newuser = new db_1.User({ username, password });
        yield newuser.save();
        const token = jsonwebtoken_1.default.sign({ id: newuser._id }, auth_1.SECRET, { expiresIn: "1h" });
        res.json({ message: "user created succesfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_1.SECRET, { expiresIn: "1h" });
        res.json({ message: "loged in succesfully", token });
    }
    else {
        res.status(403).json({ message: "wrong credentilas" });
    }
}));
router.get("/courses", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    // console.log(courses);      its an arrya of objects
    res.json({ courses });
}));
router.post("/courses/:courseid", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseid);
    if (course) {
        const user = yield db_1.User.findById(req.headers.userId);
        if (user) {
            user.purchasedCourses.push(course._id); // even though we pushed the hole big course here but only the id of course is stored there
            yield user.save();
            res.json({ message: "course purchased succesfully" });
        }
        else {
            res.status(403).json({ message: "user not found" });
        }
    }
    else {
        res.status(404).json({ message: "course not found" });
    }
}));
router.get("/purchasedcourses", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findById(req.headers.userId).populate("purchasedCourses");
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: "user not found" });
    }
}));
exports.default = router;
