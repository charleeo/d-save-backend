'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('savings', 'newInterestCount', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('savings','timeCountBegins',{
        type:Sequelize.DATE(),
        allowNull:true
      }),
    ])
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('savings', 'newInterestCount'),
      queryInterface.removeColumn('savings', 'timeCountBegins'),
       
    ]);
  },
};
