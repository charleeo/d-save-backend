'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Savings', 'transactionHash', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Savings','settlementAmount',{
        type:Sequelize.STRING,
        allowNull:true
      }),
  
      queryInterface.addColumn('Savings','transactionReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Savings','paidOn',{
        type:Sequelize.STRING,
        allowNull:true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Savings', 'transactionHash'),
      queryInterface.removeColumn('Savings', 'transactionReference'),
      queryInterface.removeColumn('Savings', 'paidOn'),
      queryInterface.removeColumn('Savings', 'settlementAmount'),   
    ]);
  },
};
