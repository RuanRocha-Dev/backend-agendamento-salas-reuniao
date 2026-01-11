import { Request, Response, NextFunction} from "express";
import { sendResponse } from "../utils/response.js";

export const roomValidation = (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body?.name;
    const capacity: number = req.body?.capacity;

    if (!name || !capacity) {
        return sendResponse(res, false, "Falha ao criar sala.", null, "Todos os campos são obrigatórios", 400);
    }
    
    if(name.length > 100) {
        return sendResponse(res, false, "Falha ao criar sala.", null, "O campo nome deve conter no máximo 100 caracteres.", 400);
    }

    next();
}

export const appointMentsValidation = (req: Request, res: Response, next: NextFunction) => {
    const { startTime, endTime, idMeetingRoom } = req.body;

    if (!startTime || !endTime || !idMeetingRoom) {
        return sendResponse(res, false, "Falha ao criar agendamento.", null, "Todos os campos são obrigatórios", 400);
    }

    if (isNaN(Number(idMeetingRoom))) {
        return sendResponse(res, false, "Falha ao criar agendamento.", null, "O campo idMeetingRoom deve ser um número", 400);
    }

    const start = Date.parse(startTime);
    const end = Date.parse(endTime);

    if (isNaN(start) || isNaN(end)) {
        return sendResponse(res, false, "Falha ao criar agendamento.", null, "As datas enviadas são inválidas", 400);
    }

    next();
}