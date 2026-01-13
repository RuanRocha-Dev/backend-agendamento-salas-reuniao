import { Request, Response, NextFunction} from "express";
import { sendResponse } from "../utils/response.js";

export const createRoomValidation = (req: Request, res: Response, next: NextFunction) => {
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

export const updateRoomValidation = (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.body?.id;
    const name: string = req.body?.name;
    const capacity: number = req.body?.capacity;

    if (!name || !capacity || !id) {
        return sendResponse(res, false, "Falha ao editar sala.", null, "Todos os campos são obrigatórios", 400);
    }
    
    if(name.length > 100) {
        return sendResponse(res, false, "Falha ao editar sala.", null, "O campo nome deve conter no máximo 100 caracteres.", 400);
    }

    next();
}

export const appointMentsValidation = (req: Request, res: Response, next: NextFunction) => {
    const { startTime, endTime, idMeetingRoom, description } = req.body;

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
    
    if (description.length > 100) {
        return sendResponse(res, false, "Falha ao criar agendamento.", null, "Campo descrição não pode ter mais de 100 caracteres", 400);
    }

    next();
}