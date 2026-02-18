import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ id: user.id, email: user.email, fullName: user.fullName });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const tokens = await authService.refresh(req.body.refreshToken);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }
};
