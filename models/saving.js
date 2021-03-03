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
    amount: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    savingsType: DataTypes.INTEGER,
    description:DataTypes.TEXT,
    newInterestCount:DataTypes.STRING,
    timeCountBegins:DataTypes.DATE,
    savingsDuration:DataTypes.STRING,
    interest:DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Saving',
  });
  return Saving;
};