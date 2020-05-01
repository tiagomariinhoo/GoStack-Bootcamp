import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import { resolve } from 'path';
import MailConfig from '../config/mail';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(MailConfig);
  }

  sendParcelEmail(product, deliveryman, recipient, onError = () => {}) {
    const mailOptions = {
      from: 'equipeFastFeet@noreply.com',
      to: deliveryman.email,
      subject: 'Encomenda disponível para retirada',
      template: 'notification',
      context: {
        deliverymamName: deliveryman.name,
        productName: product,
        recipientName: recipient.name,
      },
    };

    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, error => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    })
  }
}

export default new Mail();
