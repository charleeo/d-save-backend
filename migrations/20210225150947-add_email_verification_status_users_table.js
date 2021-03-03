'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','status',
    {
      type:Sequelize.ENUM('0','1'),
      default: 0,
      allowNull:false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','status')
  }
};
