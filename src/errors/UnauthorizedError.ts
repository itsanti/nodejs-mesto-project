import { StatusCodes } from '../utils/http';
import BaseAppError from './BaseAppError';

export default class UnauthorizedError extends BaseAppError {
  constructor(message?: string) {
    super(message || 'Необходима авторизация', StatusCodes.UNAUTHORIZED);
  }
}
