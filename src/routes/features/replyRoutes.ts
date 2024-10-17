import { Router } from 'express';
import replyController from '../../controllers/replyController';

const router = Router();

router.delete('/delete/:id', replyController.deleteReply);
router.post('/create', replyController.createReply);

export default router;
