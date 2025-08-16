import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { StatusCodes } from '../utils/http';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ObjectNotFoundError';
  }
}

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotFoundError) {
    return res.status(StatusCodes.NOT_FOUND).send({ message: err.message });
  }

  if (err instanceof MongooseError.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Передан некорректный id' });
  }

  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Значение не уникальное' });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;
