import { Request, Response } from 'express';

import { appointmentsService } from '../services/appointmentService.js';
import { sendResponse } from '../utils/response.js';


export const appointmentsController = () => ({

  findAll: async (req: Request, res: Response) => {
    const result = await appointmentsService.findAll();
    if(result?.status !== false) {
      return sendResponse(res, true, "", result?.data, result.code);
    }
    
    return sendResponse(res, false, "Nenhum agendamento encontrado", result.message, result.code);
  },

  findByDate: async (req: Request, res: Response) => {
    const date = req?.query?.date;

    const result = await appointmentsService.findByDate(date);
    if(result?.status !== false) {
      return sendResponse(res, true, "", result?.data, result.code);
    }
    
    return sendResponse(res, false, result.message, null, result.code);
  },

  create: async (req: Request, res: Response) => {
    const { startTime, endTime, idMeetingRoom, description } = req.body;

    const result = await appointmentsService.create({startTime, endTime, idMeetingRoom, description});
    if(result?.status !== false) {
      return sendResponse(res, true, result?.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, result.message, null, result.code);
  },

  delete: async (req: Request, res: Response) => {
    const id = req.body;

    const result = await appointmentsService.delete(id.id);
    if(result?.status !== false) {
      return sendResponse(res, true, result.message, null, result.code);
    }
    
    return sendResponse(res, false, result.message, null, result.code);
  },

  findFutureByRoomId: async (req: Request, res: Response) => {
    const idRoom = Number(req?.query?.idRoom);

    if(!req?.query?.idRoom) {
      return sendResponse(res, false, "Parametro idRoom obrigatório", null, 400);
    }

    if(!idRoom) {
      return sendResponse(res, false, "O ID deve conter apenas numeros", null, 400);
    }

    if(idRoom <= 0) {
      return sendResponse(res, false, "O ID não poder ser 0 ou um número negativo", null, 400);
    }

    const result = await appointmentsService.findFutureByRoomId(idRoom);
    if(result?.status !== false) {
      return sendResponse(res, true, result.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, result.message, null, result.code);
  }
});