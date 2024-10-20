import { PrismaClient } from '@prisma/client';
import LikeDto from '../dtos/likeDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { LikeType } from '../types/types';

const prisma = new PrismaClient();

class LkeServices {
  async LikeLogic(likeDto: LikeDto): Promise<ServiceResponseDTO<LikeType>> {
    const likeState: LikeType = await this.isLiked(likeDto);

    if (likeState) {
      const removedLike: LikeType = await this.removeLike(likeState);
      delete removedLike.createdAt;
      delete removedLike.updatedAt;

      return new ServiceResponseDTO<LikeType>({
        error: false,
        message: 'succeded to unlike',
        payload: removedLike,
      });
    }

    const addedLike: LikeType = await this.addLike(likeDto);
    delete addedLike.createdAt;
    delete addedLike.updatedAt;
    return new ServiceResponseDTO<LikeType>({
      error: false,
      message: 'succeded to like',
      payload: addedLike,
    });
  }
  private async isLiked(likeDto: LikeDto): Promise<LikeType> {
    return await prisma.like.findFirst({
      where: {
        AND: [{ userId: likeDto.userId }, { feedId: likeDto.feedId }],
      },
    });
  }
  private async removeLike(likeDto: LikeType): Promise<LikeType> {
    return await prisma.like.delete({
      where: {
        id: likeDto.id,
      },
    });
  }
  private async addLike(likeDto: LikeDto): Promise<LikeType> {
    const liked = await prisma.like.create({
      data: likeDto,
    });
    return liked;
  }
}

export default new LkeServices();
