import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

/**
 * Responsável por criar, deletar, listar, update
 * os dados de Appointment (acredito que seja basicamente um controller)
 */


 // Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return (findAppointment || null);
  }

  // Basicamente cria uma interface para ja vir os dados diretos
  public create({ provider, date}: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
