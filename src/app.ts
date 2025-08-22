import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { errorHandler, authMiddleware } from './middlewares';
import { publicRouter, userRouter, cardRouter } from './routes';
import { PORT, DB_NAME } from './config';
import { NotFoundError } from './errors';
import { requestLogger, errorLogger } from './utils/logger';

const app = express();

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(publicRouter);
app.use(authMiddleware);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Страница не найдена')));

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Сервер запущен на порту ${PORT}`);
});
