import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserType } from "../types/UserTypes";

export const providerAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const necessaryRoles: Array<string> = [UserType.Provider, UserType.Admin];

  if (!necessaryRoles.includes(req.user!.role)) {
    throw new NotAuthorizedError();
  }

  next();
};
