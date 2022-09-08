require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//controller
const { sendEmailEthereal, sendEmail } = require("./controllers/sendEmail");

//import middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//built-in middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Email Project</h1> <a href='/send'>send email</a>");
});

// app.get('/send', sendEmailEthereal); //via ethereal
app.get("/send", sendEmail); //via sendgrid

//using middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
