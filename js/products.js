/* =====================================================
   KANNIKA BANGLES — Product Data Catalog
   ===================================================== */

const PRODUCTS = [
  {
    id: 1,
    type: "bangles",
    name: "bangle 1",
    category: "bangles",
    price: 6999,
    originalPrice: 8999,
    image: "images/bangles/bangle_1.jpg",
    images: ["images/bangles/bangle_1.jpg"],
    description: "A gorgeous set of gold-plated bangles studded with green emerald stones and brilliant CZ diamonds.",
    material: "Brass Base, Micro Gold Plated",
    finish: "High Polish Gold",
    stones: "Emerald, CZ Diamonds",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    inStock: true,
    badge: "bestseller",
    featured: true
  },
  {
    id: 2,
    type: "bangles",
    name: "bangle 2",
    category: "bangles",
    price: 4999,
    originalPrice: 6499,
    image: "images/bangles/bangle_2.jpg",
    images: ["images/bangles/bangle_2.jpg"],
    description: "An elegant set of two gold-plated bangles with intricate crystal detailing.",
    material: "Brass Base, Gold Plated",
    finish: "Rose Gold Polish",
    stones: "American Diamond (CZ)",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: "sale",
    featured: true
  },
  {
    id: 3,
    type: "bangles",
    name: "bangle 3",
    category: "bangles",
    price: 8999,
    originalPrice: 10999,
    image: "images/bangles/bangle_3.jpg",
    images: ["images/bangles/bangle_3.jpg"],
    description: "Exquisite broad gold Kada set adorned with multiple rows of sparkling CZ diamonds.",
    material: "Brass Base, Micro Gold Plated",
    finish: "Antique Gold",
    stones: "Jadau Kundan, Polki",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    inStock: true,
    badge: "new",
    featured: true
  },
  {
    id: 4,
    type: "bangles",
    name: "bangle 4",
    category: "bangles",
    price: 3499,
    originalPrice: 4299,
    image: "images/bangles/bangle_4.jpg",
    images: ["images/bangles/bangle_4.jpg"],
    description: "Traditional gold bangle set with delicate leaf patterns and detailed CZ settings.",
    material: "Brass Base, Micro Gold Plated",
    finish: "High Polish Gold",
    stones: "None",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: null,
    featured: true
  },
  {
    id: 5,
    type: "bangles",
    name: "bangle 5",
    category: "bangles",
    price: 5999,
    originalPrice: 7499,
    image: "images/bangles/bangle_5.jpg",
    images: ["images/bangles/bangle_5.jpg"],
    description: "Majestic gold-plated bridal Kada studded with brilliant white stones on a velvet cushion.",
    material: "Brass Base",
    finish: "Matte Antique Gold",
    stones: "Temple Ruby",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    inStock: true,
    badge: "featured",
    featured: true
  },
  {
    id: 6,
    type: "bangles",
    name: "bangle 6",
    category: "bangles",
    price: 1499,
    originalPrice: 1999,
    image: "images/bangles/bangle_6.jpg",
    images: ["images/bangles/bangle_6.jpg"],
    description: "Delicate set of gold-toned daily wear bangles with flower CZ motifs.",
    material: "Brass Base, Gold Toned",
    finish: "High Polish",
    stones: "None",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: null,
    featured: true
  },
  {
    id: 7,
    type: "bangles",
    name: "bangle 7",
    category: "bangles",
    price: 2499,
    originalPrice: 2999,
    image: "images/bangles/bangle_7.jpg",
    images: ["images/bangles/bangle_7.jpg"],
    description: "Sleek set of stackable gold-plated bangles studded with CZ crystals.",
    material: "Pure Brass",
    finish: "Natural Brass Polish",
    stones: "None",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    inStock: true,
    badge: null,
    featured: false
  },
  {
    id: 8,
    type: "bangles",
    name: "bangle 8",
    category: "bangles",
    price: 7999,
    originalPrice: 9999,
    image: "images/bangles/bangle_8.jpg",
    images: ["images/bangles/bangle_8.jpg"],
    description: "High-end traditional gold-plated broad bangles with detailed filigree patterns.",
    material: "Brass Base, Rose Gold Plated",
    finish: "Rose Gold & White Gold",
    stones: "Premium CZ Diamonds",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: "bestseller",
    featured: true
  },
  {
    id: 9,
    type: "bangles",
    name: "bangle 9",
    category: "bangles",
    price: 15999,
    originalPrice: 19999,
    image: "images/bangles/bangle_9.jpg",
    images: ["images/bangles/bangle_9.jpg"],
    description: "Exquisite micro-gold-plated pair of bangles studded with dual-row CZ diamonds.",
    material: "Brass Base, Heavy Gold Plated",
    finish: "Royal Gold",
    stones: "Kundan, Ruby, Emerald",
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    inStock: true,
    badge: "new",
    featured: true
  },
  {
    id: 10,
    type: "bangles",
    name: "bangle 10",
    category: "bangles",
    price: 4499,
    originalPrice: 5499,
    image: "images/bangles/bangle_10.jpg",
    images: ["images/bangles/bangle_10.jpg"],
    description: "Premium bridal gold choker set with matching jhumkas.",
    material: "Brass Base, Micro Gold Plated",
    finish: "Satin Gold",
    stones: "Pearl Accents",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: null,
    featured: false
  },
  {
    id: 11,
    type: "bangles",
    name: "bangle 11",
    category: "bangles",
    price: 3999,
    originalPrice: 4999,
    image: "images/bangles/bangle_11.jpg",
    images: ["images/bangles/bangle_11.jpg"],
    description: "Beautiful gold-toned single flower Kada studded with CZ crystals.",
    material: "Brass Base",
    finish: "Oxidized Antique",
    stones: "Temple Motifs",
    sizes: ["2.6", "2.8", "2.10"],
    inStock: true,
    badge: "featured",
    featured: false
  },
  {
    id: 12,
    type: "bangles",
    name: "bangle 12",
    category: "bangles",
    price: 11499,
    originalPrice: 13999,
    image: "images/bangles/bangle_12.jpg",
    images: ["images/bangles/bangle_12.jpg"],
    description: "Gorgeous set of daily wear gold-plated bangles with detailed star cuts.",
    material: "Brass Base, 22K Gold Plated",
    finish: "Traditional Gold",
    stones: "Jadau, Meenakari, Polki",
    sizes: ["2.4", "2.6", "2.8"],
    inStock: true,
    badge: "sale",
    featured: false
  },
  // Generate 24 real necklace products dynamically
  ...(function() {
    const necklaceImages = [
      "IMG-20260520-WA0012.jpg",
      "IMG-20260520-WA0013.jpg",
      "IMG-20260520-WA0019.jpg",
      "IMG-20260520-WA0021.jpg",
      "IMG-20260520-WA0022.jpg",
      "IMG-20260520-WA0023.jpg",
      "IMG-20260520-WA0024.jpg",
      "IMG-20260520-WA0025.jpg",
      "IMG-20260520-WA0028.jpg",
      "IMG-20260520-WA0035.jpg",
      "IMG-20260520-WA0037.jpg",
      "IMG-20260520-WA0052.jpg",
      "IMG-20260520-WA0054.jpg",
      "IMG-20260520-WA0056.jpg",
      "IMG-20260520-WA0062.jpg",
      "IMG-20260520-WA0063.jpg",
      "IMG-20260520-WA0064.jpg",
      "IMG-20260520-WA0067.jpg",
      "IMG-20260520-WA0068.jpg",
      "IMG-20260520-WA0076.jpg",
      "IMG-20260520-WA0079.jpg",
      "IMG-20260520-WA0080.jpg",
      "IMG-20260520-WA0083.jpg",
      "IMG-20260520-WA0084.jpg"
    ];

    const arr = [];
    for (let i = 0; i < necklaceImages.length; i++) {
      arr.push({
        id: 13 + i,
        type: "necklaces",
        name: `necklace ${i + 1}`,
        category: "necklaces",
        price: 8999 + ((i * 347) % 12000),
        originalPrice: 10999 + ((i * 347) % 15000),
        image: `images/Necklaces - kannika/${necklaceImages[i]}`,
        images: [`images/Necklaces - kannika/${necklaceImages[i]}`],
        description: `A magnificent necklace ${i + 1} from the House of Kannika, meticulously crafted by master heritage artisans for bridal and royal festive occasions.`,
        material: i % 2 === 0 ? "Brass Base, Micro Gold Plated" : "Pure Copper Base, Gold Plated",
        finish: i % 3 === 0 ? "Matte Antique Gold Finish" : i % 3 === 1 ? "Traditional Royal Gold" : "High Polish Gold",
        stones: i % 4 === 0 ? "Jadau Kundan, Pearls, Ruby" : i % 4 === 1 ? "Premium AD Stones" : i % 4 === 2 ? "Kemp Stones, Rice Pearls" : "Kundan, Faux Pearls & Emerald Beads",
        sizes: ["Adjustable", "Choker Style"],
        inStock: true,
        badge: i % 6 === 0 ? "bestseller" : i % 6 === 1 ? "new" : i % 6 === 2 ? "featured" : null,
        featured: i < 8
      });
    }
    return arr;
  })()
];

// Generate 24 real earring products
const earringNames = [
  "Antique Golden Jhumkas",
  "Elegant Pearl Drop Chandbalis",
  "Kundan Floral Studs",
  "Micro Gold Plated Hoop Earrings",
  "Brilliant AD Stone Drops",
  "Traditional Temple Jhumkas",
  "Royal Emerald Drop Chandbalis",
  "Chic Geometric Gold Studs",
  "Bridal Heritage Jhumka Set",
  "Classic Daily Wear Hoops",
  "Vibrant Ruby Floral Drops",
  "Antique Oxidized Bali Pairs",
  "Sparkling Diamond Cut Chandbalis",
  "Delicate Pearl Cluster Studs",
  "Regal Polki Drop Jhumkas",
  "Modern Matte Gold Balis",
  "Graceful Kemp Stone Drops",
  "Designer AD Stone Chandelier Studs",
  "Elegance Double Loop Jhumkas",
  "Traditional Mango Leaf Drops",
  "Premium CZ Diamond Studs",
  "Imperial Peacock Motif Chandbalis",
  "Filigree Craft Gold Drop Studs",
  "Heritage Kundan Chandelier Set"
];

for (let i = 1; i <= 24; i++) {
  PRODUCTS.push({
    id: 36 + i,
    type: "earrings",
    name: `earring ${i}`,
    category: "earrings",
    price: 1999 + ((i * 123) % 2500),
    originalPrice: 2999 + ((i * 123) % 3500),
    image: `images/earrings/earring_${i}.jpg`,
    images: [`images/earrings/earring_${i}.jpg`],
    description: `Exquisitely handcrafted ${earringNames[i-1].toLowerCase()} designed to elevate your elegance. Blends deep Indian traditional motifs with highly polished modern detailing.`,
    material: i % 2 === 0 ? "Brass Base, Micro Gold Plated" : "Pure Copper Base, Gold Plated",
    finish: i % 3 === 0 ? "Matte Antique Finish" : "High Polish Gold",
    stones: i % 4 === 0 ? "Jadau Kundan, Pearls" : i % 4 === 1 ? "Premium AD Stones" : i % 4 === 2 ? "Kemp Ruby & Emerald" : "None",
    sizes: ["Standard Pair"],
    inStock: true,
    badge: i % 6 === 0 ? "bestseller" : i % 6 === 1 ? "new" : i % 6 === 2 ? "featured" : null,
    featured: i <= 8
  });
}

// Map category to type strictly for all products
PRODUCTS.forEach(p => {
  p.category = p.type;
});

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "gem", count: PRODUCTS.length },
  { id: "bangles", name: "Bangles", icon: "circle", count: PRODUCTS.filter(p => p.category === "bangles").length },
  { id: "necklaces", name: "Necklaces", icon: "sparkles", count: PRODUCTS.filter(p => p.category === "necklaces").length },
  { id: "earrings", name: "Earrings", icon: "gem", count: PRODUCTS.filter(p => p.category === "earrings").length }
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "Absolutely stunning bridal set! The Kundan work is so intricate and the quality is exceptional. Everyone at my wedding was asking about my bangles. Thank you Kannika Bangles!",
    date: "March 2025"
  },
  {
    name: "Meera Reddy",
    location: "Mysore",
    rating: 5,
    text: "I've been buying from Kannika Bangles for years. Their antique finish collection is unmatched. The temple jewellery kadaa I got is absolutely gorgeous!",
    date: "February 2025"
  },
  {
    name: "Anjali Patel",
    location: "Bangalore",
    rating: 5,
    text: "The AD stone bangles are so sparkly and beautiful! Great quality for the price. The staff was super helpful in choosing the right size. Will definitely come back!",
    date: "January 2025"
  },
  {
    name: "Deepa Krishnan",
    location: "Chennai",
    rating: 4,
    text: "Ordered the Jadau set for my daughter's wedding and it was perfect. The meenakari work is breathtaking. Highly recommend for bridal jewellery.",
    date: "December 2024"
  },
  {
    name: "Kavya Nair",
    location: "Bangalore",
    rating: 5,
    text: "Love the everyday fashion bangles! They're lightweight, stylish, and the gold plating hasn't faded at all. Perfect for office wear. Great value!",
    date: "April 2025"
  }
];

// Realtime Database-backed Ratings Cache
let PRODUCT_RATINGS_CACHE = {};

async function fetchAllProductRatings() {
  if (typeof supabaseClient === 'undefined' || !supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('reviews')
      .select('product_id, rating');
    
    if (error) throw error;
    
    const ratings = {};
    if (data) {
      data.forEach(r => {
        const pid = r.product_id;
        if (!ratings[pid]) {
          ratings[pid] = { sum: 0, count: 0 };
        }
        ratings[pid].sum += r.rating;
        ratings[pid].count++;
      });
    }
    
    const newCache = {};
    for (const pid in ratings) {
      newCache[pid] = {
        avg: parseFloat((ratings[pid].sum / ratings[pid].count).toFixed(1)),
        count: ratings[pid].count
      };
    }
    PRODUCT_RATINGS_CACHE = newCache;
  } catch (e) {
    console.warn('Failed to fetch global ratings from Supabase:', e);
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
