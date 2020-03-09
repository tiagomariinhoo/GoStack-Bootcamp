/**
 * Inicia a conexão com o banco de dados
 * e carrega todos os models da aplicação
 */

import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';

const models = [User, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
