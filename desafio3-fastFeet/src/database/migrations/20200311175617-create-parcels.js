// https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
// Exemplo de associação entre tabelas

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parcels', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'deliverymans',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('parcels');
  },
};
