import { Response } from "express";
import { DateTime } from "luxon";

export interface sendReponseInterface {
    res: Response, 
    sucess: boolean, 
    message: string, 
    data: any | null, 
    error: string | boolean, 
    status: number
}

export const sendResponse = (res: Response, sucess: boolean, message: string, data: any | null, status: number)  => {
    return res.status(status).json({ // Centraliza todo o retorno das rotas, retornando sempre com esse padrão
        "success": sucess,
        "message": message,
        "data": data,
    });
}

export interface returnDefaultInterface {
    status: boolean, 
    message: string, 
    data: any, 
    code: number
}

export const returnDefault = (status: boolean, message: string, data: any | null, code: number)  => {
    // Essa função é bem parecida com a de cima, essa nada mais é que um return padrão, para que nunca seja enviado algo diferente desse formato para a controller
    return {
        "status": status,
        "message": message,
        "data": data,
        "code": code
    };
}

export const dateNow = (date?: any): DateTime => {
    if(date) {
        return DateTime.fromFormat(date.toString(), "dd/MM/yyyy HH:mm", {zone: 'America/Sao_Paulo'});
    }
    return DateTime.now().setZone('America/Sao_Paulo');
}