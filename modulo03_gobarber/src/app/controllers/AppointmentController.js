import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

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
      attributes: ['id', 'date'],
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

    // Se passou de tudo isso anteriormente, agora criamos o agendamento

    const appointment = await Appointment.create({
      // O middleware de autenticação seta automaticamente quando o usuário faz o login (userId)
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
