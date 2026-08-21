require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

  // 1. Remove old necklaces and earrings
  await Product.deleteMany({ category: { $in: ['necklaces', 'earrings'] } });
  console.log('Removed old necklaces and earrings from MongoDB.');

  // 2. Fetch Bangles (1..14) and Pendant Sets (1..14)
  const bangles = await Product.find({ category: 'bangles' }).sort({ id: 1 });
  const pendants = await Product.find({ category: 'pendant-sets' }).sort({ id: 1 });

  // 3. New Necklace images
  const necklaceFiles = fs.readdirSync('images/necklaces').filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  const necklacePrices = [2400, 3200, 2800, 4500, 3900, 2600, 4200, 3500, 5200, 4800];
  
  let nextId = 29;
  const newNecklaces = [];
  for (let i = 0; i < necklaceFiles.length; i++) {
    const num = i + 1;
    const price = necklacePrices[i] || (2500 + i * 250);
    const prod = {
      id: nextId++,
      type: 'necklaces',
      name: `Necklace ${num}`,
      category: 'necklaces',
      price: price,
      originalPrice: price + 600,
      image: `images/necklaces/${necklaceFiles[i]}`,
      images: [`images/necklaces/${necklaceFiles[i]}`],
      description: `Handcrafted Necklace ${num} featuring traditional artisanal gold polish and exquisite stone work.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Finish",
      stones: "Kundan, AD Stones & Faux Pearls",
      sizes: ["Standard"],
      inStock: true,
      badge: num === 1 || num === 5 ? "bestseller" : num === 2 || num === 9 ? "featured" : null,
      featured: true
    };
    await Product.create(prod);
    newNecklaces.push(prod);
  }
  console.log(`Added ${newNecklaces.length} new Necklaces to MongoDB.`);

  // 4. New Earring images
  const earringFiles = fs.readdirSync('images/earrings').filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  const earringPrices = [850, 1100, 950, 1250, 1400, 1200, 980, 1350, 1050, 1600, 1450, 1150];

  const newEarrings = [];
  for (let i = 0; i < earringFiles.length; i++) {
    const num = i + 1;
    const price = earringPrices[i] || (850 + i * 80);
    const prod = {
      id: nextId++,
      type: 'earrings',
      name: `Earring ${num}`,
      category: 'earrings',
      price: price,
      originalPrice: price + 350,
      image: `images/earrings/${earringFiles[i]}`,
      images: [`images/earrings/${earringFiles[i]}`],
      description: `Designer Earring ${num} featuring intricate jhumka styling and lightweight comfortable fit.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Polish",
      stones: "Ruby, Emerald, Kemp & AD Stones",
      sizes: ["Standard"],
      inStock: true,
      badge: num === 1 || num === 6 ? "bestseller" : num === 3 || num === 10 ? "featured" : null,
      featured: true
    };
    await Product.create(prod);
    newEarrings.push(prod);
  }
  console.log(`Added ${newEarrings.length} new Earrings to MongoDB.`);

  // Total products in MongoDB
  const allDbProducts = await Product.find({}).sort({ id: 1 });
  console.log(`Total active products in database: ${allDbProducts.length}`);

  // Create mixed sequence for All Collections
  const allBangles = allDbProducts.filter(p => p.category === 'bangles');
  const allPendants = allDbProducts.filter(p => p.category === 'pendant-sets');
  const allNecklaces = allDbProducts.filter(p => p.category === 'necklaces');
  const allEarrings = allDbProducts.filter(p => p.category === 'earrings');

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
   KANNIKA BANGLES — Full Product Data Catalog (Curated 50 Products)
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
  console.log('Updated js/products.js successfully with the new curated 50 products!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
