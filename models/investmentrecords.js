'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvestmentRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  };
  InvestmentRecords.init({
    userEmail: DataTypes.STRING,
    deposits: DataTypes.DOUBLE,
    withdrawals: DataTypes.DOUBLE,
    balance: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'InvestmentRecords',
  });
  return InvestmentRecords;
};