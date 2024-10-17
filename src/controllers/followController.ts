import { RequestHandler } from 'express';

class FollowControllers {
  follow: RequestHandler = async (req, res) => {
    res.send('follow');
  };
  unFollow: RequestHandler = async (req, res) => {
    res.send('unFollow');
  };
}
export default new FollowControllers();
