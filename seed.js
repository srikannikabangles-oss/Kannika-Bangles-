const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://srikannikabangles_db_user:EvGQmjlBJeWm5bCn@cluster0.kixh6yd.mongodb.net/kannika_bangles?retryWrites=true&w=majority&appName=Cluster0";

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
  material: { type: String },
  finish: { type: String },
  stones: { type: String },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  badge: { type: String, default: null },
  featured: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

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

const allProducts = Array.from({ length: 21 }, (_, index) => {
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

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully. Seeding products...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert only earring products
    const result = await Product.insertMany(allProducts);
    console.log(`Successfully seeded ${result.length} earring products into the database!`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
