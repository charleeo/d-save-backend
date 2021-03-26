'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cutomerEmail:{
        type:Sequelize.STRING
      },
      cutomerName:{
        type:Sequelize.STRING
      },
      investmentAmount:{
        type: Sequelize.DOUBLE
      },
      investmentCategory:{
        type: Sequelize.INTEGER
      },
      liquidationDate:{
        type:Sequelize.DATE,
        allowNull:true
      },
      investmentDuration: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Investments');
  }
};