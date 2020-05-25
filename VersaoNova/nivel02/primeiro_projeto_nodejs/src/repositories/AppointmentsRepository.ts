import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

/**
 * Responsável por criar, deletar, listar, update
 * os dados de Appointment (acredito que seja basicamente um controller)
 */

 @EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

  /**
   * O retorno de uma função async, SEMPRE vai ser uma promise
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    });
    return (findAppointment || null);
  }
}

export default AppointmentsRepository;
