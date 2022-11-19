import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestValidationError } from '../utils/response/errors/request-validation-error';

export default class RequestValidator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body);
      await validate(convertedObject).then((errors) => {
        if (errors.length > 0) {
          const rawErrors: Record<string, string[]> = {};
          for (const errorItem of errors) {
            rawErrors[errorItem.property] = Object.values(errorItem.constraints ?? []);
          }
          next(new RequestValidationError(rawErrors));
        }
      });
      next();
    };
  };
}
