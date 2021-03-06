import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// Funciona como middleware
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import ParcelController from './app/controllers/ParcelController';
import PickupController from './app/controllers/PickupController';
import DeliverController from './app/controllers/DeliverController';
import ParcelDeliveredController from './app/controllers/ParcelDeliveredController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

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

routes.get('/deliverymans/:id', DeliverymanController.index);
routes.get('/deliverymans/:id/deliveries', ParcelDeliveredController.index);

// Retirada e entrega do parcel
routes.put('/pickup/:id', PickupController.update);
routes.put('/deliver/:id', upload.single('file'), DeliverController.update);

routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.get('/delivery/:id/problems', DeliveryProblemsController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemsController.delete);

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

routes.post('/files', upload.single('file'), FileController.store);

// CRUD para os entregadores só por Admin Autenticado
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans', DeliverymanController.update);
routes.delete('/deliverymans', DeliverymanController.delete);

// CRUD para a gestão de encomendas
routes.post('/parcels', ParcelController.store);
routes.put('/parcels/:id', ParcelController.update);
routes.get('/parcels', ParcelController.index);
routes.delete('/parcels/:id', ParcelController.delete);

export default routes;
