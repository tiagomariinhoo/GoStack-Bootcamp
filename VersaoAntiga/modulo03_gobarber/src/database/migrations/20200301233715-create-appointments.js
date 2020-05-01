module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user_id: {
        // Relacionamento com o usuário
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Mesmo que o usuário delete sua conta é interessante preservar o histórico
        allowNull: true,
      },
      provider_id: {
        // Relacionamento com o usuário
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Mesmo que o usuário delete sua conta é interessante preservar o histórico
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true, // pode ser nulo já que o agendamento pode não ser cancelado
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
    return queryInterface.dropTable('appointments');
  },
};
