import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not Authorized");
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authorized" }];
  }
}
