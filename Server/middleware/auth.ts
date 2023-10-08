import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const SECRET = "at0EGCexKmMTkE92LSFYc8faed8TyATq";

interface user {
  username?: string;
  password?: string;
}

export const generatejwt = (user: user) => {
  const paylode = { username: user.username };
  return jwt.sign(paylode, SECRET, { expiresIn: "1h" });
};

export const authenticatejwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers.authorization;

  if (authheader) {
    const token = authheader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {
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
