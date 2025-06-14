const mongoose = require('mongoose');
const Product = require('./model/Product');

mongoose.connect('mongodb://localhost:27017/laundry', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const seedProducts = [
  {
    name: "Shirts",
    image: "https://png.pngtree.com/png-clipart/20220718/ourmid/pngtree-formal-mens-blue-shirt-free-png-and-psd-png-image_6005525.png",
    pricePerUnit: 20,
    description: "Shirt washing service"
  },
  {
    name: "Jeans",
    image: "https://via.placeholder.com/60",
    pricePerUnit: 30,
    description: "Jeans washing service"
  },
  {
    name: "Joggers",
    image: "https://via.placeholder.com/60",
    pricePerUnit: 100,
    description: "Joggers deep clean"
  },
  {
    name: "T Shirts",
    image: "https://via.placeholder.com/60",
    pricePerUnit: 25,
    description: "T-Shirt wash & fold"
  }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log("Database seeded with products!");
  mongoose.connection.close();
};

seedDB();