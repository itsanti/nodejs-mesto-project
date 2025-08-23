import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from '../utils/http';
import { NotFoundError, UnauthorizedError } from '../errors';
import { User, IUser } from '../models';
import { JWT_SECRET } from '../config';

const UserNotFoundMessage = 'Запрашиваемый пользователь не найден';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password,
  } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .send({ token });
  } catch (e) {
    next(e);
  }
};

export const getUserInfo = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals?.user?._id;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const user = await User.findById(userId).orFail(new NotFoundError(UserNotFoundMessage));
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = (_req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .orFail(new NotFoundError(UserNotFoundMessage))
  .then((user) => res.send(user))
  .catch(next);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  return User.create<IUser>({
    name, about, avatar, email, password: passwordHash,
  })
    .then((user) => res.status(StatusCodes.CREATED).send(user))
    .catch(next);
};

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError(UserNotFoundMessage))
    .then((user) => res.send(user))
    .catch(next);
};

export const patchUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError(UserNotFoundMessage))
    .then((user) => res.send(user))
    .catch(next);
};
