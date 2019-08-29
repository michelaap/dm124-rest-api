const Delivery = require('../models/Delivery');
const Order = require('../models/Order');

module.exports = {
  async createDelivery(request, response) {
    try {
      const { userId } = request.user;
      const {
        orderId,
        receiverName,
        receiverCpf,
        receiverIsOwner,
        geographicLocation
      } = request.body;

      const delivery = Delivery.create({
        orderId,
        userId,
        receiverName,
        receiverCpf,
        receiverIsOwner,
        geographicLocation
      });

      await delivery.save();
      return response.json({ message: 'Delivery created!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getDelivery(request, response) {
    try {

    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getDeliverys(request, response) {
    try {

    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async updateDelivery(request, response) {
    try {

    }
    catch(error) {

    }
  },
  async deleteDelivery(request, response) {
    try {

    }
    catch(error) {

    }
  }
}
