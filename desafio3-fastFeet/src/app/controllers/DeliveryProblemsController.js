import Parcel from '../models/Parcel';
import DeliveryProblem from '../models/DeliveryProblems';

class DeliveryProblemsController {
  async store(req, res) {
    const parcel = await Parcel.findByPk(req.params.id);

    if (!parcel) {
      return res.status(400).json({
        error: 'Parcel does not exists',
      })
    }

    const { id, parcel_id, description } = await DeliveryProblem.create({
      parcel_id: req.params.id,
      description: req.body.description,
    });

    return res.json({
      id,
      parcel_id,
      description,
    });
  }

  async index(req, res) {
    const deliveryProblemList = await DeliveryProblem.findAll({
      where: {
        parcel_id: req.params.id,
      },
    });

    return res.json(deliveryProblemList);
  }

  async delete(req, res) {
    return res.json();
    // const parcel = await Parcel.findByPk(req.params.id);

    // if (!parcel) {
    //   return res.status(400).json({
    //     error: 'Parcel does not exists',
    //   });
    // }

    // if (parcel.end_date) {
    //   return res.status(400).json({
    //     error: 'The parcel has already been delivered',
    //   })
    // }

    // await parcel.update({
    //   canceled_at: new Date(),
    // })

    // return res.json(parcel);
  }
}

export default new DeliveryProblemsController();
