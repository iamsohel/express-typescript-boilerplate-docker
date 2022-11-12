import { response, Response } from 'express';
import { JwtPayload } from '../JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
    }
    export interface Response {
      successResponse(data?: T): Response;
    }
  }
}
