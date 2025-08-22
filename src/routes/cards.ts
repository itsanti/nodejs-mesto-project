import { Router } from 'express';
import {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { cardIdValidator, cardValidator } from '../validators/card';

const router = Router();
router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCardById);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default router;
