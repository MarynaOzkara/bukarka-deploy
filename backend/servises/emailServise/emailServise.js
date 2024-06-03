const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM, EMAIL_NAME } = process.env;

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    // host: "smtp.elasticemail.com",
    // port: 2525,
    // secure: false,
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });
  const message = {
    from: `${EMAIL_NAME} <${EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  await transport.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const sendFeedback = async (options) => {
  const transport = nodemailer.createTransport({
    // host: "smtp-relay.brevo.com",
    // port: 587,
    // secure: false,
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });
  const message = {
    from: `${options?.name} <${options.email}>`,
    to: EMAIL_USER,
    subject: options.subject,
    html: `Заказ: ${options?.orderNumber}, від ${options?.name}, моб.тел: +380${options?.phone}. Повідомлення: ${options.message}`,
  };
  await transport.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail, sendFeedback };
