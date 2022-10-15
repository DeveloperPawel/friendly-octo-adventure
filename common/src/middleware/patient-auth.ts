import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const patientAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.role) {
    throw new NotAuthorizedError();
  }

  next();
};
