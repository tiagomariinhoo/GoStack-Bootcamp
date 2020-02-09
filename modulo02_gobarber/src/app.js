/**
 * Onde configura o servidor express
 */

// const express = require('express');
// const routes = require('./routes'); //Importa as rotas de outro arquivo

/**
 * Com o sucrase podemos usar a sintaxe import from
 */

import express from 'express';
import routes from './routes';

 class App { 
   constructor() {
    this.server = express(); //Com isso é possível fazer this.server.get...

    this.middlewares();
    this.routes();
  }

  middlewares() {
    //Com isso a aplicação já está pronta para requisições no formato json
    this.server.use(express.json()); 
  }

  routes() {
     //As rotas neste caso funcionam como middlewares
    this.server.use(routes);
  }
 }

//O .server é porque a única coisa que pode ser acessada de fora, é o server
// module.exports = new App().server;
export default new App().server;