import { prisma } from '../config/prisma.js';
import { OpenAIProvider } from './openai.provider.js';

const provider = new OpenAIProvider();

export const aiService = {
  async analyze(userId: string) {
    const txs = await prisma.transaction.findMany({ where: { userId }, take: 100, orderBy: { date: 'desc' } });
    const prompt = `Analizza queste transazioni e fornisci 3 consigli, anomalie e forecast: ${JSON.stringify(txs)}`;
    const response = await provider.ask(prompt);

    const insight = await prisma.aIInsight.create({
      data: {
        userId,
        kind: 'FORECAST',
        title: 'Analisi automatica',
        description: response
      }
    });
    return insight;
  },

  async chat(userId: string, question: string) {
    const prompt = `Utente ${userId}: ${question}`;
    const answer = await provider.ask(prompt);
    return { answer };
  }
};
