import { Router } from 'express';
import replyController from '../../controllers/replyController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.delete(
  '/delete/:id',
  authenticate,
  replyController.deleteReply.bind(replyController)
);
router.post(
  '/create',
  authenticate,
  replyController.createReply.bind(replyController)
);

export default router;
