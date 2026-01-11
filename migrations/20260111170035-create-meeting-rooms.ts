import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('meeting_rooms', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE meeting_rooms
    ADD CONSTRAINT chk_meeting_rooms_capacity
    CHECK (capacity >= 0);
  `);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('meeting_rooms');
}
