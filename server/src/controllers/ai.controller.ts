import { Response } from 'express';
import { AuthedRequest } from '../middleware/auth.middleware.js';
import { aiService } from '../services/ai.service.js';

export const aiController = {
  async analyze(req: AuthedRequest, res: Response) {
    const insight = await aiService.analyze(req.user!.userId);
    res.json(insight);
  },

  async chat(req: AuthedRequest, res: Response) {
    const answer = await aiService.chat(req.user!.userId, req.body.question);
    res.json(answer);
  }
};
