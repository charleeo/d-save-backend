'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('savings', 'transactionHash', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('savings','settlementAmount',{
        type:Sequelize.STRING,
        allowNull:true
      }),
  
      queryInterface.addColumn('savings','transactionReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('savings','paidOn',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('savings','transactionReference',{
        type:Sequelize.STRING,
        allowNull:true
      })
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('savings', 'transactionHash'),
      queryInterface.removeColumn('savings', 'transactionReference'),
      queryInterface.removeColumn('savings', 'paidOn'),
      queryInterface.removeColumn('savings', 'settlementAmount'),
      queryInterface.removeColumn('savings', 'transactionReference'),
      
    ]);
  },
};
