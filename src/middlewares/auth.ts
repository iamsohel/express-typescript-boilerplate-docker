import { UnauthorizedError } from '../utils/response/errors/not-authorized-error';
import { RequestValidationError } from '../utils/response/errors/request-validation-error';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../utils/Logger';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(new RequestValidationError([{ message: 'Authorization header not provided' }]));
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: unknown };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: unknown };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
    return next();
  } catch (err) {
    AppLogger.error('UnauthorizedError, invalid access token');
    return next(new UnauthorizedError());
  }
};
