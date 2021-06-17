'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('saving', 'transactionHash', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('saving','settlementAmount',{
        type:Sequelize.STRING,
        allowNull:true
      }),
  
      queryInterface.addColumn('saving','transactionReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('saving','paidOn',{
        type:Sequelize.STRING,
        allowNull:true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('savings', 'transactionHash'),
      queryInterface.removeColumn('savings', 'transactionReference'),
      queryInterface.removeColumn('savings', 'paidOn'),
      queryInterface.removeColumn('savings', 'settlementAmount'),   
    ]);
  },
};
