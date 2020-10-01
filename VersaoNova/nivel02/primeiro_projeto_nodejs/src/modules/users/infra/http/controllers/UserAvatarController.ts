import { Request, Response} from 'express';
import { container } from 'tsyringe'


import UpdateUserAvatarSerivce from '@modules/users/services/UpdateUserAvatarService'
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatarSerivce = container.resolve(UpdateUserAvatarSerivce);
    const user = await updateAvatarSerivce.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    })

    return res.json(classToClass(user));
  }
}
