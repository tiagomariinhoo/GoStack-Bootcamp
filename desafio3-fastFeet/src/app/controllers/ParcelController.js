import * as Yup from 'yup';
import Parcel from '../models/Parcel';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipients';

import NotificationMail from '../jobs/NotificationMail';
import Queue from '../../lib/Queue';

/**
 * Data de inicio cadastrada quando for feita
 * a retirada do produto pelo entregador
 *
 * Data de término é cadastrada quando o entregador
 * finaliza a entrega
 *
 * recipient_id e deliveryman_id são cadastrados assim que
 * há o cadastro da encomenda
 *
 * Quando a encomenda é cadastrada o entregador recebe um
 * email com detalhes da encomenda:
 * Nome do produto
 * Mensagem informando que o produto tá disponível para retirada
 */

class ParcelController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.string().required(),
      deliveryman_id: Yup.string().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    if (!(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({
        error: 'Recipient does not exists',
      });
    }

    if (!(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({
        error: 'Deliveryman does not exists',
      });
    }

    const { id } = await Parcel.create(req.body);

    await Queue.add(NotificationMail.key, {
      req
    })

    return res.json({
      id,
      product,
      deliveryman_id,
      recipient_id,
    });
  }

  async update(req, res) {
    return res.json();
  }

  async index(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new ParcelController();
