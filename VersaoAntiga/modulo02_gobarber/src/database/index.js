/**
 *  Nesse arquivo será iniciada a conexão com o banco de dados
 *  e carregará todos os models da aplicação
 */

import Sequelize from 'sequelize'; // Responsável por fazer a conexão com o banco

import databaseConfig from '../config/database'; // Importa a configuração com o banco de dados

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {  //Fará a conexão
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection)); // Percorre cada um dentro do array
  }
}

export default new Database();
