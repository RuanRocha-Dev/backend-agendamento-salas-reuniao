import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('appointments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },

    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },

    id_meeting_room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meeting_rooms',
        key: 'id'
      },
      onUpdate: 'CASCADE', // Criando com cascata, para se caso um sala seja removida, os seus agendamentos passados tambem sejam
      onDelete: 'RESTRICT'
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('appointments');
}
