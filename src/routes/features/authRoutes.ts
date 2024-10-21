import { Router } from 'express';
import authController from '../../controllers/authController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.get('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.get('/forgot', authController.forgotPassword.bind(authController));
router.get(
  '/reset',
  authenticate,
  authController.resetPassword.bind(authController)
);

export default router;
