import { MeetingRoom, meetingRoomAttributes } from '../models/roomsModel.js';
import {Appointment, appointmentAttributes} from '../models/appointmentsModel.js';
import { returnDefault, returnDefaultInterface } from "../utils/response.js";
import { dateNow } from '../utils/response.js';

export const meetingRoomService = {
    create: async (data: meetingRoomAttributes): Promise<returnDefaultInterface> => { // Criação de padrão de uma sala levando em consideração a tipagem da model
        try {

            if(data.capacity <= 0) {
                return returnDefault(false, 'A sala deve ter suporte para 1 participante no minimo.', null, 422);
            }

            const newRoom = await MeetingRoom.create(data);

            return returnDefault(true, 'Sala criada com sucesso.', newRoom.get({ plain: true }), 201);
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return returnDefault(false, 'Já existe uma sala criada com este nome.', null, 404);
            }

            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 404);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    findAll: async (): Promise<returnDefaultInterface> => {
        const result = await MeetingRoom.findAll({order: [['id', 'ASC']]});
        if(result) {
            return returnDefault(true, '', result, 200);
        }

        return returnDefault(true, 'Nenhuma sala cadastrada.', null, 200);
    },

    findById: async (id: number): Promise<returnDefaultInterface> => {
        const result = await MeetingRoom.findByPk(id);
        if(result) {
            return returnDefault(true, '', result, 200);
        }

        return returnDefault(false, 'Nenhuma sala encontrada com esse ID.', null, 404);
    },


    update: async (id: number, data: meetingRoomAttributes): Promise<returnDefaultInterface> => {

        try {
            const room = await MeetingRoom.findByPk(id);

            if (!room) {
                return returnDefault(false, 'Nenhuma sala encontrada com esse ID.', null, 404);
            }

            const getAppointmentsByIdRoom = await Appointment.findAll({
                where: {idMeetingRoom: room?.dataValues.id}
            });

            let meetingInprogress = false;
            if(getAppointmentsByIdRoom) {
                getAppointmentsByIdRoom.forEach(el => {
                    const startDate = new Date(el.dataValues.startTime); 
                    const endDate = new Date(el.dataValues.endTime);
                    
                    if(dateNow > startDate && dateNow < endDate) {
                        meetingInprogress = true;
                    }
                })
            }

            if(meetingInprogress) {
                return returnDefault(false, 'Esta sala esta com uma reunião em andamento, aguarde a termino e tente novamente.', null, 404);
            }
    
            const result = await room.update(data); 
            if(result) {
                return returnDefault(true, 'Sala editada com sucesso.', null, 200);
            }
    
            return returnDefault(false, 'Erro ao fazer update.', null, 404);
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return returnDefault(false, 'Já existe uma sala criada com este nome.', null, 404);
            }

            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 404);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    },

    delete: async (idRoom: number) => {

        try {
            const room = await MeetingRoom.findByPk(idRoom);

            if (!room) {
                return returnDefault(false, 'Nenhuma sala encontrada com esse ID.', null, 404);
            }

            const getAppointmentsByIdRoom = await Appointment.findAll({
                where: {idMeetingRoom: room?.dataValues.id}
            });

            let meetingInprogress = false;
            let arridsAppointments: number[] = [];
            if(getAppointmentsByIdRoom) {
                getAppointmentsByIdRoom.forEach(el => {
                    const startDate = new Date(el.dataValues.startTime); 
                    const endDate = new Date(el.dataValues.endTime); 
                    const dateNow = new Date(Date.now() - 3 * 60 * 60 * 1000);
                    
                    arridsAppointments.push(Number(el.dataValues.id)); // Criando um array de ids do agendamento, para se caso não houver nenhum agendamento futuro,ire deletar os agendamentos junto com a sala

                    if((dateNow > startDate && dateNow < endDate) || dateNow < startDate) {
                        meetingInprogress = true; // validando se tem uma reunião em andamento ou se vai ter futuramente uma reunião 
                        arridsAppointments = []; // Se caso cair nesse if, limpo o array de IDS, não vai ser preciso deletar nenhum agendamento pois a sala tem agendamentos futuros
                    }

                })
            }

            if(meetingInprogress) {
                return returnDefault(false, 'Não é possivel deletar uma sala com agendamentos futuros.', null, 404);
            }
    
            if(arridsAppointments?.length > 0) {
                await Appointment.destroy({ // Delatndo todas as correspondecias dessa sala na tabela de appointments, para que n fique rastro de agendamento de uma sala que já n existe mais
                    where: {
                        id: arridsAppointments
                    }
                });
            }
            await room.destroy(); 
            return returnDefault(true, 'Sala deletada com sucesso.', null, 200);
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError') {
                return returnDefault(false, 'Dados inválidos ou incompletos.', null, 404);
            }

            return returnDefault(false, 'Erro interno do servidor.', null, 500);
        }
    }
};