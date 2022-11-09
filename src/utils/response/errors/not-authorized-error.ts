import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return { message: 'Not authorized' };
  }
}
