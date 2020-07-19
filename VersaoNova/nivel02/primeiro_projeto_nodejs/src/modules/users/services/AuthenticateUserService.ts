import { compare } from 'bcryptjs';
import { sign, JsonWebTokenError } from 'jsonwebtoken'
import authConfig from '@config/auth';
import { injectable, inject} from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}
  // Esse Promise<{user:User}> também pode ser colocado dentro de uma interface
  public async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign(
      {},
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      }
    );


    return {user, token};
  }
}

export default AuthenticateUserService;
