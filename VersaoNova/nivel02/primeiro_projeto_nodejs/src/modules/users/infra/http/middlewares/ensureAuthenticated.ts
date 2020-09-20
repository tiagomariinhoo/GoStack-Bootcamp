import { Request, Response, NextFunction, request } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer esijeasie
  const [, token] = authHeader.split(' ');

  console.log(authHeader);
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,

    };

    return next();
  } catch(err) {
   throw new AppError('Invalid JWT Token', 401);
  }
}
