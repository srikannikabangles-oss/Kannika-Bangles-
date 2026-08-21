const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kannika', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected for Seeding'))
.catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  material: { type: String },
  finish: { type: String },
  stones: { type: String },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  badge: { type: String, default: null },
  featured: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

async function seed() {
  const images = fs.readdirSync('./images/products').filter(f => f.endsWith('.jpg'));
  
  let necklaces = images.filter(f => f.startsWith('necklaces_'));
  let earrings = images.filter(f => f.startsWith('earrings_'));

  // get max id to start from
  let maxProduct = await Product.findOne().sort({ id: -1 });
  let nextId = maxProduct ? maxProduct.id + 1 : 1;

  const getDummyPrice = () => Math.floor(Math.random() * (12000 - 1500) + 1500);

  for (let file of necklaces) {
    const existing = await Product.findOne({ image: 'images/products/' + file });
    if (!existing) {
      let price = getDummyPrice();
      await Product.create({
        id: nextId++,
        type: 'Necklace',
        name: 'Bridal Kundan Necklace ' + nextId,
        category: 'necklaces',
        price: price,
        originalPrice: price + 1500,
        image: 'images/products/' + file,
        images: ['images/products/' + file],
        description: 'Exquisite bridal necklace featuring premium quality kundan work. Perfect for weddings and grand occasions.',
        material: 'Brass/Copper Alloy',
        finish: 'Antique Gold',
        sizes: ['Standard'],
        inStock: true
      });
      console.log('Added ' + file);
    }
  }

  for (let file of earrings) {
    const existing = await Product.findOne({ image: 'images/products/' + file });
    if (!existing) {
      let price = Math.floor(getDummyPrice() / 2); // cheaper for earrings
      await Product.create({
        id: nextId++,
        type: 'Earrings',
        name: 'Designer Jhumka ' + nextId,
        category: 'earrings',
        price: price,
        originalPrice: price + 500,
        image: 'images/products/' + file,
        images: ['images/products/' + file],
        description: 'Traditional heavy jhumka with intricate detailing. Complements bridal attire perfectly.',
        material: 'Brass/Copper Alloy',
        finish: 'Antique Gold',
        sizes: ['Standard'],
        inStock: true
      });
      console.log('Added ' + file);
    }
  }

  console.log('Seeding Complete');
  mongoose.connection.close();
}

seed();
