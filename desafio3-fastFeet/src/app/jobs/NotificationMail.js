import Mail from '../../lib/Mail';

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {

    console.log(data.body);

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Produto disponível para retirada',
      template: 'notification',
      context: {
        // Envia as variáveis que o template tá esperando
        provider: appointment.provider.name,
        product: data.product,
        recipient: data.recipient.id,
      },
    });
  }
}
