import express from 'express';
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
  }

  routes() {
    //  As rotas neste caso funcionam como middlewares
    this.server.use(routes);
  }
}

//  O .server é porque a única coisa que pode ser acessada de fora, é o server
// module.exports = new App().server;
export default new App().server;
