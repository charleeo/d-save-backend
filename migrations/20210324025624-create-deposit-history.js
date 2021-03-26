'use strict';

// const { STRING } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DepositHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionReference : {type:Sequelize.STRING },
      paymentReference : {type:Sequelize.STRING},
      amountPaid : {type:Sequelize.DOUBLE},
      totalPayable : {type:Sequelize.DOUBLE},
      settlementAmount : {type:Sequelize.DOUBLE},
      paidOn : {type:Sequelize.STRING},
      paymentStatus : {type:Sequelize.STRING},
      paymentDescription : {type:Sequelize.STRING},
      currency : {type:Sequelize.STRING},
      paymentMethod : {type:Sequelize.STRING}, 
      transactionHash: { type: Sequelize.TEXT },
      product:{type:Sequelize.STRING},
      cardDetails:{type:Sequelize.TEXT},
      accountDetails:{type:Sequelize.TEXT},
      accountPayments:{type:Sequelize.TEXT},
      customerEmail:{type:Sequelize.STRING},
      customerName:{type:Sequelize.STRING},
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
    await queryInterface.dropTable('DepositHistories');
  }
};