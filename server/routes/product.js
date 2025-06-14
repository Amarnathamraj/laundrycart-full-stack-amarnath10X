const express = require('express');
const router = express.Router();
const Product = require('./model/product');

// getting all product types
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
