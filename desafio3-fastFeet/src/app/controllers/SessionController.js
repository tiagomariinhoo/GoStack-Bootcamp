/**
 * Não usa o userController porque aqui iremos criar uma Session e não um User
 *
 *  Além disso, o UserController já tem o método Store, e só pode ter um por controller
 *
 * O sessionController irá tratar a autenticação e não a criação do usuário
 */

import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // Primeira vê se existe esse email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Checa se a senha bate com o usuário
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, provider }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }), // Para gerar esse token, no md5 online: gobarberrocketseatnode2
      // No sign coloca o que quer pegar de informação no token
    });
  }
}

export default new SessionController();
