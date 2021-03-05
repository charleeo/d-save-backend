'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('reserved_accounts', 'bankName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('reserved_accounts','accountNumber ',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('reserved_accounts','bankCode',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('reserved_accounts','collectionChannel',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('reserved_accounts','reservationReference',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('reserved_accounts','status',{
        type:Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('reserved_accounts','accountName',{
        type:Sequelize.STRING,
        allowNull:true
      })
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('reserved_accounts', 'bankName'),
      queryInterface.removeColumn('reserved_accounts', 'accountName'),
      queryInterface.removeColumn('reserved_accounts', 'status'),
      queryInterface.removeColumn('reserved_accounts', 'accountNumber'),
      queryInterface.removeColumn('reserved_accounts', 'bankCode'),
      queryInterface.removeColumn('reserved_accounts', 'collectionChannel'),
      queryInterface.removeColumn('reserved_accounts', 'reservationReference'),
      
    ]);
  },
};
