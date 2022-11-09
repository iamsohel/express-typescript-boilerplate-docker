import { response, Response } from 'express';

declare global {
  namespace Express {
    export interface Response {
      successResponse(data?: T): Response;
    }
  }
}
