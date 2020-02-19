import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

    if (req.userProvider === false) {
      return res.status(400).json({ error: 'Just admin can store recipients' });
    }

    const { id, name, street, city, zip_code } = await Recipients.create(
      req.body
    );

    return res.json({
      id,
      name,
      street,
      city,
      zip_code,
    });
  }
}

export default new RecipientsController();
