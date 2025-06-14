const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  orderDateTime: { type: String, required: true },
  storeLocation: { type: String, required: true },
  city: { type: String, required: true },
  storePhone: { type: String, required: true },
  totalItems: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true, default: 'Pending' },
  customerAddress: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    washes: [{ type: String }],
    price: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
