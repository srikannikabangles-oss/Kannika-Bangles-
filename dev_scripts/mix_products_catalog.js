require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  
  const all = await Product.find({}).sort({ id: 1 });
  const bangles = all.filter(p => p.category === 'bangles');
  const necklaces = all.filter(p => p.category === 'necklaces');
  const pendants = all.filter(p => p.category === 'pendant-sets');
  const earrings = all.filter(p => p.category === 'earrings');

  const mixed = [];
  const maxLen = Math.max(bangles.length, necklaces.length, pendants.length, earrings.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < bangles.length) mixed.push(bangles[i]);
    if (i < necklaces.length) mixed.push(necklaces[i]);
    if (i < pendants.length) mixed.push(pendants[i]);
    if (i < earrings.length) mixed.push(earrings[i]);
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
    badge: p.badge || (p.id % 5 === 0 ? "bestseller" : p.id % 3 === 0 ? "featured" : null),
    featured: true
  }));

  const productsJsContent = `/* =====================================================
   KANNIKA BANGLES — Full Product Data Catalog (Mixed Interleaved)
   ===================================================== */

const PRODUCTS = ${JSON.stringify(cleanProducts, null, 2)};

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "gem", count: ${cleanProducts.length} },
  { id: "bangles", name: "Bangles", icon: "circle", count: ${cleanProducts.filter(p => p.category === 'bangles').length} },
  { id: "pendant-sets", name: "Pendant Sets", icon: "sparkles", count: ${cleanProducts.filter(p => p.category === 'pendant-sets').length} },
  { id: "necklaces", name: "Necklaces", icon: "gem", count: ${cleanProducts.filter(p => p.category === 'necklaces').length} },
  { id: "earrings", name: "Earrings", icon: "sparkles", count: ${cleanProducts.filter(p => p.category === 'earrings').length} }
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
  console.log('js/products.js updated with beautifully mixed products!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
