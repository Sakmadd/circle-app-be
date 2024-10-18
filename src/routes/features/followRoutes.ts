import { Router } from 'express';
import followController from '../../controllers/followController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post(
  '/add/:id',
  authenticate,
  followController.follow.bind(followController.follow)
);
router.delete(
  '/remove/:id',
  authenticate,
  followController.unFollow.bind(followController.unFollow)
);

export default router;
