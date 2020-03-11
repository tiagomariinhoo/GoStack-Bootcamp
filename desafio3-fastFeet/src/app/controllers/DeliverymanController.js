import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const devliverymanExists = await Deliveryman.findOne({
    //   where: {
    //     email: req.body.email,
    //   },
    // });

    // if (devliverymanExists) {
    //   return res.status(400).json({
    //     error: 'Deliveryman already exists.',
    //   });
    // }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string(),
      newEmail: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Deliveryman does not exist',
      });
    }

    const { name, newEmail } = req.body;

    if (!name && !newEmail) {
      return res.status(400).json({
        error: 'At least name or new email must be provided.',
      });
    }

    await deliveryman.update(req.body);

    return res.json({
      name,
      newEmail,
    });
  }

  async index(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliverymanController();
