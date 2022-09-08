require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload"); //for uploading files
const cloudinary = require("cloudinary").v2; //for storing files in cloudinary

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//import connectDB
const connectDB = require("./db/connect");
//import routes
const productRouter = require("./routes/product.routes");

//import middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//built-in middleware
app.use(express.static("./public")); //make the folder publicly available
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

//using router
app.use("/api/v1/products", productRouter);

//using middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//listening to server
const PORT = process.env.PORT || 5000;
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

//using app.use(express.static('./public')) will lead to
//--> localhost:5000 pointing to public folder
//--> therefore we get images path via --> /uploads/computer-1.png
