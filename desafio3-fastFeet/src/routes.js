import { Router } from 'express';

// Funciona como middleware
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.get('/', async (req, res) => { //Usa async await por conta das operações no banco de dados
//   const user = await User.create({
//     name: 'Tiago Marinho',
//     email: 'tlm@ic.ufal.br',
//     password_hash: '121316518498',
//   });
//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware global
routes.use(authMiddleware); // Utilizando o routes.use aqui só funciona para as rotas embaixo dele

/**
 * Get só para checar quem está vindo pelo token passado
 */
routes.get('/users', async (req, res) => {
  return res.json({
    id: req.userId,
    provider: req.userProvider,
  });
});

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

routes.put('/users', UserController.update);

// CRUD para os entregadores só por Admin Autenticado
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman', DeliverymanController.update);
routes.get('/deliveryman', DeliverymanController.index);
routes.delete('/deliveryman', DeliverymanController.delete);

export default routes;
