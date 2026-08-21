require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const srcNecklacesDir = 'C:/work/kannika bangles/public/images/Necklaces kannika/Necklaces kannika';
const srcEarringsDir = 'C:/work/kannika bangles/public/images/Earrings kannika/Earrings kannika';

const destNecklacesDir = path.join(process.cwd(), 'images/necklaces');
const destEarringsDir = path.join(process.cwd(), 'images/earrings');

// Clear destination folders
if (fs.existsSync(destNecklacesDir)) fs.rmSync(destNecklacesDir, { recursive: true, force: true });
if (fs.existsSync(destEarringsDir)) fs.rmSync(destEarringsDir, { recursive: true, force: true });

fs.mkdirSync(destNecklacesDir, { recursive: true });
fs.mkdirSync(destEarringsDir, { recursive: true });

const targetNecklaces = [
  'IMG-20260717-WA0002.jpg',
  'IMG-20260717-WA0003.jpg',
  'IMG-20260717-WA0004.jpg',
  'IMG-20260717-WA0007.jpg',
  'IMG-20260717-WA0008.jpg',
  'IMG-20260717-WA0009.jpg',
  'IMG-20260717-WA0010.jpg',
  'IMG-20260717-WA0011.jpg',
  'IMG-20260717-WA0012.jpg',
  'IMG-20260717-WA0013.jpg'
];

targetNecklaces.forEach(f => {
  const src = path.join(srcNecklacesDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(destNecklacesDir, f));
  }
});
console.log(`Copied ${targetNecklaces.length} exact necklaces.`);

const targetEarrings = [
  'IMG-20260717-WA0006.jpg',
  'IMG-20260720-WA0017.jpg',
  'IMG-20260720-WA0019.jpg',
  'IMG-20260720-WA0020.jpg',
  'IMG-20260720-WA0023.jpg',
  'IMG-20260720-WA0025.jpg',
  'IMG-20260720-WA0026.jpg',
  'IMG-20260720-WA0027.jpg',
  'IMG-20260720-WA0028.jpg',
  'IMG-20260720-WA0031.jpg',
  'IMG-20260720-WA0032.jpg',
  'IMG-20260720-WA0033.jpg'
];

targetEarrings.forEach(f => {
  const src = path.join(srcEarringsDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(destEarringsDir, f));
  }
});
console.log(`Copied ${targetEarrings.length} exact earrings.`);

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

  // 1. Delete all necklaces and earrings from MongoDB
  await Product.deleteMany({ category: { $in: ['necklaces', 'earrings'] } });

  // 2. Add exact 10 Necklaces
  const necklacePrices = [2400, 3200, 2800, 4500, 3900, 2600, 4200, 3500, 5200, 4800];
  let nextId = 29;
  for (let i = 0; i < targetNecklaces.length; i++) {
    const num = i + 1;
    const price = necklacePrices[i];
    await Product.create({
      id: nextId++,
      type: 'necklaces',
      name: `Necklace ${num}`,
      category: 'necklaces',
      price: price,
      originalPrice: price + 600,
      image: `images/necklaces/${targetNecklaces[i]}`,
      images: [`images/necklaces/${targetNecklaces[i]}`],
      description: `Handcrafted Necklace ${num} featuring traditional artisanal gold polish and exquisite stone work.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Finish",
      stones: "Kundan, AD Stones & Faux Pearls",
      sizes: ["Standard"],
      inStock: true,
      badge: num === 1 || num === 5 ? "bestseller" : num === 2 || num === 9 ? "featured" : null,
      featured: true
    });
  }

  // 3. Add exact 12 Earrings
  const earringPrices = [850, 1100, 950, 1250, 1400, 1200, 980, 1350, 1050, 1600, 1450, 1150];
  for (let i = 0; i < targetEarrings.length; i++) {
    const num = i + 1;
    const price = earringPrices[i];
    await Product.create({
      id: nextId++,
      type: 'earrings',
      name: `Earring ${num}`,
      category: 'earrings',
      price: price,
      originalPrice: price + 350,
      image: `images/earrings/${targetEarrings[i]}`,
      images: [`images/earrings/${targetEarrings[i]}`],
      description: `Designer Earring ${num} featuring intricate jhumka styling and lightweight comfortable fit.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Polish",
      stones: "Ruby, Emerald, Kemp & AD Stones",
      sizes: ["Standard"],
      inStock: true,
      badge: num === 1 || num === 6 ? "bestseller" : num === 3 || num === 10 ? "featured" : null,
      featured: true
    });
  }

  // 4. Fetch all active products
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
   KANNIKA BANGLES — Full Product Data Catalog (Exact 50 Products)
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
  console.log('js/products.js has been updated with the exact 50 products!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
