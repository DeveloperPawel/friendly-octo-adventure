import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 502;
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Connection to database error" }];
  }
}
