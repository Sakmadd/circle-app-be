import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import userServices from '../services/userServices';
import { UserType } from '../types/types';

class UserControllers {
  async getUser(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<UserType> =
      await userServices.getUser(+id, loggedUser);

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
      new ResponseDTO<UserType>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async getUsers(req: Request, res: Response) {
    const loggedUser = res.locals.user;

    const { error, message, payload }: ServiceResponseDTO<UserType[]> =
      await userServices.getUsers(loggedUser);

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
      new ResponseDTO<UserType[]>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async getLoggedUser(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { error, payload }: ServiceResponseDTO<UserType> =
      await userServices.getLoggedUser(loggedUser);

    if (error) {
      return res.status(500).json(
        new ResponseDTO<null>({
          error,
          message: payload,
          data: null,
        })
      );
    }

    return res.status(200).json(
      new ResponseDTO<UserType>({
        error,
        message: {
          status: 'User retrieved!',
        },
        data: payload,
      })
    );
  }
  async searchUser(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const keyword = req.query.keyword;

    if (typeof keyword !== 'string') {
      return res.status(400).json(
        new ResponseDTO<null>({
          error: true,
          message: {
            error: 'Keyword must be a string.',
          },
          data: null,
        })
      );
    }

    const { error, payload } = await userServices.searchUser(
      { keyword },
      loggedUser
    );

    if (error) {
      return res.status(500).json(
        new ResponseDTO<null>({
          error,
          message: payload,
          data: null,
        })
      );
    }

    return res.status(200).json(
      new ResponseDTO<UserType>({
        error,
        message: {
          status: 'User retrieved!',
        },
        data: payload,
      })
    );
  }
}

export default new UserControllers();
