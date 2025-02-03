import { Router } from 'express';
import userController from '../../controllers/userController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.get(
  '/detail/:id',
  authenticate,
  userController.getUser.bind(userController)
);

router.get('/', authenticate, userController.getUsers.bind(userController));

router.get(
  '/search',
  authenticate,
  userController.searchUser.bind(userController)
);

router.get(
  '/self',
  authenticate,
  userController.getLoggedUser.bind(userController)
);

router.patch(
  '/text',
  authenticate,
  userController.editUserText.bind(userController)
);
router.patch(
  '/image',
  authenticate,
  userController.editUserImage.bind(userController)
);

export default router;
