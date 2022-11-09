export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Error.prototype);
  }

  abstract serializeErrors(): { message: string } | {};
}
