import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import likeServices from '../services/likeServices';
import { LikeType } from '../types/types';

class likeController {
  async likeLogic(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { feedId } = req.body;

    const { error, message, payload }: ServiceResponseDTO<LikeType> =
      await likeServices.LikeLogic({
        feedId,
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

    return new ServiceResponseDTO<LikeType>({
      error: false,
      message: message,
      payload: payload,
    });
  }
}

export default new likeController();
