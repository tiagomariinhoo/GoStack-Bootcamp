/**
 * Onde configura o servidor express
 */

// const express = require('express');
// const routes = require('./routes'); //Importa as rotas de outro arquivo

/**
 * Com o sucrase podemos usar a sintaxe import from
 */

import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    //  Com isso é possível fazer this.server.get...
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    //  Com isso a aplicação já está pronta para requisições no formato json
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    //  As rotas neste caso funcionam como middlewares
    this.server.use(routes);
  }
}

//  O .server é porque a única coisa que pode ser acessada de fora, é o server
// module.exports = new App().server;
export default new App().server;
