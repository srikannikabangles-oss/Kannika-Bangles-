require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    type: String,
    name: String,
    category: String,
    price: Number,
    originalPrice: Number,
    image: String,
    images: [String],
    description: String,
    material: String,
    finish: String,
    stones: String,
    sizes: [String],
    inStock: Boolean,
    badge: String,
    featured: Boolean
  });
  const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

  // 1. Delete all existing necklaces
  await Product.deleteMany({ category: 'necklaces' });
  console.log('Removed old necklaces from MongoDB.');

  // 2. Define the exact remaining necklaces and prices
  const activeNecklaces = [
    { num: 1, file: 'IMG-20260717-WA0002.jpg', price: 920, originalPrice: 1450, badge: 'bestseller' },
    { num: 2, file: 'IMG-20260717-WA0003.jpg', price: 1080, originalPrice: 1600, badge: 'featured' },
    { num: 3, file: 'IMG-20260717-WA0004.jpg', price: 840, originalPrice: 1300, badge: null },
    { num: 4, file: 'IMG-20260717-WA0007.jpg', price: 1680, originalPrice: 2200, badge: 'trending' },
    { num: 5, file: 'IMG-20260717-WA0012.jpg', price: 4640, originalPrice: 5800, badge: 'royal' },
    { num: 6, file: 'IMG-20260717-WA0013.jpg', price: 2360, originalPrice: 3100, badge: 'new' }
  ];

  let nextId = 29;
  for (const item of activeNecklaces) {
    await Product.create({
      id: nextId++,
      type: 'necklaces',
      name: `Necklace ${item.num}`,
      category: 'necklaces',
      price: item.price,
      originalPrice: item.originalPrice,
      image: `images/necklaces/${item.file}`,
      images: [`images/necklaces/${item.file}`],
      description: `Handcrafted Necklace ${item.num} featuring premium gold polish and traditional artisanal finish.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Finish",
      stones: "Kundan, AD Stones & Faux Pearls",
      sizes: ["Standard"],
      inStock: true,
      badge: item.badge,
      featured: true
    });
  }
  console.log(`Added ${activeNecklaces.length} active necklaces to MongoDB.`);

  // 3. Fetch all active products
  const allDbProducts = await Product.find({}).sort({ id: 1 });
  const allBangles = allDbProducts.filter(p => p.category === 'bangles');
  const allPendants = allDbProducts.filter(p => p.category === 'pendant-sets');
  const allNecklaces = allDbProducts.filter(p => p.category === 'necklaces');
  const allEarrings = allDbProducts.filter(p => p.category === 'earrings');

  console.log(`Database Counts -> Total: ${allDbProducts.length}, Bangles: ${allBangles.length}, Pendants: ${allPendants.length}, Necklaces: ${allNecklaces.length}, Earrings: ${allEarrings.length}`);

  // Create mixed sequence
  const mixed = [];
  const maxLen = Math.max(allBangles.length, allNecklaces.length, allPendants.length, allEarrings.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < allBangles.length) mixed.push(allBangles[i]);
    if (i < allNecklaces.length) mixed.push(allNecklaces[i]);
    if (i < allPendants.length) mixed.push(allPendants[i]);
    if (i < allEarrings.length) mixed.push(allEarrings[i]);
  }

  const cleanProducts = mixed.map(p => ({
    id: p.id,
    type: p.category || p.type,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice || (p.price + 500),
    image: p.image,
    images: p.images || [p.image],
    description: p.description || `Handcrafted ${p.name} with premium gold polish & traditional artistry.`,
    material: p.material || "Brass Base, Micro Gold Plated",
    finish: p.finish || "Antique Gold Finish",
    stones: p.stones || "Kundan, AD Stones & Faux Pearls",
    sizes: p.sizes || ["Standard"],
    inStock: p.inStock !== false,
    badge: p.badge || null,
    featured: true
  }));

  const productsJsContent = `/* =====================================================
   KANNIKA BANGLES — Full Product Data Catalog (Updated Pricing)
   ===================================================== */

const PRODUCTS = ${JSON.stringify(cleanProducts, null, 2)};

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "gem", count: ${cleanProducts.length} },
  { id: "bangles", name: "Bangles", icon: "circle", count: ${allBangles.length} },
  { id: "pendant-sets", name: "Pendant Sets", icon: "sparkles", count: ${allPendants.length} },
  { id: "necklaces", name: "Necklaces", icon: "gem", count: ${allNecklaces.length} },
  { id: "earrings", name: "Earrings", icon: "sparkles", count: ${allEarrings.length} }
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "Absolutely stunning jewellery collection! The bridal jewellery and bangles are so intricate and elegant. Everyone complimented me. Thank you Kannika Bangles!",
    date: "March 2025"
  },
  {
    name: "Deepa R.",
    location: "Malleshwaram, Bangalore",
    rating: 5,
    text: "Best bangle and necklace showroom in Bangalore! Their antique gold finish looks just like real heirloom gold jewellery.",
    date: "February 2025"
  },
  {
    name: "Ananya Hegde",
    location: "Jayanagar, Bangalore",
    rating: 5,
    text: "I ordered the bridal choker set and bangles for my sister's wedding. Excellent quality and swift delivery across Bangalore.",
    date: "January 2025"
  }
];

// Helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function formatPrice(price) {
  return '?' + price.toLocaleString('en-IN');
}

function getProductImageUrl(imagePath) {
  if (!imagePath) return '';
  if (/^(?:https?:)?\\/\\//i.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath;
  }
  return \`/\${imagePath}\`;
}

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '?'.repeat(fullStars);
  if (hasHalf) stars += '½';
  stars += '?'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  return stars;
}
`;

  fs.writeFileSync('js/products.js', productsJsContent, 'utf8');
  console.log('js/products.js has been updated with the 46 products!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
