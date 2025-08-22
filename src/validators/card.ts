import { celebrate, Joi, Segments } from 'celebrate';
import { Card } from '../models';

const CARD_NAME_MIN = Card.schema.paths.name.options.minlength;
const CARD_NAME_MAX = Card.schema.paths.name.options.maxlength;

export const cardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(CARD_NAME_MIN).max(CARD_NAME_MAX).required(),
    link: Joi.string().uri().required(),
  }),
});

export const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
