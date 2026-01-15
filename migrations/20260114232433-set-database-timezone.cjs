'use strict';

module.exports = { // migration apenas mudar o timezone do banco, evitando conflito de datas
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER DATABASE ' + queryInterface.sequelize.config.database + ' SET timezone TO "America/Sao_Paulo";');
  }
};