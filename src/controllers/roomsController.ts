import { Request, Response } from 'express';

import { meetingRoomService } from '../services/roomsService.js';
import { sendResponse } from '../utils/response.js';


export const roomsController = () => ({

  create: async (req: Request, res: Response) => {
    const { name, capacity } = req.body;

    const result = await meetingRoomService.create({name, capacity});
    if(result?.status !== false) {
      return sendResponse(res, true, result.message, result?.data, result.code);
    }
    
    return sendResponse(res, false, result.message, null, result.code);
  },

  findAll: async (req: Request, res: Response) => {
    const result = await meetingRoomService.findAll();
    if(result && result?.data) {
      return sendResponse(res, true, "", result?.data, result.code);
    }

    return sendResponse(res, false, result.message, null, result.code);
  },

  findById: async (req: Request, res: Response) => {
    const id = Number(req?.query?.id);

    if(!req?.query?.id) {
      return sendResponse(res, false, "Parametro ID obrigatório", null, 400);
    }

    if(!id) {
      return sendResponse(res, false, "O ID deve conter apenas numeros", null, 400);
    }

    if(id <= 0) {
      return sendResponse(res, false, "O ID não poder ser 0 ou um número negativo", null, 400);
    }

    const result = await meetingRoomService.findById(id);
    if(result && result?.data) {
      return sendResponse(res, true, "", result?.data, result.code);
    }

    return sendResponse(res, false, result.message, null, result.code);
  },

  update: async (req: Request, res: Response) => {
    const id: number = req?.body?.id;
    const name: string = req?.body?.name;
    const capacity: number = req?.body?.capacity;

    const result = await meetingRoomService.update(id, {name, capacity});
    if(result.status) {
      return sendResponse(res, true, result.message, null, result.code);
    }

    return sendResponse(res, false, result.message, null, result.code);
  },

  delete: async (req: Request, res: Response) => {
    const id: number = req?.body?.id;

    const result = await meetingRoomService.delete(id);
    if(result.status) {
      return sendResponse(res, true, result.message, null, result.code);
    }

    return sendResponse(res, false, result.message, null, result.code);
  } 
});