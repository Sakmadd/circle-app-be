import { Prisma, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { CLIENT, SECRET_SAUCE } from '../configs/config';
import ForgotPasswordDTO from '../dtos/forgotPasswordDto';
import LoginDto from '../dtos/loginDto';
import RegisterDTO from '../dtos/registerDto';
import ResetPasswordDTO from '../dtos/resetPasswordDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import { sendMail } from '../libs/mailer';
import { UserType } from '../types/types';
import Hasher from '../utils/Hasher';
import prismaErrorHandler from '../utils/PrismaError';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../validators/dataSchema';

const prisma = new PrismaClient();

class AuthServices {
  async register(
    registerDTO: RegisterDTO
  ): Promise<ServiceResponseDTO<UserType>> {
    try {
      const { success, error } = registerSchema.safeParse(registerDTO);
      if (!success) {
        throw new Error(error.message);
      }
      const user = await prisma.user.create({
        data: {
          ...registerDTO,
          password: await Hasher.hashPassword(registerDTO.password),
        },
      });

      delete user.password;

      return new ServiceResponseDTO<UserType>({
        error: false,
        payload: user,
        message: null,
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
  async login(LoginDto: LoginDto): Promise<ServiceResponseDTO<string>> {
    try {
      const { success, error } = loginSchema.safeParse(LoginDto);
      if (!success) throw new Error(error.message);

      const requestedUser = await prisma.user.findUnique({
        where: {
          username: LoginDto.username,
        },
      });

      if (!requestedUser) {
        throw new Error('The username/password was incorrect.');
      }

      const isPasswordValid = await Hasher.comparePassword(
        LoginDto.password,
        requestedUser.password
      );

      if (!isPasswordValid) {
        throw new Error('The username/password was incorrect.');
      }

      delete requestedUser.password;

      const token = jwt.sign(requestedUser, SECRET_SAUCE);

      return new ServiceResponseDTO<string>({
        error: false,
        payload: token,
        message: null,
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
  async forgotPassword(
    forgotPasswordDTO: ForgotPasswordDTO
  ): Promise<ServiceResponseDTO<string>> {
    try {
      const { success, error } =
        forgotPasswordSchema.safeParse(forgotPasswordDTO);

      if (!success) {
        throw new Error(error.message);
      }

      const requestedUser = await prisma.user.findUnique({
        where: {
          email: forgotPasswordDTO.email,
        },
      });

      if (!requestedUser) {
        throw new Error(`User with ${forgotPasswordDTO.email} does not exist.`);
      }

      delete requestedUser.password;
      const token = jwt.sign(requestedUser, SECRET_SAUCE);

      await sendMail({
        to: requestedUser.email,
        subject: '[Circle App] Reset Password',
        name: requestedUser.name,
        header:
          'Plase click button below to reset your password and please do not share this email to anyone, including people claiming from Circle App.',
        footer:
          'This email message was auto-generated. Please do not respond. If you need additional help, please visit Circle App Support.',
        CTA: 'Reset Password',
        link: `${CLIENT}/help/reset/${token}`,
      });

      return new ServiceResponseDTO<string>({
        error: false,
        payload: token,
        message: null,
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
  async resetPassword(
    resetPasswordDTO: ResetPasswordDTO
  ): Promise<ServiceResponseDTO<string>> {
    try {
      const { success, error } =
        resetPasswordSchema.safeParse(resetPasswordDTO);

      if (!success) {
        throw new Error(error.message);
      }

      const updatedUser = await prisma.user.update({
        where: {
          email: resetPasswordDTO.email,
        },
        data: {
          password: await Hasher.hashPassword(resetPasswordDTO.password),
        },
      });

      if (!updatedUser) {
        throw new Error('Requested user does not exist.');
      }

      delete updatedUser.password;
      const token = jwt.sign(updatedUser, SECRET_SAUCE);

      return new ServiceResponseDTO<string>({
        error: false,
        payload: token,
        message: null,
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
        message: error,
      });
    }
  }
}

export default new AuthServices();
