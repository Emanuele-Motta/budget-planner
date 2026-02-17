import OpenAI from 'openai';
import { env } from '../config/env.js';
import { AIProvider } from './ai.provider.js';

export class OpenAIProvider implements AIProvider {
  private client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

  async ask(prompt: string): Promise<string> {
    if (!this.client) return 'OpenAI non configurato. Imposta OPENAI_API_KEY.';
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'Sei un assistente finanziario.' }, { role: 'user', content: prompt }]
    });
    return completion.choices[0]?.message?.content ?? 'Nessuna risposta disponibile';
  }
}
