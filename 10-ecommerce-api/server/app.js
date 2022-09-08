require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
//other packages
const morgan = require("morgan"); //logs http request and errors
const cookieParser = require("cookie-parser"); //parses cookies
const fileUpload = require("express-fileupload"); //for uploading images/files
const cors = require("cors");

//security packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

//database
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const reviewRouter = require("./routes/review.routes");
const orderRouter = require("./routes/order.routes");

//middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//using security packages
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

//setting routes
app.get("/", (req, res) => {
  res.send("E-Commerce API");
});
app.get("/api/v1", (req, res) => {
  // console.log(req.cookies) //normally when we dont sign the cookie, its available in req.cookies
  console.log(req.signedCookies); //when signed, its available in req.signedCookies
  res.send("E-Commerce API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

//using middleware
app.use(notFoundMiddleware); //this hits when we try to access routes that is not defined
app.use(errorHandlerMiddleware); //this will only hit when we have errors in existing route

//listening to server
const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

//2 types of cookies - normal cookies and signedCookies
