import * as Yup from 'yup';
import Parcel from '../models/Parcel';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipients';

import Mail from '../../lib/Mail';

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

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({
        error: 'Recipient does not exists',
      });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({
        error: 'Deliveryman does not exists',
      });
    }

    const errorMail = Mail.sendParcelEmail(product, deliveryman, recipient);

    const { id } = await Parcel.create(req.body);
    // Não é retornada nada já que o improtante é cadastrar no banco
    // O email eu posso notificar que deu um erro de alguma forma
    // Fiz isso apenas para testar o uso de Promises
    errorMail.then(
      () => {},
      () => {
        console.log('Mail error!');
      }
    );

    return res.json({
      id,
      product,
      deliveryman_id,
      recipient_id,
    });
  }

  /**
   * Se a encomenda já foi entregue
   * não pode alterar nada.
   *
   * Se puder ser alterada, pode
   * ser alterada apenas o:
   * entregador
   * destinatário
   * nome do produto
   */
  async update(req, res) {
    const parcel = await Parcel.findByPk(req.params.id);

    if (!parcel) {
      return res.status(400).json({
        error: 'Parcel does not exists',
      });
    }

    if (parcel.end_date) {
      return res.status(400).json({
        error: 'The Parcel has already been delivered and cannot be changed',
      });
    }

    const { recipient_id, deliveryman_id } = req.body;

    if (!(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({
        error: 'Deliveryman does not exists',
      });
    }

    if (!(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({
        error: 'Recipient does not exists',
      });
    }

    await parcel.update({
      deliveryman_id: req.body.deliveryman_id,
      recipient_id: req.body.recipient_id,
      product: req.body.product,
    });

    return res.json(parcel);
  }

  async index(req, res) {
    // todo
    return res.json();
  }

  async delete(req, res) {
    // todo
    return res.json();
  }
}

export default new ParcelController();
