import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController()
// localhost:3333/appointments...
// O tipo dela é uma array de Appointment

/**
 * A rota só deve:
 * Receber a requisição
 * Chamar outro arquivo
 * Devolver uma resposta
 *
 * Quando se trabalha com algum método do banco de dados
 * é interessante sempre deixar o async / await
 */

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
 appointmentsRouter.get('/me', providerAppointmentsController.index);


/**
 * Usa o MongoDB
 * Quando tem uma larga escala de dado, muita edição
 * e pouco relacionamento entre os dados
 * Na Rocket por exemplo acontece de:
 *  Um aluno assiste 10% do video X
 *  E assiste tb 15% do video Y
 * São muitas operações de entrada
 * Então é só jogar todos os dados no Mongo e ele vai
 * adaptando sozinho, dependendo do Relacional como o Postgres
 *
 * Redis utiliza para informações temporais
 */

export default appointmentsRouter;
