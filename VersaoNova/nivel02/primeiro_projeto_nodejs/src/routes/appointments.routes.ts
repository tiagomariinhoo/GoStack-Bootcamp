import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointentService from '../services/CreatingAppointmentService';

const appointmentsRouter = Router();

// localhost:3333/appointments...
// O tipo dela é uma array de Appointment

/**
 * A rota só deve:
 * Receber a requisição
 * Chamar outro arquivo
 * Devolver uma resposta
 *
 * Quando se trabalha com algum método do banco de dados
 * é interessante sempre deixar o async / await
 */

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

 appointmentsRouter.post('/', async (req, res) => {
  try {
    const {provider_id, date} = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  } catch(err) {
    return res.status(400).json({
      error: err.message
    });
  }

});

export default appointmentsRouter;
