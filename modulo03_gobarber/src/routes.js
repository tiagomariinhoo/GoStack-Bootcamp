// Não importa o express inteiro, apenas o Router
// const { Router } = require('express');
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Funciona como middleware
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);
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

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

// module.exports = routes;
export default routes;
