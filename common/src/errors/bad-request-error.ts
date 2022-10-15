import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor() {
    super("Bad Request");
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Bad request" }];
  }
}
