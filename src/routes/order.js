const express = require('express');
const routes = express.Router();

const OrderController = require('../controllers/Order');

routes.get('/', OrderController.getOrders);
routes.get('/:id', OrderController.getOrder);

routes.post('/', OrderController.createOrder);
routes.patch('/', OrderController.updateOrder);
routes.delete('/:id', OrderController.deleteOrder);

module.exports = routes;
