import User from '../entities/User';
import { getRepository, Not, Repository } from 'typeorm';

// Liskov Substitution Principle defende que precisamos desconectar o service ao máximo
// do typeorm, por exemplo, para que caso mude, não tenhamos problemas

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import usersRouter from '../../http/routes/user.routes';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

/**
 * Responsável por criar, deletar, listar, update
 * os dados de Appointment (acredito que seja basicamente um controller)
 */

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async findAllProviders(
    {except_user_id}: IFindAllProvidersDTO): Promise<User[]> {
      let users: User[]

      if (except_user_id) {
        users = await this.ormRepository.find({
          where: {
            id: Not(except_user_id),
          }
        })
      } else {
        users = await this.ormRepository.find()
      }

      return users
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
