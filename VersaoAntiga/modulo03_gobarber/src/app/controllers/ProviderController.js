import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true }, // Todos os usuários com Provider == true
      attributes: ['id', 'name', 'email', 'avatar_id'], // Campos que serão mostrados
      include: [
        { // Inclue os relacionamentos
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    }); // Retorna todo o tipo de usuário

    return res.json(providers);
  }
}

export default new ProviderController();
