import { z } from 'zod';

const userNameRegex = /^[a-zA-Z0-9_]+$/;
const urlPatternRegex = /(https?:\/\/[^\s]+)/g;

const base64PatternRegex = /^data:image\/[a-zA-Z]+;base64,/;
const urlOrBase64Regex = new RegExp(
  `(${urlPatternRegex.source})|(${base64PatternRegex.source})`
);

export const registerSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(4).regex(userNameRegex),
  email: z.string().email(),
  password: z.string().min(4).max(20),
  avatar: z.string().url().nullable(),
  banner: z.string().nullable(),
  bio: z.string().nullable(),
});

export const loginSchema = z.object({
  username: z.string().min(4).regex(userNameRegex),
  password: z.string().min(4).max(20),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export const feedSchema = z.object({
  content: z.string().min(1),
  image: z.string().url().nullable(),
  authorId: z.string(),
});

export const replySchema = z.object({
  image: z.string().url().nullable(),
  content: z.string().min(1),
  userId: z.string(),
  feedId: z.number(),
});

export const userSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(4).regex(userNameRegex),
  email: z.string().email(),
  avatar: z.string().url().nullable(),
  banner: z.string().url().nullable(),
  bio: z.string().nullable(),
  filterContent: z.boolean(),
});

export const editUserSchema = z.object({
  id: z.string(),
  name: z.string().min(4),
  username: z.string().min(4).regex(userNameRegex),
  avatar: z.string().url().nullable(),
  banner: z.string().url().nullable(),
  bio: z
    .string()
    .nullable()
    .refine((value) => {
      return !urlPatternRegex.test(value);
    }),
  filterContent: z.boolean(),
});
