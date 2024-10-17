import { Router } from 'express';
import userController from '../../controllers/userController';

const router = Router();

router.get('/search', userController.searchUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/self', userController.getLoggedUser);
router.patch('/self', userController.edituser);

export default router;
