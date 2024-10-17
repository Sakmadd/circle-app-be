import { RequestHandler } from 'express';

class FeedControllers {
  getFeed: RequestHandler = async (req, res) => {
    res.send('getFeed');
  };
  getFeeds: RequestHandler = async (req, res) => {
    res.send('getFeeds');
  };
  getUserFeeds: RequestHandler = async (req, res) => {
    res.send('getuserFeeds');
  };
  createFeed: RequestHandler = async (req, res) => {
    res.send('createFeed');
  };
  deleteFeed: RequestHandler = async (req, res) => {
    res.send('deleteFeed');
  };
}

export default new FeedControllers();
