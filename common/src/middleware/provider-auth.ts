import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserType } from "../types/UserTypes";

export const providerAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.role) {
    throw new NotAuthorizedError();
  }

  if (req.user?.role !== UserType.Provider) {
    throw new NotAuthorizedError();
  }

  next();
};
