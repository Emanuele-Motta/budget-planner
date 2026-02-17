import { Router } from 'express';
import { aiRouter } from './ai.routes.js';
import { authRouter } from './auth.routes.js';
import { dashboardRouter } from './dashboard.routes.js';
import { transactionsRouter } from './transactions.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/transactions', transactionsRouter);
apiRouter.use('/ai', aiRouter);
