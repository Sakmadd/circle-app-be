import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';
import { REDIS_URL } from '../configs/config';

export let redisClient: RedisClientType<any, any, any>;
export async function initRedis() {
  redisClient = await createClient({
    url: `${REDIS_URL}`,
  })
    .on('error', (e) => {
      throw new Error(`Redis Client Error : ${e}`);
    })
    .connect();
}
