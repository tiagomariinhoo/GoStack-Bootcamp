import Appointment from '../entities/Appointment';
import { getRepository, Repository } from 'typeorm';

// Liskov Substitution Principle defende que precisamos desconectar o service ao máximo
// do typeorm, por exemplo, para que caso mude, não tenhamos problemas

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

/**
 * Responsável por criar, deletar, listar, update
 * os dados de Appointment (acredito que seja basicamente um controller)
 */

class AppointmentsRepository implements IAppointmentsRepository{
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  /**
   * O retorno de uma função async, SEMPRE vai ser uma promise
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date },
    });
    return (findAppointment);
  }

  public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
