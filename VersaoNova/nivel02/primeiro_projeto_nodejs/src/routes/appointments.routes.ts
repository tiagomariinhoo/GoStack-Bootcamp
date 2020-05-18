import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointentService from '../services/CreatingAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// localhost:3333/appointments...
// O tipo dela é uma array de Appointment

/**
 * A rota só deve:
 * Receber a requisição
 * Chamar outro arquivo
 * Devolver uma resposta
 */

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const {provider, date} = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointentService(appointmentsRepository);

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch(err) {
    return res.status(400).json({
      error: err.message
    });
  }

});

export default appointmentsRouter;
