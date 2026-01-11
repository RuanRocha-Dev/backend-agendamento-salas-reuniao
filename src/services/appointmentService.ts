import { Appointment, appointmentAttributes } from "../models/appointmentsModel.js";
import { returnDefault, returnDefaultInterface } from "../utils/response.js";

export const appointmentsService = {
    create: async (data: appointmentAttributes): Promise<returnDefaultInterface> => {
        try {
            const endTime = new Date(data.endTime);
            const startTime = new Date(data.startTime);
            const dateLimit = startTime;
            dateLimit.setMinutes(dateLimit.getMinutes() + 10)

            if(endTime < dateLimit) {
                return returnDefault(false, 'A sala deve ser reservada por pelo menos 10 minutos.', null, 422);
            }
            
            if(endTime < startTime) {
                return returnDefault(false, 'A data do agendamento não pode ser menor que a data atual.', null, 422);
            }

            const appointment = await Appointment.create(data);
            return {
                status: true,
                message: 'Agendamente criado com sucesso.',
                data: appointment.get({ plain: true }),
                code: 201
            };

        } catch (error: any) {
            console.log(error)
            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 409);
            }

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return returnDefault(false, 'O id da sala não existe.', null, 409);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    }


    // findAll: async () => {
    //     return await MeetingRoom.findAll();
    // },

    // findById: async (id: number) => {
    //     const room = await MeetingRoom.findByPk(id);
    //     if (!room) throw new Error('Sala não encontrada');
    //     return room;
    // },


    // update: async (id: number, data: Partial<meetingRoomAttributes>) => {
    //     const room = await MeetingRoom.findByPk(id);
    //     if (!room) throw new Error('Sala não encontrada');
    //     return await room.update(data);
    // },

    // delete: async (id: number) => {
    //     const room = await MeetingRoom.findByPk(id);
    //     if (!room) throw new Error('Sala não encontrada');
    //     return await room.destroy();
    // }
};