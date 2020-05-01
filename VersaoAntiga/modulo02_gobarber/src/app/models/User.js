import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/**
 * Model: classe pai
 */
class User extends Model {
  static init(sequelize) {
    super.init(
      {// Mada as colunas que terão na base de dados, evita Primary Key, upd, create_at
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Campo virtual não tem na base de dados, só no lado do código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /**
     *  O BeforeSave, antes do usuário ser salvo no banco de dados
     *  o trecho de código é executado de forma automática
     */
    this.addHook('beforeSave', async user => {
      // user.name = 'Tiago' se fizer isso o nome de todos os usuários são Tiago, já que vai executar isso antes de salvar
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); // Hooks são trechos de códigos executados de forma automática

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
