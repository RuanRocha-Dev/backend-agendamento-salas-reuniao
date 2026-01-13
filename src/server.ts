import express from 'express';
import { db } from './connection/database.js';
import { envGlobal } from './config/env.js';
import roomsRouter from './routes/rooms.js';
import appointMentRouter from './routes/appointments.js'
import cors from 'cors';

const app = express();
const PORT = envGlobal.app.port;

app.use(cors());
app.use(express.json());
app.use('/api/room', roomsRouter)
app.use('/api/appointment', appointMentRouter)

async function startServer() {
    try {
        await db.authenticate();
        app.listen(PORT, () => {
        console.log(`rodando na: ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar:', error);
        process.exit(1);
    }
}

startServer();