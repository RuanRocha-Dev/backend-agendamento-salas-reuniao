import { Request, Response, NextFunction} from "express";
import { sendResponse, dateNow } from "../utils/response.js";

export const createRoomValidation = (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body?.name;
    const capacity: number = req.body?.capacity;

    if (!name || !capacity) {
        return sendResponse(res, false, "Todos os campos são obrigatórios", null, 400);
    }
    
    if(name.length > 100) {
        return sendResponse(res, false, "O campo nome deve conter no máximo 100 caracteres.", null, 400);
    }

    next();
}

export const updateRoomValidation = (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.body?.id;
    const name: string = req.body?.name;
    const capacity: number = req.body?.capacity;

    if (!name || !capacity || !id) {
        return sendResponse(res, false, "Todos os campos são obrigatórios", null, 400);
    }
    
    if(name.length > 100) {
        return sendResponse(res, false, "O campo nome deve conter no máximo 100 caracteres.", null, 400);
    }

    next();
}

export const appointMentsValidation = (req: Request, res: Response, next: NextFunction) => {
    const { startTime, endTime, idMeetingRoom, description } = req.body;

    if (!startTime || !endTime || !idMeetingRoom) {
        return sendResponse(res, false, "Todos os campos são obrigatórios", null, 400);
    }

    if (isNaN(Number(idMeetingRoom))) {
        return sendResponse(res, false, "O campo idMeetingRoom deve ser um número", null, 400);
    }

    const start = dateNow(startTime);
    const end = dateNow(endTime);

    if (!start.isValid || !end.isValid) {
        return sendResponse(res, false, "As datas enviadas são inválidas", null, 400);
    }
    
    if (description.length > 100) {
        return sendResponse(res, false, "Campo descrição não pode ter mais de 100 caracteres", null, 400);
    }

    next();
}