import { Appointment, appointmentAttributes } from "../models/appointmentsModel.js";
import { MeetingRoom, meetingRoomAttributes } from '../models/roomsModel.js';
import { returnDefault, returnDefaultInterface } from "../utils/response.js";
import { findMettingByDate } from "../repository/appointment.js";
import { dateNow } from "../utils/response.js";
import { envGlobal } from "../config/env.js";

import { DateTime } from "luxon";

export const appointmentsService = {
    create: async (data: appointmentAttributes): Promise<returnDefaultInterface> => {
        try {
            const startTime = DateTime.fromFormat(data.startTime.toString(), "dd/MM/yyyy HH:mm", {zone: envGlobal.db.timezone}).toJSDate();
            const endTime = DateTime.fromFormat(data.endTime.toString(), "dd/MM/yyyy HH:mm", {zone: envGlobal.db.timezone}).toJSDate();
            const dateLimit = DateTime.fromFormat(data.startTime.toString(), "dd/MM/yyyy HH:mm", {zone: envGlobal.db.timezone}).toJSDate();
            dateLimit.setMinutes(dateLimit.getMinutes() + 10);

            const resultRooms = await MeetingRoom.findByPk(data.idMeetingRoom);
            if(!resultRooms) {
                return returnDefault(false, 'Sala inexistente para agendamento.', null, 422);
            }

            if(startTime < dateNow().toJSDate()) {
                return returnDefault(false, 'A data do agendamento não pode ser menor que a data atual.', null, 422);
            }

            if(endTime < dateLimit) {
                return returnDefault(false, 'A sala deve ser reservada por pelo menos 10 minutos.', null, 422);
            }
            
            if(endTime <= startTime) {
                return returnDefault(false, 'A data de inicio não pode ser menor que a data fim.', null, 422);
            }

            data.startTime = startTime;
            data.endTime = endTime;

            const appointment = await Appointment.create(data);
            return {
                status: true,
                message: 'Agendamente criado com sucesso.',
                data: appointment.get({ plain: true }),
                code: 201
            };

        } catch (error: any) {
            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 404);
            }

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return returnDefault(false, 'O id da sala não existe.', null, 404);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    delete: async (id: number) => {
        try {
            if(!id || !Number(id) || id <= 0) {
                return returnDefault(false, 'ID inválido.', null, 422);
            }
            
            const appointment = await Appointment.findByPk(id);
            if(!appointment) {
                return returnDefault(false, 'Nenhum agendamento encontrado para este ID.', null, 404);
            }

            const startTime = new Date(appointment.dataValues.startTime);
            const endTime = new Date(appointment.dataValues.endTime);

            if(startTime < dateNow().toJSDate() && endTime > dateNow().toJSDate()) {
                return returnDefault(false, 'Não é possivel deletar um agendamento que esta em andamento.', null, 404);
            }
            
    
            await appointment.destroy();
            return returnDefault(true, 'Agendamento deletado com sucesso.', null, 200);
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 404);
            }

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return returnDefault(false, 'O id da sala não existe.', null, 404);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    findAll: async () => {
        const result = await Appointment.findAll();

        if(result) {
            return returnDefault(true, '', result, 200);
        }
        
        return returnDefault(false, 'Nenhum agendamento encontrado.', null, 404);
    },

    findByDate: async (date: string) => {
        const appointments = await findMettingByDate(date);
        if(appointments) {
            return returnDefault(true, '', appointments, 200);
        }

        return returnDefault(false, 'Nenhum agendamento encontrado para este horário', null, 404);
    },
};