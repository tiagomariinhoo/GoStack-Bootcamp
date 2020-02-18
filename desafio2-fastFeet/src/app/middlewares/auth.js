/**
 * Verifica se o usuário tá logado através do token de autenticação
 */

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // Tira o Bearer da String

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // Chama a função que é retornada

    // console.log(decoded);
    req.userId = decoded.id; // Dica dada anteriormente, podemos através do middleware, setar as coisas

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
