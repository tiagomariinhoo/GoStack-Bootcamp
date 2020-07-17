import Appointment from '../entities/Appointment';
import { EntityRepository, Repository } from 'typeorm';

// Liskov Substitution Principle defende que precisamos desconectar o service ao máximo
// do typeorm, por exemplo, para que caso mude, não tenhamos problemas

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

/**
 * Responsável por criar, deletar, listar, update
 * os dados de Appointment (acredito que seja basicamente um controller)
 */

 @EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository{

  /**
   * O retorno de uma função async, SEMPRE vai ser uma promise
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date: date },
    });
    return (findAppointment);
  }
}

export default AppointmentsRepository;
