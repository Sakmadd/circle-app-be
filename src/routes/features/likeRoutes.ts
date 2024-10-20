import { Router } from 'express';
import likeController from '../../controllers/likeController';

const router = Router();

router.post('/', likeController.likeLogic.bind(likeController.likeLogic));

export default router;