'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class onlinePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  onlinePayment.init({
    paymentReference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'onlinePayment',
  });
  return onlinePayment;
};