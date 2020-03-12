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

    const devliverymanExists = await Deliveryman.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (devliverymanExists) {
      return res.status(400).json({
        error: 'Deliveryman already exists.',
      });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      oldEmail: Yup.string().required(),
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { email: req.body.oldEmail },
    });

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Deliveryman does not exist',
      });
    }

    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        error: 'At least name or new email must be provided.',
      });
    }

    const { id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async delete(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        error: 'Email does not exists',
      });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (!deliveryman) {
      return res.status(400).json({
        erorr: 'Deliveryman does not exists',
      });
    }

    Deliveryman.destroy({
      where: {
        email: req.body.email,
      },
    });

    return res.json();
  }
}

export default new DeliverymanController();
