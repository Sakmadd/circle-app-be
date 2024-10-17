import dotenv from 'dotenv';
dotenv.config();

export const SALT_ROUND = process.env.SALT_ROUND;
export const SECRET_SAUCE = process.env.SECRET_SAUCE;
export const MAILER_USERNAME = process.env.MAILER_USERNAME;
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD;
export const CLIENT = process.env.CLIENT;
