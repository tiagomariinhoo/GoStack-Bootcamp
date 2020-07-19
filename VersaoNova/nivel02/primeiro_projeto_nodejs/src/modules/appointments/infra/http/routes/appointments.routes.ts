import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
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

 appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
