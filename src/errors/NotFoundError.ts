import { StatusCodes } from '../utils/http';
import BaseAppError from './BaseAppError';

export default class NotFoundError extends BaseAppError {
  constructor(message?: string) {
    super(message || 'Не найдено', StatusCodes.NOT_FOUND);
  }
}
