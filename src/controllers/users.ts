import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../middlewares/errorHandler';
import { User, IUser } from '../models';

const UserNotFoundMessage = 'Запрашиваемый пользователь не найден';

export const getUsers = (_req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) return next(new NotFoundError(UserNotFoundMessage));
    return res.send(user);
  })
  .catch(next);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create<IUser>({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(next);
};

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) return next(new NotFoundError(UserNotFoundMessage));
      return res.send(user);
    })
    .catch(next);
};

export const patchUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) return next(new NotFoundError(UserNotFoundMessage));
      return res.send(user);
    })
    .catch(next);
};
