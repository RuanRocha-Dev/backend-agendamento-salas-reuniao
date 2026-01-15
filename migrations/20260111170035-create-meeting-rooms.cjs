'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meeting_rooms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },

      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE meeting_rooms
      ADD CONSTRAINT chk_meeting_rooms_capacity
      CHECK (capacity >= 0);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('meeting_rooms');
  }
};