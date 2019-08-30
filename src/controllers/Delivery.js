const Delivery = require('../models/Delivery');

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

      const delivery = await Delivery.create({
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
      const deliveryId = request.params.id;
      const delivery = await Delivery.findById(deliveryId);

      if (!delivery) {
        return response.status(204).end();
      }

      return response.json(delivery);
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
      const deliverys = await Delivery.find().sort('-createdAt');

      if (!deliverys) {
        return response.status(204).end();
      }

      return response.json(deliverys);
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
      const { userId } = request.user;
      const deliveryId = request.params.id;
      const delivery = await Delivery.findById(deliveryId);

      if (!delivery) {
        return response.status(204).end();
      }

      const {
        orderId,
        receiverName,
        receiverCpf,
        receiverIsOwner,
        geographicLocation,
      } = request.body;

      delivery.userId = userId;
      delivery.orderId = orderId || delivery.orderId;
      delivery.receiverName = receiverName || delivery.receiverName;
      delivery.receiverCpf = receiverCpf || delivery.receiverCpf;
      delivery.receiverIsOwner = receiverIsOwner || delivery.receiverIsOwner;
      delivery.geographicLocation = geographicLocation ||
        delivery.geographicLocation;

      await delivery.save();
      return response.json({ message: 'Delivery updated!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async deleteDelivery(request, response) {
    try {
      const deliveryId = request.params.id;
      const delivery = await Delivery.findByIdAndRemove(deliveryId);

      if (!delivery) {
        return response.status(204).end();
      }

      return response.json({ message: 'Delivery deleted!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  }
}
