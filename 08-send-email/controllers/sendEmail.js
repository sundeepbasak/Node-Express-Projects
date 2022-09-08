const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

//send email using nodemailer and ethereal
const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  //from ethereal.email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "rylee.moore78@ethereal.email",
      pass: "SGetyMVpjZguEJMFWW",
    },
  });

  let info = await transporter.sendMail({
    from: '"Sundeep Basak" <sundeep15basak@gmail.com>', //sender address
    to: "bar@example.com, baz@example.com", // list of receivers,
    subject: "Hello World", // Subject line
    html: "<h1>Sending Emails with Node.js</h1>", // html body
  });

  res.json(info);
};

//send email using @sendgri/mail
const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "sunny15basak@gmail.com", // Change to your recipient
    from: "sundeep15basak@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = { sendEmailEthereal, sendEmail };
