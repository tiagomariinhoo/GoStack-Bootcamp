// Configurações para envio de email
// Pega as credenciais dadas pelo Mailtrap
export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
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
