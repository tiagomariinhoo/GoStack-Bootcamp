/**
 * Controller referente à retirada do pedido pelo entregador
 * A retirada só pode ser feita entre 8h - 18h
 */

import * as Yup from 'yup';
import { isWithinInterval } from 'date-fns';
import Parcel from '../models/Parcel';

class PickupController {
  /**
   * parcelId: Id da encomenda que eu quero retirar
   * deliverymanId: Id do deliveryman, para checar
   *                se ele pode tirar a encomenda
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      parcel_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { parcel_id, deliveryman_id } = req.body;

    const parcel = await Parcel.findByPk(parcel_id);

    if (!parcel) {
      return res.status(400).json({
        error: 'Parcel does not exists',
      });
    }

    // if (parcel.start_date !== null) {
    //   return res.status(400).json({
    //     error: 'Parcel already pickup',
    //   });
    // }

    if (parcel.deliveryman_id !== deliveryman_id) {
      return res.status(400).json({
        error: 'Deliveryman id does not match',
      });
    }

    const beginTime = new Date().setHours(8);
    // const endTime = endOfDay(new Date().toLocaleTimeString());
    const endTime = new Date().setHours(18);
    // Para testar, basta colocar no lugar de .getTime
    // setHours(x), onde 8 <= x <= 18
    // const timeNow = new Date().getTime();
    const timeNow = new Date().setHours(13);

    if (
      !isWithinInterval(timeNow, {
        start: beginTime,
        end: endTime,
      })
    ) {
      return res.status(400).json({
        error: 'Wait for the available time',
      });
    }

    await parcel.update({
      start_date: new Date(),
    });

    const { product, start_date } = parcel;

    return res.json({
      product,
      start_date,
    });
  }
}

export default new PickupController();
