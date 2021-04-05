'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saving extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Saving.init({
      investmentDuration: DataTypes.DATE,
      interestRate:DataTypes.STRING,
      expectedInterest:DataTypes.STRING,
      actualInterest:DataTypes.STRING,
      liquidatedDate:DataTypes.DATE,
      liquidationPeriod: DataTypes.STRING,
      cutomerEmail:DataTypes.STRING,
      cutomerName:DataTypes.STRING,
      investmentAmount:DataTypes.DOUBLE,
      investmentCategory:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Saving',
  });
  return Saving;
};