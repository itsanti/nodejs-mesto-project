import { Router } from 'express';
import {
  login, createUser,
} from '../controllers/users';
import { loginValidator, userValidator } from '../validators/user';

const router = Router();
router.post('/signin', loginValidator, login);
router.post('/signup', userValidator, createUser);

export default router;
