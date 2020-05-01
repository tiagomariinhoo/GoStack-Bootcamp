import * as Yup from 'yup';
import * as Cpf from '@fnando/cpf';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      street: Yup.string().required(),
      house_number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // if (req.userProvider === false) {
    //   return res.status(400).json({ error: 'Just admin can store recipients' });
    // }

    if (Cpf.isValid(req.body.cpf) === false) {
      return res.status(400).json({ error: 'Cpf input is incorrect' });
    }

    const { cpf } = req.body;

    const recipients = await Recipients.findOne({ where: { cpf } });

    if (recipients) {
      return res.status(400).json({ error: 'Recipient already exists. ' });
    }

    const { id, name, street, city, zip_code } = await Recipients.create(
      req.body
    );

    return res.json({
      id,
      name,
      cpf,
      street,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      street: Yup.string().required(),
      house_number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { cpf } = req.body;

    const recipients = await Recipients.findOne({ where: { cpf } });

    if (!recipients) {
      return res.status(400).json({ error: 'Cpf invalid ' });
    }

    const { id, name } = await recipients.update(req.body);

    return res.json({
      id,
      name,
      cpf,
    });
  }
}

export default new RecipientsController();
