import { Injectable } from '@nestjs/common';
import { load as loadSecrets } from '@qatalog/gcp-config';

@Injectable()
export class NotificationsService {
  async send() {
    const config = await loadSecrets({
      project: process.env.PROJECT_ID,
      schema: {
        sendgridKey: {
          secret: 'SENDGRID_KEY',
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sgMail = require('@sendgrid/mail');
    const key = config.key || process.env.SENDGRID_KEY;
    sgMail.setApiKey(key);
    const msg = {
      to: 'joseortiz122799@gmail.com', // Change to your recipient
      from: 'joseortiz122799@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
