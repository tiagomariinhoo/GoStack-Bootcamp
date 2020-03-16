module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'deliverymans', // Qual tabela que eu quero adicionar coluna
      'last_pickup_date', // Nome da coluna
      {
        type: Sequelize.DATE,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'last_pickup_date');
  },
};
