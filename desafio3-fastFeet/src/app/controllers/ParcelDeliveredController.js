import Parcel from '../models/Parcel';
import Deliveryman from '../models/Deliveryman';
import Sequelize from 'sequelize';

class ParcelDeliveredController {
  async index(req, res) {
    if (!(await Deliveryman.findByPk(req.params.id))) {
      return res.status(400).json({
        error: 'Deliveryman does not exists',
      });
    }

    const { Op } = Sequelize;

    const parcel = await Parcel.findAll({
      where: {
        end_date: {
          // Pega onde a data de entrega é diferente de null
          [Op.ne]: null,
        },
      },
    });

    return res.json(parcel);
  }
}

export default new ParcelDeliveredController();
