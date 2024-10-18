import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_SAUCE } from '../configs/config';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token: string = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'gabole wlee' });
    return;
  }

  jwt.verify(token, SECRET_SAUCE, (error, user) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.locals.user = user;
    next();
  });
}
