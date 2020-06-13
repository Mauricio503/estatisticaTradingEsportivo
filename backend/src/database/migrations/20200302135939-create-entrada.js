'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('entrada', {
           id: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               allowNull: false,
            },
            times: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            oddsIniciais: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

        });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('entrada');
  }
};
