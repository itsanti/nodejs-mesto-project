import {
  model, Schema, Model, HydratedDocument,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { UnauthorizedError } from '../errors';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(
    _email: string,
    _password: string
  ): Promise<HydratedDocument<IUser>>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    async findUserByCredentials(email: string, password: string) {
      const authErrorMessage = 'Неправильные почта или пароль';
      const user = await this.findOne<IUser>({ email }).select('+password');

      if (!user) {
        throw new UnauthorizedError(authErrorMessage);
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new UnauthorizedError(authErrorMessage);
      }
      return user;
    },
  },
});

export default model<IUser, IUserModel>('user', userSchema);
