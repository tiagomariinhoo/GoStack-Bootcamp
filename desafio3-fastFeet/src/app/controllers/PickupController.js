/**
 * Controller referente à retirada do pedido pelo entregador
 * A retirada só pode ser feita entre 8h - 18h
 */

import * as Yup from 'yup';
import { isWithinInterval } from 'date-fns';
import Parcel from '../models/Parcel';
import Deliveryman from '../models/Deliveryman';

class PickupController {
  /**
   * parcelId: Id da encomenda que eu quero retirar
   * deliverymanId: Id do deliveryman, para checar
   *                se ele pode tirar a encomenda
   *
   * O deliveryman só pode fazer 5 retiradas por dia
   * Checa se o número de pickups do dia já passou de 5
   * Se chegou em 5, checa se a data (dia) do ultimo pickup
   * é diferente da de hoje
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      parcel_id: Yup.number().required(),
    });

    const deliveryman_id = req.params.id;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { parcel_id } = req.body;

    const parcel = await Parcel.findByPk(parcel_id);

    if (!parcel) {
      return res.status(400).json({
        error: 'Parcel does not exists',
      });
    }

    if (parcel.start_date !== null) {
      return res.status(400).json({
        error: 'Parcel already pickup',
      });
    }

    if (parcel.deliveryman_id != deliveryman_id) {
      return res.status(400).json({
        error: 'Deliveryman id does not match',
      });
    }

    // Checa se o entregador já retirou 5 pedidos no dia
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Deliveryman does not exists',
      });
    }

    let times = 0;

    if (deliveryman.pickup_times == null) times = 1;
    else times = deliveryman.pickup_times + 1;

    if (deliveryman.pickup_times === 5) {
      if (new Date().getDay() !== deliveryman.last_pickup_date.getDay()) {
        times = 1;
      } else {
        return res.status(400).json({
          error: 'Deliveryman has already been pickup five parcels today',
        });
      }
    }

    await deliveryman.update({
      pickup_times: times,
      last_pickup_date: new Date(),
    });

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
