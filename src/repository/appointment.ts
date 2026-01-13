import { QueryTypes } from "sequelize";
import { db } from "../connection/database.js";

export const findMettingByDate = async (startTime: string) => {

    const start = new Date(startTime);

    const sql = `SELECT DISTINCT mr.id, mr.name, mr.capacity, mr.status FROM meeting_rooms mr INNER JOIN appointments a ON a.id_meeting_room = mr.id WHERE a.start_time < :start AND a.end_time > :start`;

    return await db.query(sql, {
        replacements: { start },
        type: QueryTypes.SELECT
    });
}