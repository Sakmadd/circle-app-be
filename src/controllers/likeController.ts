import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { LikeType } from '../types/types';
import likeServices from '../services/likeServices';
import Redis from '../middlewares/redis';

class likeController {
  async likeLogic(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<LikeType> =
      await likeServices.LikeLogic({
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
      new ServiceResponseDTO<LikeType>({
        error: false,
        message: message,
        payload: payload,
      })
    );
  }
}

export default new likeController();
