const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required to seed the catalogue.');
}

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
  material: String,
  finish: String,
  stones: String,
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  badge: { type: String, default: null },
  featured: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

const bangleImages = [
  'IMG-20260805-WA0007.jpg', 'IMG-20260805-WA0008.jpg', 'IMG-20260805-WA0009.jpg',
  'IMG-20260805-WA0010.jpg', 'IMG-20260805-WA0011.jpg', 'IMG-20260805-WA0012.jpg',
  'IMG-20260805-WA0013.jpg', 'IMG-20260805-WA0014.jpg', 'IMG-20260805-WA0015.jpg',
  'IMG-20260805-WA0016.jpg', 'IMG-20260805-WA0017.jpg', 'IMG-20260805-WA0018.jpg',
  'IMG-20260805-WA0019.jpg', 'IMG-20260805-WA0020.jpg'
];

const pendantSetImages = [
  'IMG-20260821-WA0005.jpg', 'IMG-20260821-WA0006.jpg', 'IMG-20260821-WA0007.jpg',
  'IMG-20260821-WA0008.jpg', 'IMG-20260821-WA0009.jpg', 'IMG-20260821-WA0010.jpg',
  'IMG-20260821-WA0011.jpg', 'IMG-20260821-WA0012.jpg', 'IMG-20260821-WA0013.jpg',
  'IMG-20260821-WA0014.jpg', 'IMG-20260821-WA0015.jpg', 'IMG-20260821-WA0016.jpg',
  'IMG-20260821-WA0017.jpg', 'IMG-20260821-WA0018.jpg'
];

const badges = ['bestseller', 'new', 'featured', null, 'sale', null, 'featured', 'bestseller', null, 'new', null, 'featured', 'sale', null];

function createProducts({ startId, category, label, images, basePrice, size }) {
  return images.map((filename, index) => {
    const number = index + 1;
    const price = basePrice + index * 150;
    const name = `${label} - ${number}`;
    const image = `images/${category}/${filename}`;
    return {
      id: startId + index,
      type: category,
      name,
      category,
      price,
      originalPrice: price + 300,
      image,
      images: [image],
      description: `A handcrafted ${name.toLowerCase()} with an elegant heritage finish, prepared for bridal and festive styling.`,
      material: 'Premium Brass Base, Gold Plated',
      finish: index % 2 ? 'High Polish Royal Gold' : 'Antique Heritage Gold',
      stones: index % 3 ? 'Premium AD Stones & Pearls' : 'Kundan, Kemp Ruby & Emerald',
      sizes: [size],
      inStock: true,
      badge: badges[index],
      featured: index < 8
    };
  });
}

const allProducts = [
  ...createProducts({ startId: 1, category: 'bangles', label: 'Bangle', images: bangleImages, basePrice: 1499, size: '2.6' }),
  ...createProducts({ startId: 15, category: 'pendant-sets', label: 'Pendant Set', images: pendantSetImages, basePrice: 1999, size: 'Standard Set' })
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    const result = await Product.insertMany(allProducts);
    console.log(`Successfully seeded ${result.length} products: 14 bangles and 14 pendant sets.`);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
