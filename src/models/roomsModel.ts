import { DataTypes, Model } from 'sequelize';
import { db } from '../connection/database.js';

export interface meetingRoomAttributes {
  id?: number;
  name: string;
  capacity: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const MeetingRoom = db.define<Model<meetingRoomAttributes>>(
  'MeetingRoom',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'meeting_rooms',
    underscored: true,
    timestamps: true,
  }
);

export default MeetingRoom;