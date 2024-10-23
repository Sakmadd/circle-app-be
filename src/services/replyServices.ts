import { Prisma, PrismaClient } from '@prisma/client';
import ReplyDto from '../dtos/replyDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { replySchema } from '../validators/dataSchema';
import prismaErrorHandler from '../utils/PrismaError';
import { UserType } from '../types/types';

const prisma = new PrismaClient();

class ReplyServices {
  async createReply(replyDto: ReplyDto): Promise<ServiceResponseDTO<ReplyDto>> {
    try {
      const { success, error } = replySchema.safeParse(replyDto);
      if (!success) {
        throw new Error(error.message);
      }
      const createdReply = await prisma.reply.create({
        data: replyDto,
      });

      delete createdReply.updateAt;

      return new ServiceResponseDTO<ReplyDto>({
        error: false,
        message: 'reply succed',
        payload: createdReply,
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
  async deleteReply(
    id: number,
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<ReplyDto>> {
    try {
      const selectedReply = await prisma.reply.findUnique({
        where: { id },
      });
      if (selectedReply.userId !== loggedUser.id) {
        throw new Error('cant delete someone reply');
      }
      const deleteReply = await prisma.reply.delete({
        where: { id },
      });
      return new ServiceResponseDTO<ReplyDto>({
        error: false,
        message: 'reply deleted',
        payload: deleteReply,
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

export default new ReplyServices();
