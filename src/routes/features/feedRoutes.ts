import { Router } from 'express';
import feedController from '../../controllers/feedController';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, feedController.getFeeds.bind(feedController));
router.get(
  '/:id',
  authenticate,
  feedController.getSingleFeed.bind(feedController)
);
router.get(
  '/user/:id',
  authenticate,
  feedController.getUserFeeds.bind(feedController)
);
router.post('/', authenticate, feedController.createFeed.bind(feedController));
router.delete(
  '/:id',
  authenticate,
  feedController.deleteFeed.bind(feedController)
);

export default router;
