// Configurações para envio de email
// Pega as credenciais dadas pelo Mailtrap
export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: '9610762f793c68',
    pass: 'b3b948a534eb30',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 * Amazon SES, serviço de envio de email
 * Mailgun
 * Sparkpost
 * Mandril
 *
 * Mailtrap (ambiente de desenvolvimento)
 */
