import { Request, Response } from 'express';
import ResponseDTO from '../dtos/ResponseDTO';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import AuthServices from '../services/authServices';
import { UserType } from '../types/types';

class AuthControllers {
  async register(req: Request, res: Response) {
    const avatar =
      'https://api.dicebear.com/9.x/thumbs/svg?backgroundColor=ffdfbf';
    const banner = '/src/assets/default-bg.png';
    const { username, email, name, password, bio } = req.body;

    const { error, payload, message }: ServiceResponseDTO<UserType> =
      await AuthServices.register({
        username,
        email,
        name,
        password,
        avatar,
        banner,
        bio: bio ? bio : null,
      });
    if (error) {
      return res.status(500).json(
        new ResponseDTO<null>({
          error,
          message: message,
          data: payload,
        })
      );
    }

    delete payload.password;

    return res.status(200).json(
      new ResponseDTO<UserType>({
        error,
        message: {
          status: 'User created!',
        },
        data: payload,
      })
    );
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const { error, payload, message }: ServiceResponseDTO<string> =
      await AuthServices.login({
        username,
        password,
      });

    if (error) {
      return res.status(200).json(
        new ResponseDTO<null>({
          error,
          message: message,
          data: null,
        })
      );
    }

    return res.status(200).json(
      new ResponseDTO<string>({
        error,
        message: {
          status: 'User logged in!',
        },
        data: {
          token: payload,
        },
      })
    );
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const { error, payload, message }: ServiceResponseDTO<string> =
      await AuthServices.forgotPassword({
        email,
      });

    if (error) {
      return res.status(500).json(
        new ResponseDTO<null>({
          error: true,
          message: message,
          data: null,
        })
      );
    }

    return res.status(200).json(
      new ResponseDTO<UserType>({
        error,
        message: {
          status: 'Ready to reset password!',
        },
        data: {
          token: payload,
        },
      })
    );
  }

  async resetPassword(req: Request, res: Response) {
    const requester = res.locals.user;
    const { password } = req.body;

    const { error, payload, message }: ServiceResponseDTO<string> =
      await AuthServices.resetPassword({
        email: requester.email,
        password,
      });

    if (error) {
      return res.status(500).json(
        new ResponseDTO<null>({
          error,
          message: message,
          data: null,
        })
      );
    }

    return res.status(200).json(
      new ResponseDTO<string>({
        error,
        message: {
          status: 'Password changed!',
        },
        data: {
          token: payload,
        },
      })
    );
  }
}

export default new AuthControllers();
