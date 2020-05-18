/**
 * Responsável só pela criação do agendamento
 */

import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

/**
 * Lembrar de estudar isso
 * Dependency Inversion (SOLID)
 */

// O service ele tem sempre um único método
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // Colocaremos toda a lógica
  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
