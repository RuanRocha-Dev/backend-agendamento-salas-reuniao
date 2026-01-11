import { Request, Response } from 'express';

import { appointmentsService } from '../services/appointmentService.js';
import { sendResponse } from '../utils/response.js';


export const appointmentsController = () => ({

  create: async (req: Request, res: Response) => {
    const { startTime, endTime, idMeetingRoom } = req.body;

    const result = await appointmentsService.create({startTime, endTime, idMeetingRoom});
    if(result?.status !== false) {
      return sendResponse(res, true, "cadastro realizado com sucesso.", result.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, "Erro ao criar agendamento", result.message, false, result.code);
  }
});