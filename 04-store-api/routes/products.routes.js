const express = require('express');
const router = express.Router();

//import routes
const {getAllProducts, getAllProductsStatic} = require('../controllers/products.controller');

router.get('/', getAllProducts);
router.get('/static', getAllProductsStatic);

module.exports = router;