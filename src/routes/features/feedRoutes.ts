import { Router } from 'express';
import feedController from '../../controllers/feedController';

const router = Router();

router.get('/', feedController.getFeeds);
router.get('/:id', feedController.getFeed);
router.get('/user/:id', feedController.getUserFeeds);
router.post('/', feedController.createFeed);
router.delete('/:id', feedController.deleteFeed);

export default router;
