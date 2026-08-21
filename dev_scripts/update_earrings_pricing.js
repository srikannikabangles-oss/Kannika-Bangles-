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

  const earringPrices = [
    { num: 1, file: 'IMG-20260717-WA0006.jpg', price: 760, originalPrice: 1150, badge: 'bestseller' },
    { num: 2, file: 'IMG-20260720-WA0017.jpg', price: 2620, originalPrice: 3400, badge: 'featured' },
    { num: 3, file: 'IMG-20260720-WA0019.jpg', price: 3750, originalPrice: 4800, badge: 'trending' },
    { num: 4, file: 'IMG-20260720-WA0020.jpg', price: 3950, originalPrice: 5100, badge: null },
    { num: 5, file: 'IMG-20260720-WA0023.jpg', price: 3220, originalPrice: 4200, badge: null },
    { num: 6, file: 'IMG-20260720-WA0025.jpg', price: 2850, originalPrice: 3700, badge: 'featured' },
    { num: 7, file: 'IMG-20260720-WA0026.jpg', price: 2250, originalPrice: 2900, badge: null },
    { num: 8, file: 'IMG-20260720-WA0027.jpg', price: 4760, originalPrice: 6200, badge: 'royal' },
    { num: 9, file: 'IMG-20260720-WA0028.jpg', price: 2160, originalPrice: 2800, badge: null },
    { num: 10, file: 'IMG-20260720-WA0031.jpg', price: 2400, originalPrice: 3100, badge: 'bestseller' },
    { num: 11, file: 'IMG-20260720-WA0032.jpg', price: 3760, originalPrice: 4900, badge: 'trending' },
    { num: 12, file: 'IMG-20260720-WA0033.jpg', price: 2600, originalPrice: 3400, badge: 'new' }
  ];

  // 1. Delete all existing earrings from MongoDB
  await Product.deleteMany({ category: 'earrings' });
  console.log('Removed old earrings from MongoDB.');

  // 2. Insert updated earrings
  let nextId = 35;
  for (const item of earringPrices) {
    await Product.create({
      id: nextId++,
      type: 'earrings',
      name: `Earring ${item.num}`,
      category: 'earrings',
      price: item.price,
      originalPrice: item.originalPrice,
      image: `images/earrings/${item.file}`,
      images: [`images/earrings/${item.file}`],
      description: `Designer Earring ${item.num} featuring intricate jhumka styling and lightweight comfortable fit.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Polish",
      stones: "Ruby, Emerald, Kemp & AD Stones",
      sizes: ["Standard"],
      inStock: true,
      badge: item.badge,
      featured: true
    });
  }
  console.log(`Inserted ${earringPrices.length} updated Earrings to MongoDB.`);

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
  console.log('js/products.js has been updated with the 46 products and new earrings pricing!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
