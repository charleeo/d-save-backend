'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Investments', 'transactionHash', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Investments','settlementAmount',{
        type:Sequelize.STRING,
        allowNull:true
      }),
  
      queryInterface.addColumn('Investments','transactionReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Investments','paidOn',{
        type:Sequelize.STRING,
        allowNull:true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Investments', 'transactionHash'),
      queryInterface.removeColumn('Investments', 'transactionReference'),
      queryInterface.removeColumn('Investments', 'paidOn'),
      queryInterface.removeColumn('Investments', 'settlementAmount'),      
    ]);
  },
};
