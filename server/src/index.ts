import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { apiRouter } from './routes/index.js';

const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);
app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server avviato su porta ${env.PORT}`);
});
