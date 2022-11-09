import { response, Response } from 'express';

response.successResponse = function <T>(data: T): Response {
  return this.status(200).send(data);
};
