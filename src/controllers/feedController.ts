import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { FeedMoreDetailType, FeedType, UserType } from '../types/types';
import feedServices from '../services/feedServices';

class FeedControllers {
  async getFeeds(req: Request, res: Response) {
    const loggedUser: UserType = res.locals.user;

    const {
      error,
      message,
      payload,
    }: ServiceResponseDTO<FeedMoreDetailType[]> = await feedServices.getFeeds(
      loggedUser
    );
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
      new ResponseDTO<FeedMoreDetailType[]>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async getSingleFeed(req: Request, res: Response) {
    const loggedUser: UserType = res.locals.user;
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<FeedMoreDetailType> =
      await feedServices.getSingleFeed(+id, loggedUser);
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
      new ResponseDTO<FeedMoreDetailType>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async getUserFeeds(req: Request, res: Response) {
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<FeedType[]> =
      await feedServices.getUserFeeds(+id);

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
      new ResponseDTO<FeedType[]>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async createFeed(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const image = null;
    const { content } = req.body;

    const { error, message, payload }: ServiceResponseDTO<FeedType> =
      await feedServices.createFeed({
        content,
        image,
        authorId: loggedUser.id,
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
      new ResponseDTO<FeedType>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
  async deleteFeed(req: Request, res: Response) {
    const loggedUser = res.locals.user;
    const { id } = req.params;

    const { error, message, payload }: ServiceResponseDTO<FeedType> =
      await feedServices.deleteFeed(+id, loggedUser);

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
      new ResponseDTO<FeedType>({
        data: payload,
        error: false,
        message: message,
      })
    );
  }
}

export default new FeedControllers();
