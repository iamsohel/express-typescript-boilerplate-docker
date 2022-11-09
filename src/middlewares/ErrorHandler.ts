import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/response/errors/custom-error';
import { AppLogger } from '../utils/Logger';

export default class ErrorHandler {
  static handle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      AppLogger.error(err.serializeErrors());
      return res.status(err.statusCode).send(err.serializeErrors());
    }

    AppLogger.error(err);
    return res.status(500).send({ message: err.message });
  };

  static initializeUnhandledException = () => {
    process.on('unhandledRejection', (reason: Error) => {
      AppLogger.error(reason.name + ' - ' + reason.message);
      AppLogger.error('UNHANDLED REJECTION! 💥 Shutting down...');
      throw reason;
    });

    process.on('uncaughtException', (err: Error) => {
      AppLogger.error(err.name + ' - ' + err.message);
      AppLogger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
      process.exit(1);
    });
  };
}
