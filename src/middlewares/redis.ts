import { NextFunction, Response, Request } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import { FeedMoreDetailType, FeedType } from '../types/types';
import { redis } from '../libs/redis';

class Redis {
  async getFeeds(req: Request, res: Response, next: NextFunction) {
    const rawFeeds = await redis.get('FEEDS');

    if (rawFeeds) {
      return res.status(200).json(
        new ResponseDTO<FeedMoreDetailType[]>({
          error: false,
          data: rawFeeds,
          message: 'Feed Delivered',
        })
      );
    }
    next();
  }

  async setFeeds(feeds: FeedType[]) {
    await redis.set('FEEDS', JSON.stringify(feeds));
  }
  async delFeeds() {
    await redis.del('FEEDS');
  }
}

export default new Redis();
