import { StatusCodes } from '../utils/http';
import BaseAppError from './BaseAppError';

export default class ForbiddenError extends BaseAppError {
  constructor(message?: string) {
    super(message || 'Запрещено', StatusCodes.FORBIDDEN);
  }
}
