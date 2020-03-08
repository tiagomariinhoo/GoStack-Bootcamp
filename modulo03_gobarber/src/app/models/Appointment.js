import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

// SubHours remove x hroas da data
class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            // São os agendamentos que ainda podem ser cancelados
            // Ou seja, que ainda tem mais de duas horas para acontecer
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
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
