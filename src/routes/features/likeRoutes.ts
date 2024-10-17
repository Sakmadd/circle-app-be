import { Router } from 'express';
import likeController from '../../controllers/likeController';

const router = Router();

router.post('/', likeController.likeMechanism);

export default router;
