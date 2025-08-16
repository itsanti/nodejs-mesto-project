import { Router } from 'express';
import {
  getUsers, getUserById, createUser, patchUser, patchUserAvatar,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

export default router;
