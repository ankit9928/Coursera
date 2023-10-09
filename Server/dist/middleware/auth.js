"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "at0EGCexKmMTkE92LSFYc8faed8TyATq";
const authenticatejwt = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, paylode) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                if (!paylode) {
                    return res.status(403);
                }
                if (typeof paylode === "string") {
                    return res.sendStatus(403);
                }
                req.headers["userId"] = paylode.id;
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: "invalid token or no token" });
    }
};
exports.authenticatejwt = authenticatejwt;
