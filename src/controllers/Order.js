const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
  async createOrder(request, response) {
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

    const createOrder = Order.create({
      userId,
      products: [...products],
      price: priceTotal.toFixed(3)
    });

    const order = await createOrder.save();

    return response.json({ message: 'Order created!', order });
  },
  async getOrder(request, response) {
    const orderId = request.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return response.status(204).end();
    }

    return response.json(order);
  },
  async getOrders(request, response) {
    const orders = await Order.find().sort('-createdAt');

    if (!orders) {
      return response.status(204).end();
    }

    return response.json(orders)
  },
  async updateOrder(request, response) {
    const orderId = request.params.id;
    const { status } = request.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return response.status(204).end();
    }

    order.status = status
    await order.save();
    return response.json({ message: 'Order updated!' });
  },
  async deleteOrder(request, response) {
    const orderId = request.params.id;
    const order = await Order.findByIdAndRemove(orderId);

    if (!order) {
      return response.status(204).end();
    }

    return response.json({ message: 'Order deleted!' });
  }
}
