import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // Método chamado automaticamente pelo load dos models
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' }); // Dois relacionamentos com a mesma tabela
    // Como temos dois relacionamentos, é necessário nesse caso, utilizar o 'as' para que o Sequelize não se perca
  }
}

export default Appointment;
