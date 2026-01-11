import { envGlobal } from '../config/env.js';
import { Sequelize } from 'sequelize';

const { name, user, password, host, port, timezone } = envGlobal.db;

export const db = new Sequelize(
    name,
    user,
    password,
    {
        host: host,
        port: Number(port),
        dialect: 'postgres',
        timezone: timezone,

        define: {
            underscored: true,
            timestamps: false
        }
    }
);
