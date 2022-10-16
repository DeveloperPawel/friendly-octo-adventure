import { Response, NextFunction } from "express";
import { Request } from "../definitions/request";
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

  const necessaryRoles: Array<string> = [UserType.Provider, UserType.Admin];

  if (!necessaryRoles.includes(req.user!.role)) {
    throw new NotAuthorizedError();
  }

  next();
};
