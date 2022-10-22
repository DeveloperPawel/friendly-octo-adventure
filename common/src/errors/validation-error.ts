import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("Error validating parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
