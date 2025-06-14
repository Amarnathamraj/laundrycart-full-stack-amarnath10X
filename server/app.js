const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path')
//const auth = require('./middleware/authMiddleware'); 

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use('/images', express.static(path.join(__dirname, 'public/images')));
// MongoDB connection
// mongoose.connect('mongodb+srv://Amarnath:Amarnath@cluster0.6tnzv4s.mongodb.net/college?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb+srv://Amarnath:Amarnath@cluster0.6tnzv4s.mongodb.net/laundry?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const userCollection = require('./model/user');
const Order = require('./model/order');
//const ProductRoutes = require('./model/product');
const loginRoutes = require('./routes/login');

// Routes
app.use('/', loginRoutes);

//app.use('/api', ProductRoutes);

// POst  new order
app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('Received order data:', orderData); // Log incoming data for debugging

    
    const requiredFields = ['orderId', 'userId', 'orderDateTime', 'storeLocation', 'city', 'storePhone', 'totalItems', 'price','customerAddress', 'items'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});







// GEting all orders for a specific user
// https://laundrycardbackend-production.up.railway.app/orders'
app.get('/orders', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});



// UPDATE order status cancelling order
app.put('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
});


const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});