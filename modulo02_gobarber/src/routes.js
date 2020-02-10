// Não importa o express inteiro, apenas o Router
// const { Router } = require('express');
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({
    message: 'Hello World',
  });
});

// module.exports = routes;
export default routes;
