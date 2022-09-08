const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");
const { uploadProductImage } = require("../controllers/upload.controller");

//baseUrl: /api/v1/products
router.post("/", createProduct);
router.get("/", getAllProducts);
router.post("/upload", uploadProductImage);

module.exports = router;

/* or by chaining
router.route('/).post(createProduct).get(getAllProducts);
router.route('/upload').post(uploadProductImage);
*/