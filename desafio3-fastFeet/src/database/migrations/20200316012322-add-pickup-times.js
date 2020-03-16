module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'deliverymans', // Qual tabela que eu quero adicionar coluna
      'pickup_times', // Nome da coluna
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'pickup_times');
  },
};
