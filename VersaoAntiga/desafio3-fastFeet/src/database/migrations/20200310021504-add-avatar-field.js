module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'deliverymans', // Qual tabela que eu quero adicionar coluna
      'avatar_id', // Nome da coluna
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'avatar_id');
  },
};
