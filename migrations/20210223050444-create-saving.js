'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Savings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING,
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER
      },
      savingsType: {
        type: Sequelize.INTEGER
      },
      savingsDuration: {
        type: Sequelize.STRING,
        allowNull:true
      },

      interest: {
        type: Sequelize.DOUBLE
      },

      description: {
        type: Sequelize.TEXT,
        allowNull:true
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
    await queryInterface.dropTable('Savings');
  }
};