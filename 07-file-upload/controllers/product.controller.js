const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");

//create product
const createProduct = async (req, res) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).send({ products });
};

module.exports = {
  createProduct,
  getAllProducts,
};
