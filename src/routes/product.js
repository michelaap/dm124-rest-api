const express = require('express');
const routes = express.Router();

const ProductController = require('../controllers/Product');

routes.get('/', ProductController.getProducts);
routes.get('/:id', ProductController.getProducts);

routes.post('/', ProductController.createProduct);
routes.patch('/', ProductController.updateProduct);
routes.delete('/:id', ProductController.deleteProduct);

module.exports = routes;
