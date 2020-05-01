import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    // Notification é o Schema do mongoDb
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  // Marca a notificação como lida
  async update(req, res) {
    // const notifications = await Notification.findById(req.params.id);
    // O id no mongoDb é diferente do Id normal
    // Encontra um registro e atualiza ele ao mesmo tempo
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // Transforma o campo Read em True
      { new: true }, // Depois de atualizar, retorna a notificação atualizada
    );

    return res.json(notification);
  }
}

export default new NotificationController();
