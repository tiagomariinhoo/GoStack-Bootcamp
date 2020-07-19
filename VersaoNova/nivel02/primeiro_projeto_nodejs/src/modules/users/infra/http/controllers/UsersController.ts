import { Request, Response} from 'express';
import { container } from 'tsyringe'


import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateUserAvatarSerivce from '@modules/users/services/UpdateUserAvatarService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {name, email, password} = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      })

      // Para não mostrar a senha na hora de listar
      delete user.password;

      return res.json(user);
    } catch(err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }
}
