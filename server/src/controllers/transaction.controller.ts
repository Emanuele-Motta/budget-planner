import { Response } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthedRequest } from '../middleware/auth.middleware.js';
import { transactionRepository } from '../repositories/transaction.repository.js';

export const transactionController = {
  async list(req: AuthedRequest, res: Response) {
    const data = await transactionRepository.listByUser(req.user!.userId);
    res.json(data);
  },

  async create(req: AuthedRequest, res: Response) {
    const userId = req.user!.userId;
    const tx = await transactionRepository.create({
      ...req.body,
      userId,
      date: new Date(req.body.date)
    });

    const multiplier = tx.type === 'INCOME' ? 1 : -1;
    await prisma.account.update({
      where: { id: tx.accountId },
      data: { balance: { increment: multiplier * Number(tx.amount) } }
    });

    res.status(201).json(tx);
  }
};
