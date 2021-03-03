'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'token', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users','tokenAge',{
        type:Sequelize.DATE(),
        allowNull:true
      }),
    ])
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'token'),
      queryInterface.removeColumn('Users', 'tokenAge'),
       
    ]);
  },
};
