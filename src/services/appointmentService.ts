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
            const startTime = DateTime.fromISO(data.startTime.toString(), {zone: envGlobal.db.timezone}).minus({ hours: 3 }).toJSDate();
            const endTime = DateTime.fromISO(data.endTime.toString(), {zone: envGlobal.db.timezone}).minus({ hours: 3 }).toJSDate();
            const dateLimit = DateTime.fromISO(data.startTime.toString(), {zone: envGlobal.db.timezone}).minus({ hours: 3 }).toJSDate();
            dateLimit.setMinutes(dateLimit.getMinutes() + 10);

            const resultRooms = await MeetingRoom.findByPk(data.idMeetingRoom);
            if(!resultRooms) {
                return returnDefault(false, 'Sala inexistente para agendamento.', null, 422);
            }

            if(startTime < dateNow().minus({ hours: 3 }).toJSDate()) {
                return returnDefault(false, 'A data do agendamento não pode ser menor que a data atual.', null, 422);
            }

            if(endTime < dateLimit) {
                return returnDefault(false, 'A sala deve ser reservada por pelo menos 10 minutos.', null, 422);
            }
            
            if(endTime <= startTime) {
                return returnDefault(false, 'A data de inicio não pode ser menor que a data fim.', null, 422);
            }

            let aapointmentFuture = false;
            const appointments = await findMettingByDate(startTime);
            if(appointments) {
                appointments.forEach((el: any) => {
                    if(el.id == data.idMeetingRoom) {
                        aapointmentFuture = true;
                    }
                })
            }

            if(aapointmentFuture) {
                return returnDefault(false, 'Já existe um agendamento para esse horário.', null, 422);
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
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 409);
            }

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return returnDefault(false, 'O id da sala não existe.', null, 409);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    delete: async (id: number) => {
        try {
            if(!id || !Number(id) || id <= 0) {
                return returnDefault(false, 'ID inválido.', null, 409);
            }
            
            const appointment = await Appointment.findByPk(id);
            if(!appointment) {
                return returnDefault(false, 'Nenhum agendamento encontrado para este ID.', null, 409);
            }

            const startTime = new Date(appointment.dataValues.startTime);
            const endTime = new Date(appointment.dataValues.endTime);

            if(startTime < dateNow().toJSDate() && endTime > dateNow().toJSDate()) {
                return returnDefault(false, 'Não é possivel deletar um agendamento que esta em andamento.', null, 422);
            }
            
    
            await appointment.destroy();
            return returnDefault(true, 'Agendamento deletado com sucesso.', null, 200);
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 422);
            }

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return returnDefault(false, 'O id da sala não existe.', null, 409);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    findAll: async () => {
        const result = await Appointment.findAll();

        if(result) {
            return returnDefault(true, '', result, 200);
        }
        
        return returnDefault(false, 'Nenhum agendamento encontrado.', null, 200);
    },

    findByDate: async (date: any) => {
        const appointments = await findMettingByDate(date);
        if(appointments) {
            return returnDefault(true, '', appointments, 200);
        }

        return returnDefault(false, 'Nenhum agendamento encontrado para este horário', null, 409);
    },
};