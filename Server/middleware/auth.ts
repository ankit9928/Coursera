import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const SECRET = "at0EGCexKmMTkE92LSFYc8faed8TyATq";

export const authenticatejwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers.authorization;

  if (authheader) {
    const token = authheader.split(" ")[1];

    jwt.verify(token, SECRET, (err, paylode) => {
      if (err) {
        return res.sendStatus(403);
      } else {
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
  } else {
    res.status(403).json({ message: "invalid token or no token" });
  }
};
