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

  const productData = [
    // 14 BANGLES
    { id: 1, name: "Antique Gold Kada", category: "bangles", price: 960, originalPrice: 1400, image: "images/bangles/IMG-20260805-WA0007.jpg", badge: "bestseller", sizes: ["2.4", "2.6", "2.8"] },
    { id: 2, name: "Ruby Bridal Bangle", category: "bangles", price: 1060, originalPrice: 1550, image: "images/bangles/IMG-20260805-WA0008.jpg", badge: "new", sizes: ["2.4", "2.6", "2.8"] },
    { id: 3, name: "Floral Diamond Bangle", category: "bangles", price: 1040, originalPrice: 1500, image: "images/bangles/IMG-20260805-WA0009.jpg", badge: "popular", sizes: ["2.4", "2.6", "2.8"] },
    { id: 4, name: "Classic Temple Kada", category: "bangles", price: 1050, originalPrice: 1550, image: "images/bangles/IMG-20260805-WA0010.jpg", badge: "trending", sizes: ["2.4", "2.6", "2.8"] },
    { id: 5, name: "Grand Royal Kada", category: "bangles", price: 1900, originalPrice: 2500, image: "images/bangles/IMG-20260805-WA0011.jpg", badge: "royal", sizes: ["2.4", "2.6", "2.8"] },
    { id: 6, name: "Peacock Gold Bangle", category: "bangles", price: 1120, originalPrice: 1600, image: "images/bangles/IMG-20260805-WA0012.jpg", badge: null, sizes: ["2.4", "2.6", "2.8"] },
    { id: 7, name: "Kundan Bridal Bangle", category: "bangles", price: 1050, originalPrice: 1500, image: "images/bangles/IMG-20260805-WA0013.jpg", badge: "featured", sizes: ["2.4", "2.6", "2.8"] },
    { id: 8, name: "Traditional Gold Kada", category: "bangles", price: 1430, originalPrice: 1950, image: "images/bangles/IMG-20260805-WA0014.jpg", badge: null, sizes: ["2.4", "2.6", "2.8"] },
    { id: 9, name: "Heritage Kemp Bangle", category: "bangles", price: 1700, originalPrice: 2300, image: "images/bangles/IMG-20260805-WA0015.jpg", badge: "trending", sizes: ["2.4", "2.6", "2.8"] },
    { id: 10, name: "Floral Stone Bangle", category: "bangles", price: 980, originalPrice: 1400, image: "images/bangles/IMG-20260805-WA0016.jpg", badge: null, sizes: ["2.4", "2.6", "2.8"] },
    { id: 11, name: "Filigree Gold Kada", category: "bangles", price: 1200, originalPrice: 1700, image: "images/bangles/IMG-20260805-WA0017.jpg", badge: null, sizes: ["2.4", "2.6", "2.8"] },
    { id: 12, name: "Imperial Bridal Kada", category: "bangles", price: 1980, originalPrice: 2600, image: "images/bangles/IMG-20260805-WA0018.jpg", badge: "royal", sizes: ["2.4", "2.6", "2.8"] },
    { id: 13, name: "Delicate Stone Bangle", category: "bangles", price: 900, originalPrice: 1300, image: "images/bangles/IMG-20260805-WA0019.jpg", badge: null, sizes: ["2.4", "2.6", "2.8"] },
    { id: 14, name: "Royal Antique Bangle", category: "bangles", price: 1200, originalPrice: 1700, image: "images/bangles/IMG-20260805-WA0020.jpg", badge: "featured", sizes: ["2.4", "2.6", "2.8"] },

    // 14 PENDANT SETS
    { id: 15, name: "Floral AD Pendant", category: "pendant-sets", price: 1380, originalPrice: 1950, image: "images/pendant-sets/IMG-20260821-WA0005.jpg", badge: "bestseller", sizes: ["Standard"] },
    { id: 16, name: "Peacock Jadau Set", category: "pendant-sets", price: 1500, originalPrice: 2100, image: "images/pendant-sets/IMG-20260821-WA0006.jpg", badge: "trending", sizes: ["Standard"] },
    { id: 17, name: "Emerald Drop Pendant", category: "pendant-sets", price: 1100, originalPrice: 1600, image: "images/pendant-sets/IMG-20260821-WA0007.jpg", badge: null, sizes: ["Standard"] },
    { id: 18, name: "Royal Ruby Pendant", category: "pendant-sets", price: 1480, originalPrice: 2000, image: "images/pendant-sets/IMG-20260821-WA0008.jpg", badge: "popular", sizes: ["Standard"] },
    { id: 19, name: "Kundan Temple Set", category: "pendant-sets", price: 1620, originalPrice: 2250, image: "images/pendant-sets/IMG-20260821-WA0009.jpg", badge: "featured", sizes: ["Standard"] },
    { id: 20, name: "Classic Pearl Pendant", category: "pendant-sets", price: 1380, originalPrice: 1900, image: "images/pendant-sets/IMG-20260821-WA0010.jpg", badge: null, sizes: ["Standard"] },
    { id: 21, name: "Antique Gold Set", category: "pendant-sets", price: 1260, originalPrice: 1750, image: "images/pendant-sets/IMG-20260821-WA0011.jpg", badge: null, sizes: ["Standard"] },
    { id: 22, name: "Grand Floral Pendant", category: "pendant-sets", price: 1440, originalPrice: 2000, image: "images/pendant-sets/IMG-20260821-WA0012.jpg", badge: "trending", sizes: ["Standard"] },
    { id: 23, name: "Bridal Diamond Set", category: "pendant-sets", price: 1750, originalPrice: 2400, image: "images/pendant-sets/IMG-20260821-WA0013.jpg", badge: "royal", sizes: ["Standard"] },
    { id: 24, name: "Heritage Kemp Pendant", category: "pendant-sets", price: 1500, originalPrice: 2100, image: "images/pendant-sets/IMG-20260821-WA0014.jpg", badge: null, sizes: ["Standard"] },
    { id: 25, name: "Imperial Jadau Set", category: "pendant-sets", price: 2200, originalPrice: 2950, image: "images/pendant-sets/IMG-20260821-WA0015.jpg", badge: "featured", sizes: ["Standard"] },
    { id: 26, name: "Royal Crown Pendant", category: "pendant-sets", price: 2000, originalPrice: 2700, image: "images/pendant-sets/IMG-20260821-WA0016.jpg", badge: null, sizes: ["Standard"] },
    { id: 27, name: "Emerald Pearl Set", category: "pendant-sets", price: 1380, originalPrice: 1900, image: "images/pendant-sets/IMG-20260821-WA0017.jpg", badge: null, sizes: ["Standard"] },
    { id: 28, name: "Classic Gold Pendant", category: "pendant-sets", price: 1100, originalPrice: 1550, image: "images/pendant-sets/IMG-20260821-WA0018.jpg", badge: null, sizes: ["Standard"] },

    // 6 NECKLACES
    { id: 29, name: "Floral Kundan Tikka", category: "necklaces", price: 920, originalPrice: 1450, image: "images/necklaces/IMG-20260717-WA0002.jpg", badge: "bestseller", sizes: ["Standard"] },
    { id: 30, name: "Ruby Pearl Tikka", category: "necklaces", price: 1080, originalPrice: 1600, image: "images/necklaces/IMG-20260717-WA0003.jpg", badge: "featured", sizes: ["Standard"] },
    { id: 31, name: "Emerald Gold Tikka", category: "necklaces", price: 840, originalPrice: 1300, image: "images/necklaces/IMG-20260717-WA0004.jpg", badge: null, sizes: ["Standard"] },
    { id: 32, name: "Royal Pearl Passa", category: "necklaces", price: 1680, originalPrice: 2200, image: "images/necklaces/IMG-20260717-WA0007.jpg", badge: "trending", sizes: ["Standard"] },
    { id: 33, name: "Grand Bridal Choker", category: "necklaces", price: 4640, originalPrice: 5800, image: "images/necklaces/IMG-20260717-WA0012.jpg", badge: "royal", sizes: ["Standard"] },
    { id: 34, name: "Kundan Pearl Choker", category: "necklaces", price: 2360, originalPrice: 3100, image: "images/necklaces/IMG-20260717-WA0013.jpg", badge: "new", sizes: ["Standard"] },

    // 12 EARRINGS
    { id: 35, name: "Floral Pearl Jhumka", category: "earrings", price: 760, originalPrice: 1150, image: "images/earrings/IMG-20260717-WA0006.jpg", badge: "bestseller", sizes: ["Standard"] },
    { id: 36, name: "Classic Temple Jhumka", category: "earrings", price: 2620, originalPrice: 3400, image: "images/earrings/IMG-20260720-WA0017.jpg", badge: "featured", sizes: ["Standard"] },
    { id: 37, name: "Grand Kemp Jhumka", category: "earrings", price: 3750, originalPrice: 4800, image: "images/earrings/IMG-20260720-WA0019.jpg", badge: "trending", sizes: ["Standard"] },
    { id: 38, name: "Royal Peacock Jhumka", category: "earrings", price: 3950, originalPrice: 5100, image: "images/earrings/IMG-20260720-WA0020.jpg", badge: null, sizes: ["Standard"] },
    { id: 39, name: "Ruby Stone Jhumka", category: "earrings", price: 3220, originalPrice: 4200, image: "images/earrings/IMG-20260720-WA0023.jpg", badge: null, sizes: ["Standard"] },
    { id: 40, name: "Emerald Stud Jhumka", category: "earrings", price: 2850, originalPrice: 3700, image: "images/earrings/IMG-20260720-WA0025.jpg", badge: "featured", sizes: ["Standard"] },
    { id: 41, name: "Pearl Drop Earring", category: "earrings", price: 2250, originalPrice: 2900, image: "images/earrings/IMG-20260720-WA0026.jpg", badge: null, sizes: ["Standard"] },
    { id: 42, name: "Heritage Jadau Jhumka", category: "earrings", price: 4760, originalPrice: 6200, image: "images/earrings/IMG-20260720-WA0027.jpg", badge: "royal", sizes: ["Standard"] },
    { id: 43, name: "Floral Gold Earring", category: "earrings", price: 2160, originalPrice: 2800, image: "images/earrings/IMG-20260720-WA0028.jpg", badge: null, sizes: ["Standard"] },
    { id: 44, name: "Antique Ruby Studs", category: "earrings", price: 2400, originalPrice: 3100, image: "images/earrings/IMG-20260720-WA0031.jpg", badge: "bestseller", sizes: ["Standard"] },
    { id: 45, name: "Bridal Kemp Drops", category: "earrings", price: 3760, originalPrice: 4900, image: "images/earrings/IMG-20260720-WA0032.jpg", badge: "trending", sizes: ["Standard"] },
    { id: 46, name: "Peacock Temple Studs", category: "earrings", price: 2600, originalPrice: 3400, image: "images/earrings/IMG-20260720-WA0033.jpg", badge: "new", sizes: ["Standard"] }
  ];

  await Product.deleteMany({});
  console.log('Cleared old products from MongoDB.');

  for (const item of productData) {
    await Product.create({
      id: item.id,
      type: item.category,
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      images: [item.image],
      description: `Handcrafted ${item.name} featuring premium micro gold polish and intricate artisanal artistry.`,
      material: "Brass Base, Micro Gold Plated",
      finish: "Antique Gold Polish",
      stones: "Kundan, AD Stones & Faux Pearls",
      sizes: item.sizes || ["Standard"],
      inStock: true,
      badge: item.badge,
      featured: true
    });
  }
  console.log(`Inserted ${productData.length} products with simple 2-3 word names into MongoDB.`);

  // Create mixed list for /shop
  const bangles = productData.filter(p => p.category === 'bangles');
  const pendants = productData.filter(p => p.category === 'pendant-sets');
  const necklaces = productData.filter(p => p.category === 'necklaces');
  const earrings = productData.filter(p => p.category === 'earrings');

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
    type: p.category,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    images: [p.image],
    description: `Handcrafted ${p.name} with premium gold polish & traditional artistry.`,
    material: "Brass Base, Micro Gold Plated",
    finish: "Antique Gold Polish",
    stones: "Kundan, AD Stones & Faux Pearls",
    sizes: p.sizes || ["Standard"],
    inStock: true,
    badge: p.badge || null,
    featured: true
  }));

  const productsJsContent = `/* =====================================================
   KANNIKA BANGLES — Full Product Data Catalog (Simple Naming)
   ===================================================== */

const PRODUCTS = ${JSON.stringify(cleanProducts, null, 2)};

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "gem", count: ${cleanProducts.length} },
  { id: "bangles", name: "Bangles", icon: "circle", count: ${bangles.length} },
  { id: "pendant-sets", name: "Pendant Sets", icon: "sparkles", count: ${pendants.length} },
  { id: "necklaces", name: "Necklaces", icon: "gem", count: ${necklaces.length} },
  { id: "earrings", name: "Earrings", icon: "sparkles", count: ${earrings.length} }
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
  console.log('js/products.js has been updated with simple 2-3 word product names!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
