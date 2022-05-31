import * as nodemailer from 'nodemailer';
import { resetPassword } from './templates/passwordReset';
import { registration } from './templates/registration';

export const sendEmail = async (email: string, link: string, type: string) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SENDGRID_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const sender = '"TREEO" <mrs09557@eoopy.com>';
  if (type == 'registration') {
    let info = await transporter.sendMail({
      from: sender, // sender address
      to: email, // list of receivers
      subject: 'Welcome to Treeo',
      text: 'Confirm Your Account',
      html: registration(link),
    });
  }

  if (type == 'passwordReset') {
    let info = await transporter.sendMail({
      from: sender, // sender address
      to: email, // list of receivers
      subject: 'Password Reset',
      text: 'Password Reset Initiated',
      html: resetPassword(link),
    });
  }

  //   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
