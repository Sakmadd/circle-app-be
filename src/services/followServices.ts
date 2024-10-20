import { Prisma, PrismaClient } from '@prisma/client';
import FollowDto from '../dtos/followDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { FollowType } from '../types/types';
import prismaErrorHandler from '../utils/PrismaError';

const prisma = new PrismaClient();

class FollowServices {
  async follow(followDto: FollowDto): Promise<ServiceResponseDTO<FollowType>> {
    try {
      if (this.isFolowHimself(followDto)) {
        throw new Error('cant follow itself.');
      }

      if (await this.isFollow(followDto)) {
        throw new Error('Target user is already followed');
      }

      const createdFollow: FollowType = await prisma.follow.create({
        data: followDto,
      });

      delete createdFollow.createdAt;
      delete createdFollow.updatedAt;

      return new ServiceResponseDTO<FollowType>({
        error: false,
        payload: createdFollow,
        message: null,
      });
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        errorMessage = prismaErrorHandler(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new ServiceResponseDTO<FollowType>({
        error: true,
        payload: null,
        message: errorMessage,
      });
    }
  }

  async unFollow(
    followDto: FollowDto
  ): Promise<ServiceResponseDTO<FollowType>> {
    try {
      if (this.isFolowHimself(followDto)) {
        throw new Error("Can't unfollow itself.");
      }

      const isFollow = await this.isFollow(followDto);
      if (!isFollow) {
        throw new Error('Target user is not followed yet');
      }

      const existingFollow = await prisma.follow.findFirst({
        where: {
          followerId: followDto.followerId,
          followingId: followDto.followingId,
        },
      });

      if (!existingFollow) {
        throw new Error('Follow record does not exist');
      }

      const createdUnfollow = await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      delete createdUnfollow.createdAt;
      delete createdUnfollow.updatedAt;

      return new ServiceResponseDTO<FollowType>({
        error: false,
        message: null,
        payload: createdUnfollow,
      });
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        errorMessage = prismaErrorHandler(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new ServiceResponseDTO<FollowType>({
        error: true,
        payload: null,
        message: errorMessage,
      });
    }
  }

  private isFolowHimself(followDto: FollowDto): boolean {
    return followDto.followerId === followDto.followingId;
  }

  private async isFollow(followDto: FollowDto): Promise<FollowType> {
    return await prisma.follow.findFirst({
      where: {
        AND: [
          { followingId: followDto.followingId },
          { followerId: followDto.followerId },
        ],
      },
    });
  }
}

export default new FollowServices();
