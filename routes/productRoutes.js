const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/addProduct', productController.addProduct);

router.get('/published', productController.publishedProducts);

router.get('/:id', productController.getProductById);

router.put('/update/:id', productController.updateProductById);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;