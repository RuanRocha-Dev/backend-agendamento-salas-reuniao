import { Appointment, appointmentAttributes } from "../models/appointmentsModel.js";
import { MeetingRoom, meetingRoomAttributes } from '../models/roomsModel.js';
import { returnDefault, returnDefaultInterface } from "../utils/response.js";
import { findMettingByDate } from "../repository/appointment.js";
import { dateNow } from "../utils/response.js";

export const appointmentsService = {
    create: async (data: appointmentAttributes): Promise<returnDefaultInterface> => {
        try {
            const startTime = new Date(data.startTime);
            const endTime = new Date(data.endTime);
            const dateLimit = new Date(data.startTime);
            dateLimit.setMinutes(dateLimit.getMinutes() + 10);

            const resultRooms = await MeetingRoom.findByPk(data.idMeetingRoom);
            if(!resultRooms) {
                return returnDefault(false, 'Sala inexistente para agendamento.', null, 422);
            }

            if(startTime < dateNow) {
                return returnDefault(false, 'A data do agendamento não pode ser menor que a data atual.', null, 422);
            }

            if(endTime < dateLimit) {
                return returnDefault(false, 'A sala deve ser reservada por pelo menos 10 minutos.', null, 422);
            }
            
            if(endTime <= startTime) {
                return returnDefault(false, 'A data de inicio não pode ser menor que a data fim.', null, 422);
            }

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

            if(startTime < dateNow && endTime > dateNow) {
                return returnDefault(false, 'Não é possivel deletar um agendamento que esta em andamento.', null, 404);
            }
            
    
            return returnDefault(true, 'Agendamento deletado com sucesso.', null, 200);
            // await appointment.destroy();
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

    findByDate: async (id: number) => {
        const room = await findMettingByDate('2026-01-14 07:01:00.000');
        console.log(room)
        if (!room) throw new Error('Sala não encontrada');
        return room;
    },


    // update: async (id: number, data: Partial<meetingRoomAttributes>) => {
    //     const room = await MeetingRoom.findByPk(id);
    //     if (!room) throw new Error('Sala não encontrada');
    //     return await room.update(data);
    // },


};