import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  // Declarando uma variável key dentro, basicamente
  get key() {
    // Retorna uma chave única, para cada job precisa de uma chave única
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    // console.log('A fila executou!'); Quando deleta alguém a fila executa
    // Remetente e destinatário do email
    // Agora fazendo uma requisição Delete para o email cadastrado no id,
    // pelo Mailtrap é possível ver que o email foi enviado
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        // Envia as variáveis que o template tá esperando
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
