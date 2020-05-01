import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  /**
   * Lista os agendamentos para o usuário comum
   */
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      limit: 20, // Lista no máximo 20 registros
      offset: (page - 1) * 20, // Quantos registros eu quero pular
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'], // Apenas o que vai mostrar na hora da requisição
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Procurando um provider que tem provider == true na tabela
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      // Status 401 é de não autorizado, não poderia estar fazendo esta requisição
      // Para testar basta fazer uma requisição passando um Id que não é provider na tabela
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // parseIso transforma em um date do JavaScript
    // startOfHour pega o início da hora, se passar 19:30 ele pega 19:00
    const hourStart = startOfHour(parseISO(date));

    // Verifica se a data que ele tá colocando, é anterior à atual
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Verifica se o prestador de serviço já não tem algo marcado para o mesmo horário
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null, // Um agendamento que não está cancelado
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // if (req.userId === provider_id) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Appointment not available for himself' });
    // }

    // Se passou de tudo isso anteriormente, agora criamos o agendamento

    const appointment = await Appointment.create({
      // O middleware de autenticação seta automaticamente quando o usuário faz o login (userId)
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    // Checa se o ID é diferente do Usuário que está logado
    // Já que só quem pode cancelar é o próprio dono do agendamento
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    // Remove duas horas do horário do agendamento
    const dateWithSub = subHours(appointment.date, 2);

    // Verifica se a data do agendamento é duas horas a menos que agora
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments two hours in advance.',
      });
    }

    // Data atual do cancelamento
    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
      // teste: 'teste' Se quisesse passar outro dado pegaria ele na desestruturação lá no CancellationMail data
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
