import { UserType } from "../types/UserTypes";
import { Response, NextFunction } from "express";
import { Request, UserPayload } from "../definitions/request";
import jwt from "jsonwebtoken";

export const activeUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, "jwt_key") as UserPayload;
    req.user = payload;
  } catch (error) {}
  next();
};
