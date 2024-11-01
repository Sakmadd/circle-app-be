import { NextFunction, Response, Request } from 'express';
import { redisClient } from '../libs/redis';
import ResponseDTO from '../dtos/ResponseDTO';
import { FeedMoreDetailType, FeedType } from '../types/types';

class Redis {
  async getFeeds(req: Request, res: Response, next: NextFunction) {
    const rawFeeds = await redisClient.get('FEEDS');
    const feeds = JSON.parse(rawFeeds);

    if (feeds) {
      return res.status(200).json(
        new ResponseDTO<FeedMoreDetailType[]>({
          error: false,
          data: feeds,
          message: 'Feed Delivered',
        })
      );
    }
    next();
  }

  async setFeeds(feeds: FeedType[]) {
    await redisClient.set('FEEDS', JSON.stringify(feeds));
  }
  async delFeeds() {
    await redisClient.del('FEEDS');
  }
}

export default new Redis();
