import { Request, Response } from 'express';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import ReplyDto from '../dtos/replyDto';
import replyServices from '../services/replyServices';
import ResponseDTO from '../dtos/ResponseDTO';
import Redis from '../middlewares/redis';

class replyController {
  async createReply(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const image = req.file?.path || null;
    const { content, id } = req.body;

    const { error, message, payload }: ServiceResponseDTO<ReplyDto> =
      await replyServices.createReply({
        content,
        image,
        feedId: +id,
        userId: loggedUser.id,
      });
    if (error) {
      return res.status(400).json(
        new ResponseDTO<null>({
          data: null,
          error: true,
          message: message,
        })
      );
    }

    await Redis.delFeeds();

    return res.status(200).json(
      new ResponseDTO<ReplyDto>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async deleteReply(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<ReplyDto> =
      await replyServices.deleteReply(+id, loggedUser);
    if (error) {
      return res.status(400).json(
        new ResponseDTO<null>({
          data: null,
          error: true,
          message: message,
        })
      );
    }

    await Redis.delFeeds();

    return res.status(200).json(
      new ResponseDTO<ReplyDto>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
}

export default new replyController();
