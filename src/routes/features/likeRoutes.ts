import { Router } from 'express';
import likeController from '../../controllers/likeController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post(
  '/:id',
  authenticate,
  likeController.likeLogic.bind(likeController)
);

export default router;
