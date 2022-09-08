require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//import controller
const stripeController = require("./controllers/stripeController");

//import middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

//built-in middleware
app.use(express.json());
app.use(express.static("./public"));

//stripe - post method
app.post("/stripe", stripeController);
//using middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

//listening to server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
