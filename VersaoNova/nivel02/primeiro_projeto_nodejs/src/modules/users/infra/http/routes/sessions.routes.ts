import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import SessionsController from '../controllers/SessionsController';

/**
 * Criar uma sessão na aplicação
 */

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);


export default sessionsRouter;
