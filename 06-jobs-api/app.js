require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//import connectDB and routes
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.routes");
const jobsRouter = require("./routes/jobs.routes");

//import middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/auth");

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 mins)
}))
app.use(express.json()); //built-in middleware
app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

//using router and middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//listening to server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
