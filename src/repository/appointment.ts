import { db } from "../connection/database.js";
import { dateNow } from "../utils/response.js";

import { QueryTypes } from "sequelize";

export const findMettingByDate = async (start: Date) => {
    const sql = `SELECT DISTINCT mr.id, mr.name, mr.capacity, mr.status FROM meeting_rooms mr INNER JOIN appointments a ON a.id_meeting_room = mr.id WHERE a.start_time <= :start AND a.end_time >= :start`;

    return await db.query(sql, {
        replacements: { start },
        type: QueryTypes.SELECT
    });
}