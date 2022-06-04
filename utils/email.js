const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // ** 1) Create a transporter
  /* For Gmail
    service: 'Gamil', // other options are SendGrid and MailGun
    auth: {
      user: process.env.EMAILUSERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //! Activate in gmail 'less secure app' option
    */

  // ** using mailTrap for fake email sending
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // ** 2) Define the email options
  const mailOptions = {
    from: 'Jamal Ahmed <welcome@jamal.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // ** 3) Actually sending the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
