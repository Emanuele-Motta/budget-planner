import { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createTransactionSchema } from '../validators/transaction.validator.js';

export const transactionsRouter = Router();

transactionsRouter.get('/', authMiddleware, transactionController.list);
transactionsRouter.post('/', authMiddleware, validate(createTransactionSchema), transactionController.create);
