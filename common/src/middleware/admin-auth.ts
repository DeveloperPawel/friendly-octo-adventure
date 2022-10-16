import { Response, NextFunction } from "express";
import { Request } from "../definitions/request";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserType } from "../types/UserTypes";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.role) {
    throw new NotAuthorizedError();
  }

  if (req.user!.role !== UserType.Admin) {
    throw new NotAuthorizedError();
  }

  next();
};
