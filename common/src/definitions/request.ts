import { Request } from "express";

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

export { Request, UserPayload };
