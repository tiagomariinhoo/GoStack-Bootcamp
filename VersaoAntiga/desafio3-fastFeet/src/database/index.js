/**
 * Inicia a conexão com o banco de dados
 * e carrega todos os models da aplicação
 */

import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Parcel from '../app/models/Parcel';
import DeliveryProblems from '../app/models/DeliveryProblems';

const models = [User, Recipients, Deliveryman, File, Parcel, DeliveryProblems];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
