require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  
  // 1. Rename Bangles (1..14)
  const bangles = await Product.find({ category: 'bangles' }).sort({ id: 1 });
  for (let i = 0; i < bangles.length; i++) {
    const num = i + 1;
    await Product.updateOne({ _id: bangles[i]._id }, {
      $set: {
        name: `Bangle ${num}`,
        type: 'bangles',
        featured: true
      }
    });
  }

  // 2. Rename Pendant Sets (1..14)
  const pendants = await Product.find({ category: 'pendant-sets' }).sort({ id: 1 });
  for (let i = 0; i < pendants.length; i++) {
    const num = i + 1;
    await Product.updateOne({ _id: pendants[i]._id }, {
      $set: {
        name: `Pendant Set ${num}`,
        type: 'pendant-sets',
        featured: true
      }
    });
  }

  // 3. Rename Necklaces (1..17)
  const necklaces = await Product.find({ category: 'necklaces' }).sort({ id: 1 });
  for (let i = 0; i < necklaces.length; i++) {
    const num = i + 1;
    await Product.updateOne({ _id: necklaces[i]._id }, {
      $set: {
        name: `Necklace ${num}`,
        type: 'necklaces',
        featured: true
      }
    });
  }

  // 4. Rename Earrings (1..24)
  const earrings = await Product.find({ category: 'earrings' }).sort({ id: 1 });
  for (let i = 0; i < earrings.length; i++) {
    const num = i + 1;
    await Product.updateOne({ _id: earrings[i]._id }, {
      $set: {
        name: `Earring ${num}`,
        type: 'earrings',
        featured: true
      }
    });
  }

  // Fetch all 69 updated products
  const allProducts = await Product.find({}).sort({ id: 1 });
  console.log(`Renamed all ${allProducts.length} products in MongoDB.`);

  // Write static catalog into js/products.js
  const cleanProducts = allProducts.map(p => ({
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
   KANNIKA BANGLES — Full Product Data Catalog (All Categories)
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
  console.log('js/products.js has been rewritten with all 69 products!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
