const express = require('express');
const routes = express.Router();

const ProductController = require('../controllers/Product');
const auth = require('../middleware/auth');

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../middleware/validator');

routes.get('/', ProductController.getProducts);
routes.get('/:id', getProduct, ProductController.getProducts);

routes.post('/', auth, createProduct, ProductController.createProduct);
routes.patch('/', auth, updateProduct, ProductController.updateProduct);
routes.delete('/:id', auth, deleteProduct, ProductController.deleteProduct);

module.exports = routes;
