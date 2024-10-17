import { Router } from 'express';
import followController from '../../controllers/followController';

const router = Router();

router.get('/add/:id', followController.follow);
router.delete('/remove/:id', followController.unFollow);

export default router;
