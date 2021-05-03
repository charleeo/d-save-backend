'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WithdrawalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WithdrawalHistory.init({
    userEmail: DataTypes.STRING,
    amount:DataTypes.DOUBLE, 
    reference:DataTypes.STRING,
    narration:DataTypes.STRING,
    currency:DataTypes.STRING, 
    fee:DataTypes.STRING, 
    status:DataTypes.STRING, 
    transactionDescription:DataTypes.STRING, 
    transactionReference:DataTypes.STRING,
    destinationBankCode:DataTypes.STRING, 
    destinationAccountNumber:DataTypes.STRING, 
    destinationAccountName:DataTypes.STRING,
    destinationBankName:DataTypes.STRING,
    createdOn:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WithdrawalHistory',
  });
  return WithdrawalHistory;
};