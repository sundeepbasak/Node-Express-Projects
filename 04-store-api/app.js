require("dotenv").config();
require('express-async-errors')

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//import routes and connectDB
const connectDB = require("./db/connect");
const productsRouter = require('./routes/products.routes');

//import middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//built-in middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Mom");
});

//using routes and middleware
app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//listening to server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
