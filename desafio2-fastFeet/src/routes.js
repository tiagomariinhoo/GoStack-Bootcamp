import { Router } from 'express';

// Funciona como middleware
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

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

routes.get('/users', async (req, res) => {
  return res.json({ message: 'teste' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware global
routes.use(authMiddleware); // Utilizando o routes.use aqui só funciona para as rotas embaixo dele

routes.put('/users', UserController.update);
// module.exports = routes;
export default routes;

