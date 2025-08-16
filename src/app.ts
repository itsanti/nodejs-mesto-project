import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { StatusCodes } from './utils/http';
import authMiddleware from './middlewares/auth';

const { PORT = 3000, DB_NAME = 'mestodb' } = process.env;
const app = express();

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Не найдено' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Сервер запущен на порту ${PORT}`);
});
