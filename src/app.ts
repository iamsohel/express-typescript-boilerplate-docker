import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { NotFoundError } from './utils/response/errors/not-found-error';
import ErrorHandler from './middlewares/ErrorHandler';
import routes from './routes';
import cors from 'cors';
import { AppLogger } from './utils/Logger';
import './utils/response/success/successResponse';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
AppLogger.configureLogger();
app.use('/api/v1', routes);
app.all('*', async (req, res) => {
  throw new NotFoundError('route not found');
});
app.use(ErrorHandler.handle);

export { app };
