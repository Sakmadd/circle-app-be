import fs from 'fs';
import mustache from 'mustache';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { MAILER_PASSWORD, MAILER_USERNAME } from '../configs/config';

// Definisikan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface sendMailParams {
  to: string;
  subject: string;
  name?: string;
  header?: string;
  footer?: string;
  CTA?: string;
  link?: string;
}

export async function sendMail(payload: sendMailParams) {
  const headerPath = path.join(__dirname, '../../public/header.jpg');
  const header = fs.readFileSync(headerPath);

  const templatePath = path.join(__dirname, '../templates/mail-template.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${MAILER_USERNAME}`,
      pass: `${MAILER_PASSWORD}`,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Circle App" <mail.ardix@gmail.com>',
      to: `${payload.to}`,
      subject: `${payload.subject}`,
      html: mustache.render(template, { payload }),
      attachments: [
        {
          filename: 'header.png',
          content: header,
          encoding: 'base64',
          cid: 'uniqueImageCID',
        },
      ],
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
