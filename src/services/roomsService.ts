import { MeetingRoom, meetingRoomAttributes } from '../models/roomsModel.js';
import { returnDefault, returnDefaultInterface } from "../utils/response.js";

export const meetingRoomService = {
    create: async (data: meetingRoomAttributes): Promise<returnDefaultInterface> => { // Criação de padrão de uma sala levando em consideração a tipagem da model
        try {

            if(data.capacity <= 0) {
                return returnDefault(false, 'A sala deve ter suporte para 1 participante no minimo.', null, 422);
            }

            const newRoom = await MeetingRoom.create(data);

            return {
                status: true,
                message: 'Sala criada com sucesso.',
                data: newRoom.get({ plain: true }),
                code: 201
            };

        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return returnDefault(false, 'Já existe uma sala criada com este nome.', null, 409);
            }

            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 409);
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