"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = exports.generatejwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "at0EGCexKmMTkE92LSFYc8faed8TyATq";
const generatejwt = (user) => {
    const paylode = { username: user.username };
    return jsonwebtoken_1.default.sign(paylode, SECRET, { expiresIn: "1h" });
};
exports.generatejwt = generatejwt;
const authenticatejwt = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.user = user; // we here know that we have passed paylode of{usernmae: }
                // when we generaetd the token
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: "invalid token or no token" });
    }
};
exports.authenticatejwt = authenticatejwt;
