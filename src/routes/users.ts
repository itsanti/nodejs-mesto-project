import { Router } from 'express';
import {
  getUserInfo, getUsers, getUserById, patchUser, patchUserAvatar,
} from '../controllers/users';
import { userIdValidator, patchUserValidator, patchAvatarValidator } from '../validators/user';

const router = Router();
router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', patchUserValidator, patchUser);
router.patch('/me/avatar', patchAvatarValidator, patchUserAvatar);

export default router;
