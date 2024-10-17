import { RequestHandler } from 'express';

class replyController {
  createReply: RequestHandler = async (req, res) => {
    res.send('reply');
  };
  deleteReply: RequestHandler = async (req, res) => {
    res.send('deleteReply');
  };
}

export default new replyController();
