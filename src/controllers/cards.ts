import { NextFunction, Request, Response } from 'express';
import { Card, ICard } from '../models';
import { NotFoundError, ForbiddenError } from '../errors';
import { StatusCodes } from '../utils/http';

const CardNotFoundMessage = 'Запрашиваемая карточка не найдена';

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findById(
  req.params.cardId,
).orFail(new NotFoundError(CardNotFoundMessage))
  .then((card) => {
    if (card.owner.toString() !== res.locals?.user?._id) {
      return Promise.reject(new ForbiddenError('Нельзя удалить чужую карточку'));
    }
    return card;
  })
  .then((card) => {
    card.delete();
    res.send(card);
  })
  .catch(next);

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = res.locals.user._id;

  return Card.create<Partial<ICard>>({ name, link, owner })
    .then((card) => res.status(StatusCodes.CREATED).send(card))
    .catch(next);
};

export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: res.locals.user._id } },
  { new: true, runValidators: true },
).orFail(new NotFoundError(CardNotFoundMessage))
  .then((card) => res.send(card))
  .catch(next);

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: res.locals.user._id } },
  { new: true, runValidators: true },
).orFail(new NotFoundError(CardNotFoundMessage))
  .then((card) => res.send(card))
  .catch(next);
