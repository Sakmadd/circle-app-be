import { RequestHandler } from 'express';

class likeController {
  likeMechanism: RequestHandler = async (req, res) => {
    res.send('likeMechanism');
  };
}

export default new likeController();
