'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WithdrawalHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userEmail: {
        type: Sequelize.STRING,
      },
      amount:{type:Sequelize.DOUBLE},
      reference:{type:Sequelize.STRING},
      narration:{type:Sequelize. STRING},
      currency:{type:Sequelize. STRING}, 
      fee:{type:Sequelize. STRING}, 
      status:{type:Sequelize. STRING}, 
      transactionDescription:{type:Sequelize. STRING}, 
      transactionReference:{type:Sequelize. STRING},
      destinationBankCode:{type:Sequelize. STRING}, 
      destinationAccountNumber:{type:Sequelize. STRING}, 
      destinationAccountName:{type:Sequelize. STRING},
      destinationBankName:{type:Sequelize. STRING},
      createdOn:{type:Sequelize. STRING},
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
    await queryInterface.dropTable('WithdrawalHistories');
  }
};