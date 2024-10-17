import { Prisma } from '@prisma/client';

function prismaErrorHandler(err: Prisma.PrismaClientKnownRequestError) {
  switch (err.code) {
    case 'P2002':
      return `The ${err.meta.target} already exist.`;
    case 'P2014':
      return `The id: ${err.meta.target} is invalid.`;
    case 'P2003':
      return `Please input a valid data for ${err.meta.target}`;
    default:
      return `Something went wrong: ${err.message}`;
  }
}

export default prismaErrorHandler;
