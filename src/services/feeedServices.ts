import { Prisma, PrismaClient } from '@prisma/client';
import FeedDto from '../dtos/feedDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { FeedMoreDetailType, FeedType, UserType } from '../types/types';
import prismaErrorHandler from '../utils/PrismaError';

const prisma = new PrismaClient();

class FeedServices {
  async getFeeds(
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<FeedMoreDetailType[]>> {
    try {
      const rawFeeds: FeedMoreDetailType[] = await prisma.feed.findMany({
        include: {
          author: true,
          likes: true,
          replies: true,
        },
      });
      const feeds: FeedMoreDetailType[] = rawFeeds.map((feed) => {
        const { replies, likes, author, ...rest } = feed;
        delete author.password;
        delete author.createdAt;
        delete author.updatedAt;
        delete rest.updatedAt;

        return {
          ...rest,
          author,
          totalReplies: replies.length,
          totalLikes: likes.length,
          isLiked: feed.likes.some((like) => like.userId === loggedUser.id),
        };
      });

      return new ServiceResponseDTO<FeedMoreDetailType[]>({
        error: false,
        message: 'feeds delivered',
        payload: feeds.sort((a, b) => {
          const feedA = a.createdAt.getTime();
          const feedB = b.createdAt.getTime();

          return feedA - feedB;
        }),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ServiceResponseDTO({
          error: true,
          payload: null,
          message: prismaErrorHandler(error),
        });
      }
      return new ServiceResponseDTO({
        error: true,
        payload: null,
        message: error.message,
      });
    }
  }
  async getSingleFeed(
    id: number,
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<FeedMoreDetailType>> {
    try {
      const rawFeed: FeedMoreDetailType = await prisma.feed.findUnique({
        where: { id: id },
        include: {
          author: true,
          likes: true,
          replies: true,
        },
      });

      if (!rawFeed) {
        throw new Error('feed does not exist');
      }

      const feed: FeedMoreDetailType = {
        ...rawFeed,
        likes: rawFeed.likes.map((like) => {
          delete like.createdAt;
          delete like.updatedAt;
          return like;
        }),
        totalLikes: rawFeed.likes.length,
        totalReplies: rawFeed.replies.length,
        isLiked: rawFeed.likes.some((like) => like.userId === loggedUser.id),
        replies: rawFeed.replies.sort((a, b) => {
          const replyA = a.createdAt.getTime();
          const replyB = b.createdAt.getTime();

          return replyB - replyA;
        }),
      };

      return new ServiceResponseDTO<FeedMoreDetailType>({
        error: false,
        message: 'feed delivered',
        payload: feed,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ServiceResponseDTO({
          error: true,
          payload: null,
          message: prismaErrorHandler(error),
        });
      }
      return new ServiceResponseDTO({
        error: true,
        payload: null,
        message: error.message,
      });
    }
  }
  async getUserFeeds(
    id: number
  ): Promise<ServiceResponseDTO<FeedMoreDetailType[]>> {
    try {
      const rawFeed: FeedMoreDetailType[] = await prisma.feed.findMany({
        where: {
          authorId: id,
        },
        include: {
          likes: true,
          replies: true,
        },
      });

      if (!rawFeed) {
        throw new Error('user does not have any feed');
      }

      const feeds: FeedMoreDetailType[] = rawFeed.map((feed) => {
        const { likes, replies, ...rest } = feed;

        return {
          ...rest,
          totalLikes: likes.length,
          totalReplies: replies.length,
        };
      });

      return new ServiceResponseDTO<FeedMoreDetailType[]>({
        error: false,
        message: 'feed delivered',
        payload: feeds,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ServiceResponseDTO({
          error: true,
          payload: null,
          message: prismaErrorHandler(error),
        });
      }
      return new ServiceResponseDTO({
        error: true,
        payload: null,
        message: error.message,
      });
    }
  }
  async createFeed(feedDto: FeedDto): Promise<ServiceResponseDTO<FeedType>> {
    try {
      const createdFeed = await prisma.feed.create({
        data: feedDto,
      });

      return new ServiceResponseDTO<FeedType>({
        error: false,
        message: 'feed created',
        payload: createdFeed,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ServiceResponseDTO({
          error: true,
          payload: null,
          message: prismaErrorHandler(error),
        });
      }
      return new ServiceResponseDTO({
        error: true,
        payload: null,
        message: error.message,
      });
    }
  }
  async deleteFeed(
    id: number,
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<FeedType>> {
    try {
      const targetFeed: FeedType = await prisma.feed.findUnique({
        where: { id },
      });

      if (loggedUser.id !== targetFeed.authorId) {
        throw new Error('cant delete someone Feed');
      }

      const deletedFeed: FeedType = await prisma.feed.delete({
        where: { id: targetFeed.id },
      });

      return new ServiceResponseDTO<FeedType>({
        error: false,
        message: 'feed deleted',
        payload: deletedFeed,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new ServiceResponseDTO({
          error: true,
          payload: null,
          message: prismaErrorHandler(error),
        });
      }
      return new ServiceResponseDTO({
        error: true,
        payload: null,
        message: error.message,
      });
    }
  }
}

export default new FeedServices();
