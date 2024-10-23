import { Router } from 'express';
import authController from '../../controllers/authController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/forgot', authController.forgotPassword.bind(authController));
router.patch(
  '/reset',
  authenticate,
  authController.resetPassword.bind(authController)
);

export default router;
