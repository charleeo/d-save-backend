'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reserved_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reserved_account.init({
    accountReference: DataTypes.STRING,
    currencyCode: DataTypes.STRING,
    contractCode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    customerBvn: DataTypes.STRING,
    accountName: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    bankName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    reservationReference: DataTypes.STRING,
    collectionChannel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reserved_account',
  });
  return reserved_account;
};