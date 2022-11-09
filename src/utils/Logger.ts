import { createLogger, transports, Logger, format, exitOnError } from 'winston';
import moment from 'moment';

export class AppLogger {
  private static logger: Logger;
  private static setLogger() {
    const logFormat = format.printf((info) => {
      return `${moment(info.timestamp).format('YYYY-MM-DD hh:mm A')} : ${info.level} : ${info.message}`;
    });
    this.logger = createLogger({
      format: format.combine(format.timestamp(), logFormat),
      transports: [
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new transports.Console(),
      ],
      exitOnError: false,
    });
  }

  private static getValue<T>(value: T) {
    if (typeof value === 'string') {
      return `${value}`;
    } else {
      return `${JSON.stringify(value)}`;
    }
  }

  public static configureLogger() {
    this.setLogger();
  }

  public static error<T>(value: T) {
    this.logger.log('error', this.getValue(value));
  }

  public static info<T>(value: T) {
    this.logger.log('info', this.getValue(value));
  }
}
