/**
 * Onde configura o servidor express
 */

// const express = require('express');
// const routes = require('./routes'); //Importa as rotas de outro arquivo

/**
 * Com o sucrase podemos usar a sintaxe import from
 */
import 'dotenv/config';
// Coloca dentro do process.env

import express from 'express';
import 'express-async-errors';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import routes from './routes';

import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    //  Com isso é possível fazer this.server.get...
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    //  Com isso a aplicação já está pronta para requisições no formato json
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    //  As rotas neste caso funcionam como middlewares
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Importante pesquisar as melhores maneiras
   * de tratamento de erro na Api Rest
   */
  exceptionHandler() {
    // Middleware de tratamento de exceção
    // O express sabe que quando é um middleware de 4 parametros
    // é pra tratamento de erro
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        // Youch é pra ter uma melhor visualização dos erros
        const errors = await new Youch(err, req).toJSON();

        // Agora pra não ficar dando loop infinito caso tenha algo errado no código
        // Tem uma visualização melhor do tratamento de erro
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

//  O .server é porque a única coisa que pode ser acessada de fora, é o server
// module.exports = new App().server;
export default new App().server;
