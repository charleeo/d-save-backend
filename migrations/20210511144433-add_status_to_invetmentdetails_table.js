'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('InvestmentsDetails','status',{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:true
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('InvestmentsDetails','status');
  }
};
