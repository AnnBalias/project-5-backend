import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { authRouter } from './routers/auth.js';
import { usersRouter } from './routers/users.js';
import { categoriesRouter } from './routers/categories.js';
import { transactionsRouter } from './routers/transactions.js';
import { summaryRouter } from './routers/summary.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  const origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://spendy-mu36.onrender.com',
    'https://project-5-frontend-pink.vercel.app',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(logger);

  app.use('/api-docs', swaggerDocs());

  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use('/transactions', transactionsRouter);
  app.use('/summary', summaryRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
