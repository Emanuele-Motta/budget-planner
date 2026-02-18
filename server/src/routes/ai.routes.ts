import { Router } from 'express';
import { aiController } from '../controllers/ai.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { z } from 'zod';

export const aiRouter = Router();
const chatSchema = z.object({ question: z.string().min(2) });

aiRouter.post('/analyze', authMiddleware, aiController.analyze);
aiRouter.post('/chat', authMiddleware, validate(chatSchema), aiController.chat);
