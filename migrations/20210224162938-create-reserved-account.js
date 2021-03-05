'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reserved_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountReference: {
        type: Sequelize.STRING
      },
      currencyCode: {
        type: Sequelize.STRING
      },
      contractCode: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      customerBvn: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reserved_accounts');
  }
};