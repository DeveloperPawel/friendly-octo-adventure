import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  serializeErrors(): { message: string; field?: string | undefined }[] {
    throw new Error("Method not implemented.");
  }
}
