'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepositHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DepositHistory.init({
    transactionReference : DataTypes.STRING ,
    paymentReference : DataTypes.STRING,
    amountPaid : DataTypes.DOUBLE,
    totalPayable : DataTypes.DOUBLE,
    settlementAmount : DataTypes.DOUBLE,
    paidOn : DataTypes.STRING,
    paymentStatus : DataTypes.STRING,
    paymentDescription : DataTypes.STRING,
    currency : DataTypes.STRING,
    paymentMethod : DataTypes.STRING, 
    product:DataTypes.STRING,
    cardDetails:DataTypes.TEXT,
    accountDetails:DataTypes.TEXT,
    accountPayments:DataTypes.TEXT,
    customerEmail:DataTypes.STRING,
    customerName:DataTypes.STRING,
    transactionHash: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DepositHistory',
  });
  return DepositHistory;
};