'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('savings','status',{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:true
    })
  },


  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('savings', 'status'),
    ]);
  },
};
