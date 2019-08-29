const express = require('express');
const routes = express.Router();

const OrderController = require('../controllers/Order');
const auth = require('../middleware/auth');

const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../middleware/validator');

routes.get('/', OrderController.getOrders);
routes.get('/:id', getOrder, OrderController.getOrder);

routes.post('/', auth, createOrder, OrderController.createOrder);
routes.patch('/', auth, updateOrder, OrderController.updateOrder);
routes.delete('/:id', auth, deleteOrder, OrderController.deleteOrder);

module.exports = routes;
