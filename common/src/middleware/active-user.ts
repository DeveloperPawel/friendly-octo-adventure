import { UserType } from "../types/UserTypes";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request extends CookieSessionInterfaces.CookieSessionRequest {
      user?: UserPayload;
    }
  }
}

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