import ErrorHandler from './middlewares/ErrorHandler';
import Config from './config/Config';
import http from 'http';
import { AppLogger } from './utils/Logger';
import AppDataSource from './DataSource';
import { app } from './app';
const PORT = Config.port || 4000;

let server: http.Server;
const startServer = async () => {
  try {
    const db = await AppDataSource.initialize();
    server = app.listen(PORT, (): void => {
      AppLogger.info(`🚀 sever is running on port ${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) AppLogger.error(`Error occurr: ${error.message}`);
  }
};

startServer();
ErrorHandler.initializeUnhandledException();
process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) server.close();
});
