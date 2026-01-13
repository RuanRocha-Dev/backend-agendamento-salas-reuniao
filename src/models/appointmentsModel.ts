import { DataTypes, Model } from 'sequelize';
import { db } from '../connection/database.js';

export interface appointmentAttributes {
  id?: number;
  startTime: Date;
  endTime: Date;
  idMeetingRoom: number;
  createdAt?: Date;
  updatedAt?: Date;
  description?: String;
}

export const Appointment = db.define<Model<appointmentAttributes>>(
  'Appointment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_time',
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_time',
    },
    idMeetingRoom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_meeting_room',
      references: { // isso é a ligação de FK com a meeting_rooms
        model: 'meeting_rooms',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'appointments',
    underscored: true,
    timestamps: true,
  }
);

export default Appointment;