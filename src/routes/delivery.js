const express = require('express');
const routes = express.Router();

const DeliveryController = require('../controllers/Delivery');
const auth = require('../middleware/auth');
const {
  createDelivery,
  getDelivery,
  updateDelivery,
  deleteDelivery
} = require('../middleware/validator');

routes.get('/', DeliveryController.getDeliverys);
routes.get('/:id', getDelivery, DeliveryController.getDelivery);

routes.post('/', auth, createDelivery, DeliveryController.createDelivery);
routes.patch('/:id', auth, updateDelivery, DeliveryController.updateDelivery);
routes.delete('/:id', auth, deleteDelivery, DeliveryController.deleteDelivery);

module.exports = routes;

