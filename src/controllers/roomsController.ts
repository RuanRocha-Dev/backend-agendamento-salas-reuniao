import { Request, Response } from 'express';

import { meetingRoomService } from '../services/roomsService.js';
import { sendResponse } from '../utils/response.js';


export const roomsController = () => ({

  create: async (req: Request, res: Response) => {
    const { name, capacity } = req.body;

    const result = await meetingRoomService.create({name, capacity});
    if(result?.status !== false) {
      return sendResponse(res, true, "cadastro realizado com sucesso.", result.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, "Erro ao cadastrar sala", result.message, false, result.code);
  }
});