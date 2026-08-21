require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const productSchema = new mongoose.Schema({
    id: Number, name: String, category: String, price: Number, originalPrice: Number
  });
  const Product = mongoose.model('Product', productSchema);

  const updates = [
    { id: 15, price: 1380 },
    { id: 16, price: 1500 },
    { id: 17, price: 1100 },
    { id: 18, price: 1480 },
    { id: 19, price: 1620 },
    { id: 20, price: 1380 },
    { id: 21, price: 1260 },
    { id: 22, price: 1440 },
    { id: 23, price: 1750 },
    { id: 24, price: 1500 },
    { id: 25, price: 2200 },
    { id: 26, price: 2000 },
    { id: 27, price: 1380 },
    { id: 28, price: 1100 },
  ];

  for (let u of updates) {
    await Product.updateOne({ id: u.id }, { 
      $set: { 
        price: u.price,
        originalPrice: u.price + 500
      } 
    });
    console.log(`Updated Pendant Set (ID ${u.id}) to Rs ${u.price}`);
  }

  console.log('Done updating pendant set prices.');
  process.exit(0);
}).catch(err => console.error(err));
