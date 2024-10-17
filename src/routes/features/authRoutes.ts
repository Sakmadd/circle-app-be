import { Router } from 'express';
import authController from '../../controllers/authController';

const router = Router();

router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/forgot', authController.forgotPassword);
router.get('/reset', authController.resetPassword);

export default router;
