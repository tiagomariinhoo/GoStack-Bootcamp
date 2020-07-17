import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateUserAvatarSerivce from '@modules/users/services/UpdateUserAvatarService'

const usersRouter = Router();
const upload = multer(uploadConfig);

 usersRouter.post('/', async (req, res) => {
  try {
    const {name, email, password} = req.body;

    const createUser = new CreateUserService();

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

});

// Para atualizar uma informação única
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
    const updateAvatarSerivce = new UpdateUserAvatarSerivce();
    const user = await updateAvatarSerivce.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    })

    delete user.password;

    return res.json(user);
})

export default usersRouter;
