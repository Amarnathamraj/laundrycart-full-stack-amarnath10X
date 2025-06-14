// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  pricePerUnit: Number,
  description: String
});

module.exports = mongoose.model('Product', productSchema);
//HERE I USED DIRECTLY FRONT END TO HAVE NAME,IMGMOPRICEPRUNIT
//proviided in frontend only istaed of FETCHING from backend
//no need of file delete it 