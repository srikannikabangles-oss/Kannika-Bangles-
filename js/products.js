/* =====================================================
   KANNIKA BANGLES — Product Data Catalog
   ===================================================== */

const earringNamesMap = {
  1: "Mayuri Pearl & Kundan Drop Jhumkas",
  2: "Rajwada Filigree Temple Drops",
  3: "Padma Emerald & Kundan Tikka Drops",
  4: "Zivara CZ Diamond Floral Studs",
  5: "Surya Ruby & Kundan Drop Tops",
  6: "Chandrika Emerald Crescent Drops",
  7: "Gulnaar Antique Temple Jhumkas",
  8: "Maharani Emerald & Pearl Bridal Drops",
  9: "Aura Sleek Gold Dangler Earrings",
  10: "Noor AD Crystal Drop Studs",
  11: "Shahi Emerald Bridal Choker & Earrings",
  12: "Imperial Kundan Crescent Jhumkas",
  13: "Champa Round Jadau Floral Jhumkas",
  14: "Devyani Pearl Tiered Heritage Jhumkas",
  15: "Mayurika Jadau Peacock Drop Jhumkas",
  16: "Aishani Temple Dome Gold Jhumkas",
  17: "Ananya Pearl & Kundan Teardrop Danglers",
  18: "Kaveri Crescent Pearl Chandbalis",
  19: "Sunehri Broad Jadau Bridal Jhumkas",
  20: "Sanvi Polki Gold Stud Earrings",
  21: "Ambika Mango Motif Temple Jhumkas"
};

const pricesMap = {
  1: { price: 1080, orig: 1350 },
  2: { price: 1760, orig: 2200 },
  3: { price: 940, orig: 1175 },
  4: { price: 1300, orig: 1625 },
  5: { price: 840, orig: 1050 },
  6: { price: 920, orig: 1150 },
  7: { price: 1100, orig: 1375 },
  8: { price: 1680, orig: 2100 },
  9: { price: 560, orig: 700 },
  10: { price: 760, orig: 950 },
  11: { price: 3760, orig: 4700 },
  12: { price: 2600, orig: 3250 },
  13: { price: 2850, orig: 3563 },
  14: { price: 2620, orig: 3275 },
  15: { price: 3750, orig: 4688 },
  16: { price: 2250, orig: 2813 },
  17: { price: 3950, orig: 4938 },
  18: { price: 3220, orig: 4025 },
  19: { price: 4760, orig: 5950 },
  20: { price: 2400, orig: 3000 },
  21: { price: 2160, orig: 2700 }
};

const badges = ["bestseller", "new", "featured", null, "sale", null, "featured", "bestseller", null, "new", null, "featured", "sale", null, "bestseller", null, "featured", "new", null, "featured", "bestseller"];

const PRODUCTS = Array.from({ length: 21 }, (_, index) => {
  const i = index + 1;
  const item = pricesMap[i];
  const name = earringNamesMap[i];
  return {
    id: i,
    type: "earrings",
    name: name,
    category: "earrings",
    price: item.price,
    originalPrice: item.orig,
    image: `images/earrings/E${i}.jpeg`,
    images: [`images/earrings/E${i}.jpeg`],
    description: `Exquisitely handcrafted ${name.toLowerCase()} featuring intricate heritage metalwork, Kundan settings and premium gold finish.`,
    material: i % 2 === 0 ? "Brass Base, Micro Gold Plated" : "Pure Copper Base, Gold Plated",
    finish: i % 3 === 0 ? "Matte Antique Finish" : "High Polish Royal Gold",
    stones: i % 4 === 0 ? "Jadau Kundan & Pearls" : i % 4 === 1 ? "Premium AD Stones" : i % 4 === 2 ? "Kemp Ruby & Emerald" : "Kundan & Faux Pearls",
    sizes: ["Standard Pair"],
    inStock: true,
    badge: badges[index],
    featured: true
  };
});

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "gem", count: PRODUCTS.length },
  { id: "bangles", name: "Bangles", icon: "circle", count: 0 },
  { id: "necklaces", name: "Necklaces", icon: "sparkles", count: 0 },
  { id: "earrings", name: "Earrings", icon: "gem", count: PRODUCTS.length }
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "Absolutely stunning earring collection! The Mayuri Pearl Jhumkas and Surya Ruby tops are so intricate and elegant. Everyone complimented me. Thank you Kannika Bangles!",
    date: "March 2025"
  },
  {
    name: "Meera Reddy",
    location: "Mysore",
    rating: 5,
    text: "I've been buying from Kannika Bangles for years. Their antique finish earring collection is unmatched. The Devyani jhumka pair is gorgeous!",
    date: "February 2025"
  },
  {
    name: "Anjali Patel",
    location: "Bangalore",
    rating: 5,
    text: "The Kaveri Crescent Chandbalis are so sparkly and beautiful! Great quality for the price. Fast delivery as well!",
    date: "January 2025"
  }
];

// Realtime Database-backed Ratings Cache
let PRODUCT_RATINGS_CACHE = {};

async function fetchAllProductRatings() {
  try {
    const response = await fetch('/api/ratings');
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    PRODUCT_RATINGS_CACHE = data;
  } catch (e) {
    console.warn('Failed to fetch global ratings from MongoDB:', e);
  }
}

function getProductRealtimeRating(productId) {
  return PRODUCT_RATINGS_CACHE[productId] || { avg: 5.0, count: 0 };
}

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
  return '₹' + price.toLocaleString('en-IN');
}

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '★'.repeat(fullStars);
  if (hasHalf) stars += '½';
  stars += '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  return stars;
}
