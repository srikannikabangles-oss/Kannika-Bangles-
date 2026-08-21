require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const productSchema = new mongoose.Schema({
    id: Number, name: String, category: String, price: Number, originalPrice: Number
  });
  const Product = mongoose.model('Product', productSchema);

  const updates = [
    { id: 1, price: 960 },
    { id: 2, price: 1060 },
    { id: 3, price: 1040 },
    { id: 4, price: 1050 },
    { id: 5, price: 1900 },
    { id: 6, price: 1120 },
    { id: 7, price: 1050 },
    { id: 8, price: 1430 },
    { id: 9, price: 1700 },
    { id: 10, price: 980 },
    { id: 11, price: 1200 },
    { id: 12, price: 1980 },
  ];

  for (let u of updates) {
    await Product.updateOne({ id: u.id }, { 
      $set: { 
        price: u.price,
        originalPrice: u.price + 500
      } 
    });
    console.log('Updated Bangle ' + u.id + ' to Rs ' + u.price);
  }

  console.log('Done updating prices.');
  process.exit(0);
}).catch(err => console.error(err));
