import 'reflect-metadata';
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import {errors} from 'celebrate'
import 'express-async-errors';

import rateLimiter from './middlewares/rateLimiter'

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
// O routes nesse caso se torna um middleware
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

// Tratativa dos erros depois das rotas
app.use(errors())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
});

app.listen(3333, () => {
  console.log("Server started");
})
