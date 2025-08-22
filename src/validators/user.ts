import { celebrate, Joi, Segments } from 'celebrate';
import { User } from '../models';

const USER_NAME_MIN = User.schema.paths.name.options.minlength;
const USER_NAME_MAX = User.schema.paths.name.options.maxlength;

const USER_ABOUT_MIN = User.schema.paths.about.options.minlength;
const USER_ABOUT_MAX = User.schema.paths.about.options.maxlength;

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const userIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

export const userValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(USER_NAME_MIN).max(USER_NAME_MAX).optional(),
    about: Joi.string().min(USER_ABOUT_MIN).max(USER_ABOUT_MAX).optional(),
    avatar: Joi.string().uri().optional(),
  }),
});

export const patchUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(USER_NAME_MIN).max(USER_NAME_MAX).optional(),
    about: Joi.string().min(USER_ABOUT_MIN).max(USER_ABOUT_MAX).optional(),
  }),
});

export const patchAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});
