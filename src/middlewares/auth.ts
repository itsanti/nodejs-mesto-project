import { Request, Response, NextFunction } from 'express';

const authMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: '68a089927d892a77c14fd618',
  };
  next();
};

export default authMiddleware;
