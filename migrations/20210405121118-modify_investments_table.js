'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('investments', 'transactionHash', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('investments','settlementAmount',{
        type:Sequelize.STRING,
        allowNull:true
      }),
  
      queryInterface.addColumn('investments','reservationReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('investments','paidOn',{
        type:Sequelize.STRING,
        allowNull:true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('investments', 'transactionHash'),
      queryInterface.removeColumn('investments', 'reservationReference'),
      queryInterface.removeColumn('investments', 'paidOn'),
      queryInterface.removeColumn('investments', 'settlementAmount'),      
    ]);
  },
};
