require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const productSchema = new mongoose.Schema({
    id: Number, name: String, category: String, price: Number, originalPrice: Number
  });
  const Product = mongoose.model('Product', productSchema);

  const updates = [
    { id: 13, price: 900 },
    { id: 14, price: 1200 }
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
