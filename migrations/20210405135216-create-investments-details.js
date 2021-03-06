'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvestmentsDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerEmail:{
        type:Sequelize.STRING
      },
      customerName:{
        type:Sequelize.STRING
      },
      investmentAmount:{
        type: Sequelize.DOUBLE
      },
      investmentCategory:{
        type: Sequelize.INTEGER
      },
      interestRate:{type:Sequelize.STRING},
      expectedInterest:{type:Sequelize.STRING},
      actualInterest:{type:Sequelize.STRING},
      liquidatedDate:{type:Sequelize.STRING},
      liquidationPeriod:{
        type:Sequelize.STRING,
        allowNull:true
      },
      investmentDuration: {
        type: Sequelize.DATE
      },
      transactionReference:{type:Sequelize.STRING},
      transactionHash:{type:Sequelize.STRING},
      settlementAmount:{type:Sequelize.DOUBLE},
      paidOn:{type:Sequelize.STRING},
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
    await queryInterface.dropTable('InvestmentsDetails');
  }
};