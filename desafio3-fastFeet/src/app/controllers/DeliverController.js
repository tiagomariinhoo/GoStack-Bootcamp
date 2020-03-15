/**
 * Data de término do Parcel é cadastrada
 * entregador finaliza a entrega
 */

import Parcel from '../models/Parcel';
import File from '../models/File';

class DeliverController {
  async update(req, res) {
    const parcel_id = req.params.id;

    const parcel = await Parcel.findByPk(parcel_id);

    if (!parcel) {
      return res.status(400).json({
        error: 'Parcel id does not exists',
      });
    }

    const time = new Date().getTime();

    const signature = await File.findByPk(req.body.signature_id);

    if (!signature) {
      return res.status(400).json({
        error: 'File does not exists',
      });
    }

    if (parcel.end_date) {
      return res.status(400).json({
        error: 'Parcel has already been delivered',
      });
    }

    if (!parcel.start_date) {
      return res.status(400).json({
        error: 'The parcel was not picked up by the deliveryman',
      });
    }

    await parcel.update({
      signature_id: req.body.signature_id,
      end_date: time,
    });

    const {
      product,
      start_date,
      signature_id,
      deliveryman_id,
      end_date,
    } = parcel;

    return res.json({
      product,
      signature_id,
      deliveryman_id,
      start_date,
      end_date,
    });
  }
}

export default new DeliverController();
