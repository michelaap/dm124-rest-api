const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new mongoose.Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverName: {
    type: String,
    required: false
  },
  receiverCpf: {
    type: String,
    required: false
  },
  receiverIsOwner: {
    type: Boolean,
    required: false
  },
  geographicLocation: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Delivery', DeliverySchema);
