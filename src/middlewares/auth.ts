import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors';
import { JWT_SECRET } from '../config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.locals.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
