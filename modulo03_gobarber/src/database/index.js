/**
 *  Nesse arquivo será iniciada a conexão com o banco de dados
 *  e carregará todos os models da aplicação
 */

import Sequelize from 'sequelize'; // Responsável por fazer a conexão com o banco

import databaseConfig from '../config/database'; // Importa a configuração com o banco de dados

import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  // Fará a conexão
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection)) // Percorre cada um dentro do array
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
