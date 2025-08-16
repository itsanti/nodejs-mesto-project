import { NextFunction, Request, Response } from 'express';
import { Card, ICard } from '../models';
import { NotFoundError } from '../middlewares/errorHandler';

const CardNotFoundMessage = 'Запрашиваемая карточка не найдена';

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndDelete(
  req.params.cardId,
)
  .then((card) => {
    if (!card) return next(new NotFoundError(CardNotFoundMessage));
    return res.send(card);
  })
  .catch(next);

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = res.locals.user._id;

  return Card.create<Partial<ICard>>({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: res.locals.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) return next(new NotFoundError(CardNotFoundMessage));
    return res.send(card);
  })
  .catch(next);

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: res.locals.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) return next(new NotFoundError(CardNotFoundMessage));
    return res.send(card);
  })
  .catch(next);
