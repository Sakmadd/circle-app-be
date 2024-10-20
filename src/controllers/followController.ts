import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import followServices from '../services/followServices';
import { FollowType } from '../types/types';

class FollowControllers {
  async follow(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, payload, message }: ServiceResponseDTO<FollowType> =
      await followServices.follow({
        followerId: +id,
        followingId: loggedUser.id,
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

    return res.status(200).json(
      new ResponseDTO<FollowType>({
        error: false,
        message: {
          status: 'User followed!',
        },
        data: payload,
      })
    );
  }

  async unFollow(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, payload, message }: ServiceResponseDTO<FollowType> =
      await followServices.unFollow({
        followerId: +id,
        followingId: loggedUser.id,
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

    return res.status(200).json(
      new ResponseDTO<FollowType>({
        error: false,
        message: {
          status: 'User unFollowed!',
        },
        data: payload,
      })
    );
  }
}
export default new FollowControllers();
