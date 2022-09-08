//here we are dynamically adding all the values to our database from products.json
require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/products.model"); //import product schema

const jsonProducts = require("./products.json"); //import all products

//connect to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //delete all products that are already there in db
    await Product.create(jsonProducts); //added products to db
    console.log("success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();

/* deleteMany() function -
It is used to delete all of the documents that match conditions from the collection. This func behaves like the remove() function but it deletes all documents that match conditions regardless of the single option.
*/

//if we are successfull -- we want to terminate the process, we dont want it to be running
//similarly, if we get an error, we want to show error and then terminate the process