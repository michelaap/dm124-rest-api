const { validationResult } = require('express-validator');

const Order = require('../models/Order');
const Product = require('../models/Product');
const Delivery = require('../models/Delivery');

module.exports = {
  async createOrder(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        console.log(error)
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const { userId } = request.user;
      const { products } = request.body;

      const productsId = products.map(product => product.productId);
      const productData = await Product.find({ _id: [...productsId] });

      const priceTotal = productData.reduce((total, item) => {
        let product = products.find(
          product => product.productId === item._id.toString()
        );

        if (product) {
          return total += product.quantity * item.price;
        }
      }, 0);

      const createOrder = await Order.create({
        userId,
        products: [...products],
        price: priceTotal.toFixed(3)
      });

      const order = await createOrder.save();

      return response.json({ message: 'Order created!', order });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getOrder(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const orderId = request.params.id;
      const order = await Order.findById(orderId);

      if (!order) {
        return response.status(204).end();
      }

      return response.json(order);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getOrders(request, response) {
    try {
      const orders = await Order.find().sort('-createdAt');

      if (!orders) {
        return response.status(204).end();
      }

      return response.json(orders);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async updateOrder(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const orderId = request.params.id;
      const { userId } = request.user;
      const { status } = request.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return response.status(204).end();
      }

      order.status = status
      await order.save();

      if (status === 'CLOSED') {
        const delivery = await Delivery.create({
          orderId,
          userId,
        });

        await delivery.save();
      }

      return response.json({ message: 'Order updated!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async deleteOrder(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const orderId = request.params.id;
      const order = await Order.findByIdAndRemove(orderId);

      if (!order) {
        return response.status(204).end();
      }

      return response.json({ message: 'Order deleted!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  }
}
