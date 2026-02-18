import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const dashboardRouter = Router();

dashboardRouter.get('/kpi', authMiddleware, dashboardController.kpi);
