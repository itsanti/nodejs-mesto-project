import { Router } from 'express';
import {
  getUserInfo, getUsers, getUserById, patchUser, patchUserAvatar,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUserById);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

export default router;
