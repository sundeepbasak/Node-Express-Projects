const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors"); //or ('../errors/index')
const path = require("path");

const createProduct = async (req, res) => {
  // console.log(req.body);

  //create user property on req.body and set it equal to userId(req.user.userId)
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id: ${productId} exist`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id: ${productId} exist`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

//1 way: findOneAndDelete
//2nd way: findOne and then remove the product
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id: ${productId} exist`
    );
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product Removed" });
};

const uploadImage = async (req, res) => {
  // console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  //check for filetype
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload Image");
  }

  //check for size
  const maxSize = 1000 * 1000;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
