/**
 * Verifica se o usuário tá logado através do token de autenticação
 */

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

/**
 * Pra checar se o usuário tá logado
 * Manda o token através do header no Bearer
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // Tira o Bearer da String

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      authConfig.secret,
      authConfig.expiresIn
    ); // Chama a função que é retornada
    // Pega os valores que vieram no payload do jwt
    req.userId = decoded.id; // Dica dada anteriormente, podemos através do middleware, setar as coisas
    req.userProvider = decoded.provider;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
