const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  }, 
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);

//image is basically a string, which first needs to be uploaded and then we can set the path in postman to actually get the image