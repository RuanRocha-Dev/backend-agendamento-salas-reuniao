import { Request, Response } from 'express';

import { appointmentsService } from '../services/appointmentService.js';
import { sendResponse } from '../utils/response.js';


export const appointmentsController = () => ({

  findAll: async (req: Request, res: Response) => {
    const result = await appointmentsService.findAll();
    if(result?.status !== false) {
      return sendResponse(res, true, "", result?.data, false, result.code);
    }
    
    return sendResponse(res, false, "", result.message, true, result.code);
  },

  findByDate: async (req: Request, res: Response) => {
    const result = await appointmentsService.findByDate();
    // if(result?.status !== false) {
    //   return sendResponse(res, true, "", result?.data, false, result.code);
    // }
    
    // return sendResponse(res, false, "", result.message, true, result.code);
  },

  create: async (req: Request, res: Response) => {
    const { startTime, endTime, idMeetingRoom, description } = req.body;

    const result = await appointmentsService.create({startTime, endTime, idMeetingRoom, description});
    if(result?.status !== false) {
      return sendResponse(res, true, "cadastro realizado com sucesso.", result.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, "Erro ao criar agendamento", result.message, false, result.code);
  },

  delete: async (req: Request, res: Response) => {
    const id = req.body;

    const result = await appointmentsService.delete(id.id);
    if(result?.status !== false) {
      return sendResponse(res, true, result.message, null, false, result.code);
    }
    
    return sendResponse(res, false, result.message, null, true, result.code);
  }
});