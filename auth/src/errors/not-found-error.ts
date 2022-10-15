export class NotFoundError extends Error {
  statusCode = 404;

  constructor() {
    super("Resource not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): any {
    return [{ message: "NotFound" }];
  }
}
