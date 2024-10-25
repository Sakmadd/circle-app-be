import { Prisma, PrismaClient } from '@prisma/client';
import SearchDTO from '../dtos/searchDto';
import ServiceResponseDTO from '../dtos/serviceResponseDto';
import UserDto from '../dtos/userDto';
import { userMoreDetailType, UserType } from '../types/types';
import prismaErrorHandler from '../utils/PrismaError';
import { editUserSchema } from '../validators/dataSchema';

const prisma = new PrismaClient();

class UserServices {
  async getUser(
    id: number,
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<UserType>> {
    try {
      const rawUser: userMoreDetailType = await prisma.user.findUnique({
        where: { id },
        include: {
          followers: true,
          followings: true,
          feeds: {
            include: {
              likes: true,
              replies: true,
            },
          },
        },
      });

      if (!rawUser) {
        return new ServiceResponseDTO<UserType>({
          error: true,
          message: 'User not found',
          payload: null,
        });
      }

      const user = {
        ...rawUser,
        totalFollowers: rawUser.followers.length,
        totalFollowings: rawUser.followings.length,
        isFollowed: rawUser.followers.some((follower) => {
          return follower.followingId === loggedUser.id;
        }),
        feeds: rawUser.feeds.map((feed) => {
          const replies = feed.replies;
          const likes = feed.likes;

          delete feed.likes;
          delete feed.replies;
          delete feed.createdAt;

          delete loggedUser.password;
          delete loggedUser.updatedAt;

          return {
            ...feed,
            author: rawUser,
            totalReplies: replies.length,
            totalLikes: likes.length,
            isLiked: likes.some((like) => like.userId === loggedUser.id),
          };
        }),
      };

      delete user.password;
      delete user.updatedAt;
      delete user.createdAt;

      return new ServiceResponseDTO<UserType>({
        error: false,
        message: 'user delivered',
        payload: user,
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
  async getUsers(
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<UserType[]>> {
    try {
      const rawUsers: userMoreDetailType[] = await prisma.user.findMany({
        include: {
          followers: true,
          followings: true,
        },
      });
      const users = rawUsers.map((user) => {
        const followers = user.followers;

        if (followers.length) {
          return {
            ...user,
            isFollowed: followers.some(
              (follower) => follower.followingId === loggedUser.id
            ),
          };
        }

        return {
          ...user,
          isFollowed: false,
        };
      });
      return new ServiceResponseDTO<UserType[]>({
        error: false,
        message: 'users delivered',
        payload: users,
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
  async getLoggedUser(
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<userMoreDetailType>> {
    try {
      const rawuser: userMoreDetailType = await prisma.user.findUnique({
        where: {
          id: loggedUser.id,
        },
        include: {
          followers: true,
          followings: true,
          feeds: {
            include: {
              likes: true,
              replies: true,
            },
          },
        },
      });

      const user = {
        ...rawuser,
        totalFollowers: rawuser.followers.length,
        totalFollowings: rawuser.followings.length,
        feeds: rawuser.feeds
          .sort((a, b) => {
            const feedA = a.createdAt.getTime();
            const feedB = b.createdAt.getTime();

            return feedB - feedA;
          })
          .map((feed) => {
            const replies = feed.replies;
            const likes = feed.likes;

            delete feed.replies;
            delete feed.likes;

            delete loggedUser.createdAt;
            delete loggedUser.updatedAt;

            return {
              ...feed,
              author: loggedUser,
              totalLikes: likes.length,
              totalReplies: replies.length,
              isLiked: likes.some((like) => {
                return like.userId === loggedUser.id;
              }),
            };
          }),
      };
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      return new ServiceResponseDTO<userMoreDetailType>({
        error: false,
        message: 'user delivered',
        payload: user,
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
  async searchUser(searchDTO: SearchDTO, loggedUser: UserType) {
    try {
      if (!searchDTO.keyword) {
        return new ServiceResponseDTO<userMoreDetailType[]>({
          error: false,
          payload: [],
          message: 'no search keyword',
        });
      }

      const rawResult: userMoreDetailType[] = await prisma.user.findMany({
        where: {
          username: {
            contains: searchDTO.keyword,
            mode: 'insensitive',
          },
          id: {
            not: loggedUser.id,
          },
        },
        include: {
          followers: true,
        },
      });

      const result = rawResult.map((result) => {
        delete result.password;
        delete result.createdAt;
        delete result.updatedAt;

        result.isFollowed = result.followers.some(
          (follower) => follower.followerId === loggedUser.id
        );

        return result;
      });

      return new ServiceResponseDTO<userMoreDetailType[]>({
        error: false,
        payload: result,
        message: 'search success',
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
        payload: error,
        message: error.message,
      });
    }
  }
  async editUser(
    userDto: UserDto,
    loggedUser: UserType
  ): Promise<ServiceResponseDTO<UserType>> {
    try {
      const { success, error } = editUserSchema.safeParse(userDto);
      if (!success) {
        throw new Error(error.message);
      }
      const targetUser: UserType = await prisma.user.findUnique({
        where: { id: userDto.id },
      });
      if (targetUser.id !== loggedUser.id) {
        throw new Error('cant edit someone data');
      }
      const updatedUser: UserType = await prisma.user.update({
        where: {
          id: userDto.id,
        },
        data: this.editUserDto(userDto, targetUser),
      });

      delete updatedUser.password;
      delete updatedUser.createdAt;
      delete updatedUser.updatedAt;

      return new ServiceResponseDTO<UserType>({
        error: false,
        message: 'user edited',
        payload: updatedUser,
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
  private editUserDto(newData: UserDto, oldData: UserType) {
    return new UserDto({
      id: newData.id,
      username: newData.username || oldData.username,
      name: newData.name || oldData.username,
      filterContent: newData.filterContent || oldData.filterContent,
      avatar: newData.avatar || oldData.avatar,
      banner: newData.banner || oldData.banner,
      bio: newData.bio || oldData.bio,
    });
  }
}

export default new UserServices();
