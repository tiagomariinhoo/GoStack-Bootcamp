import { Router } from 'express';
const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';

/**
 * Criar uma sessão na aplicação
 */

 sessionsRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    return res.json({
      user,
      token
    });
});

export default sessionsRouter;
