import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';

export interface AuthedRequest extends Request {
  user?: { userId: string; email: string };
}

export const authMiddleware = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token mancante' });

  try {
    req.user = verifyAccessToken(token) as { userId: string; email: string };
    return next();
  } catch {
    return res.status(401).json({ message: 'Token non valido' });
  }
};
