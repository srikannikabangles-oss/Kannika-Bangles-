const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const crypto = require('crypto');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Load MongoDB URI
let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  try {
    const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'db.json'), 'utf8'));
    MONGODB_URI = dbConfig.DB_CONNECTION_STRING;
  } catch (err) {
    MONGODB_URI = "mongodb+srv://srikannikabangles_db_user:EvGQmjlBJeWm5bCn@cluster0.kixh6yd.mongodb.net/kannika_bangles?retryWrites=true&w=majority&appName=Cluster0";
  }
}

app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Cache-Control for static assets
app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: '365d',
  immutable: true
}));
// Alias /css/style.css to /css/styles.css to avoid 404s
app.get(['/css/style.css', '/css/styles.css'], (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'css', 'styles.css'));
});

app.use('/css', express.static(path.join(__dirname, 'css'), {
  maxAge: 0,
  etag: false
}));
app.use('/js', express.static(path.join(__dirname, 'js'), {
  maxAge: 0,
  etag: false
}));

// Middleware to redirect .html requests to clean URLs (for SEO)
app.use((req, res, next) => {
  // Ignore API requests, internal routes, or Google Search Console verification files
  if (req.path.startsWith('/api') || req.path.startsWith('/node_modules') || /^\/google[a-z0-9]+\.html$/i.test(req.path)) {
    return next();
  }

  if (req.path === '/index.html') {
    const query = req.url.slice(11); // length of "/index.html"
    return res.redirect(301, '/' + query);
  }

  if (req.path.endsWith('.html')) {
    const cleanPath = req.path.slice(0, -5);
    const query = req.url.slice(req.path.length);
    return res.redirect(301, cleanPath + query);
  }

  next();
});

// 301 Redirects: old query-param URLs → clean category URLs
app.get(['/gallery', '/gallery.html'], (req, res) => {
  return res.redirect(301, '/shop');
});

app.get(['/shop.html', '/shop-template.html'], (req, res) => {
  const category = req.query.category;
  if (category === 'bangles') return res.redirect(301, '/bangles');
  if (category === 'earrings' || category === 'necklaces') return res.redirect(301, '/pendant-sets');
  return res.redirect(301, '/shop');
});

// 301 Redirects: duplicate bangle sizing blogs → canonical calculator (per PDF audit)
app.get([
  '/blog/bangle-size-guide-and-wrist-measurement',
  '/blog/indian-bangle-size-chart-how-to-measure-wrist-size'
], (req, res) => {
  return res.redirect(301, '/bangle-size-chart-calculator');
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// MongoDB Schemas & Models
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, index: true },
  code: { type: String },
  sku: { type: String },
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

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: Number, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });
cartItemSchema.index({ userId: 1, productId: 1, size: 1 }, { unique: true });
const CartItem = mongoose.model('CartItem', cartItemSchema);

const wishlistItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: Number, required: true }
}, { timestamps: true });
wishlistItemSchema.index({ userId: 1, productId: 1 }, { unique: true });
const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

const reviewSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { type: String, default: null },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });
const Review = mongoose.model('Review', reviewSchema);

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    unique: true, 
    sparse: true,
    default: () => 'KB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase() 
  },
  userId: { type: String, default: null },
  items: [{
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  shippingDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  }
}, { timestamps: true });
const Order = mongoose.model('Order', orderSchema);

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  message: { type: String, required: true },
  source: { type: String, default: 'Contact Form' },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'resolved', 'archived'], 
    default: 'new' 
  }
}, { timestamps: true });
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// Customer Schema & Model
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' }
  }
}, { timestamps: true });
const Customer = mongoose.model('Customer', customerSchema);

const CUSTOMER_SECRET = process.env.CUSTOMER_SECRET || process.env.ADMIN_SECRET || 'kannika_customer_secret_key_2026';

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function generateCustomerToken(customer) {
  const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days
  const payload = `${customer._id}:${customer.email}:${expiry}`;
  const signature = crypto.createHmac('sha256', CUSTOMER_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

function verifyCustomerToken(token) {
  try {
    if (!token) return null;
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [id, email, expiry, signature] = decoded.split(':');
    if (!id || !email || !expiry || !signature) return null;
    if (Date.now() > parseInt(expiry)) return null;
    const expectedSig = crypto.createHmac('sha256', CUSTOMER_SECRET).update(`${id}:${email}:${expiry}`).digest('hex');
    if (signature.length !== expectedSig.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return null;
    return { id, email };
  } catch (e) {
    return null;
  }
}

async function requireCustomerAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.query.token;
    const decoded = verifyCustomerToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const customer = await Customer.findById(decoded.id).select('-passwordHash -salt');
    if (!customer) {
      return res.status(401).json({ error: 'Customer account not found' });
    }
    req.customer = customer;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

// Admin Authentication Config & Helpers
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Kannika@Admin2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'kannika_bangles_admin_secret_key_2026';

function generateAdminToken(username) {
  const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  const payload = `${username}:${expiry}`;
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

function verifyAdminToken(token) {
  try {
    if (!token) return false;
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, expiry, signature] = decoded.split(':');
    if (!username || !expiry || !signature) return false;
    if (Date.now() > parseInt(expiry)) return false;
    if (username !== ADMIN_USERNAME) return false;
    const expectedSig = crypto.createHmac('sha256', ADMIN_SECRET).update(`${username}:${expiry}`).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  } catch (e) {
    return false;
  }
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : (req.query.token || req.headers['x-admin-token']);

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized: Admin login required' });
  }
  next();
}

// ─── LIGHTWEIGHT IN-MEMORY RATE LIMITING ───
function createRateLimiter({ windowMs, max, message }) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of hits.entries()) {
      if (now - record.startTime > windowMs) {
        hits.delete(key);
      }
    }
  }, Math.min(windowMs, 5 * 60 * 1000)).unref();

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    let record = hits.get(ip);
    if (!record || now - record.startTime > windowMs) {
      record = { count: 1, startTime: now };
      hits.set(ip, record);
      return next();
    }
    record.count++;
    if (record.count > max) {
      const retryAfterSec = Math.ceil((record.startTime + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      return res.status(429).json({
        success: false,
        error: message || 'Too many requests. Please try again later.'
      });
    }
    next();
  };
}

const adminLoginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many admin login attempts. Please try again after 15 minutes.'
});

const customerLoginLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please wait 5 minutes before trying again.'
});

const customerRegisterLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Account creation limit reached from this IP. Please try again later.'
});

const inquiryLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Inquiry limit reached. Please try again in a few minutes or message us on WhatsApp.'
});

const reviewLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Review submission limit reached. Please try again later.'
});

// API Routes

// 1. Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 2. Get product by ID or Slug
app.get(['/api/products/:idOrSlug', '/api/products/slug/:slug'], async (req, res) => {
  try {
    const param = (req.params.slug || req.params.idOrSlug || '').trim();
    let product = null;
    if (/^\d+$/.test(param)) {
      product = await Product.findOne({ id: parseInt(param) });
    } else {
      product = await Product.findOne({ slug: param.toLowerCase() });
      if (!product) {
        product = await Product.findOne({
          $or: [
            { code: new RegExp('^' + param + '$', 'i') },
            { name: new RegExp('^' + param.replace(/-/g, ' ') + '$', 'i') }
          ]
        });
      }
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching product' });
  }
});

// 3. Get Cart Items for a user
app.get('/api/cart', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const items = await CartItem.find({ userId });
    res.json(items.map(item => ({
      id: item.productId,
      size: item.size,
      quantity: item.quantity
    })));
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching cart' });
  }
});

// 4. Add/Update Cart Item
app.post('/api/cart', async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    if (!userId || !productId || !size || quantity === undefined) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const prodId = parseInt(productId);
    const qty = parseInt(quantity);

    // Try finding existing item
    let cartItem = await CartItem.findOne({ userId, productId: prodId, size });
    if (cartItem) {
      cartItem.quantity += qty;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId, productId: prodId, size, quantity: qty });
      await cartItem.save();
    }

    res.json({ success: true, item: cartItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error writing cart' });
  }
});

// 5. Update Cart Item Quantity directly
app.post('/api/cart/update', async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    if (!userId || !productId || !size || quantity === undefined) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const prodId = parseInt(productId);
    const qty = Math.max(1, parseInt(quantity));

    const cartItem = await CartItem.findOne({ userId, productId: prodId, size });
    if (cartItem) {
      cartItem.quantity = qty;
      await cartItem.save();
      res.json({ success: true, item: cartItem });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error updating cart item' });
  }
});

// 6. Remove Cart Item
app.post('/api/cart/remove', async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    if (!userId || !productId || !size) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    await CartItem.deleteOne({ userId, productId: parseInt(productId), size });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error removing cart item' });
  }
});

// 7. Clear Cart
app.post('/api/cart/clear', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    await CartItem.deleteMany({ userId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error clearing cart' });
  }
});

// 8. Merge Guest Cart Into User Cart
app.post('/api/cart/merge', async (req, res) => {
  try {
    const { userId, guestCart } = req.body;
    if (!userId || !guestCart || !Array.isArray(guestCart)) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    for (const item of guestCart) {
      const prodId = parseInt(item.id);
      const size = item.size || '2.6';
      const qty = parseInt(item.quantity) || 1;

      let cartItem = await CartItem.findOne({ userId, productId: prodId, size });
      if (cartItem) {
        cartItem.quantity += qty;
        await cartItem.save();
      } else {
        cartItem = new CartItem({ userId, productId: prodId, size, quantity: qty });
        await cartItem.save();
      }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error merging guest cart' });
  }
});

// 9. Get Wishlist for a user
app.get('/api/wishlist', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const items = await WishlistItem.find({ userId });
    res.json(items.map(item => item.productId));
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching wishlist' });
  }
});

// 10. Toggle Wishlist Item
app.post('/api/wishlist/toggle', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const prodId = parseInt(productId);
    const existing = await WishlistItem.findOne({ userId, productId: prodId });

    let added = false;
    if (existing) {
      await WishlistItem.deleteOne({ _id: existing._id });
    } else {
      const item = new WishlistItem({ userId, productId: prodId });
      await item.save();
      added = true;
    }

    res.json({ success: true, added });
  } catch (err) {
    res.status(500).json({ error: 'Server error toggling wishlist' });
  }
});

// 11. Get Reviews for a product
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json(reviews.map(r => ({
      name: r.name,
      rating: r.rating,
      comment: r.comment,
      date: new Date(r.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      verified: true
    })));
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching reviews' });
  }
});

// 12. Save Product Review
app.post('/api/reviews', reviewLimiter, async (req, res) => {
  try {
    const { productId, userId, name, rating, comment } = req.body;
    if (!productId || typeof name !== 'string' || !name.trim() || !rating || typeof comment !== 'string' || !comment.trim()) {
      return res.status(400).json({ error: 'Missing or invalid review parameters' });
    }

    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newReview = new Review({
      productId: parseInt(productId),
      userId: (userId && typeof userId === 'string') ? userId.trim() : null,
      name: name.trim().slice(0, 80),
      rating: parsedRating,
      comment: comment.trim().slice(0, 1000)
    });

    await newReview.save();
    res.json({ success: true, review: newReview });
  } catch (err) {
    console.error('[ERROR] saving review:', err);
    res.status(500).json({ error: 'Server error saving review' });
  }
});

// 13. Create New Order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, subtotal, shippingFee, total, shippingDetails } = req.body;
    if (!items || subtotal === undefined || shippingFee === undefined || total === undefined || !shippingDetails) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const mappedItems = items.map(item => ({
      productId: parseInt(item.productId || item.id),
      name: item.name,
      price: parseInt(item.price),
      size: item.size,
      quantity: parseInt(item.quantity)
    }));

    let effectiveUserId = (userId && userId !== 'guest') ? userId : null;
    if (!effectiveUserId) {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.query.token;
      const decoded = verifyCustomerToken(token);
      if (decoded) effectiveUserId = decoded.id;
    }

    const generatedOrderId = 'KB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const newOrder = new Order({
      orderId: generatedOrderId,
      userId: effectiveUserId,
      items: mappedItems,
      subtotal: parseFloat(subtotal),
      shippingFee: parseFloat(shippingFee),
      total: parseFloat(total),
      shippingDetails
    });

    await newOrder.save();
    res.json({ success: true, orderId: newOrder.orderId, id: newOrder._id });
  } catch (err) {
    console.error('[ORDER ERROR]', err);
    res.status(500).json({ error: 'Failed to process order. Please try again or complete booking via WhatsApp.' });
  }
});

// 14. Get Global Ratings Cache (Aggregated reviews)
app.get('/api/ratings', async (req, res) => {
  try {
    const ratings = await Review.aggregate([
      {
        $group: {
          _id: '$productId',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    const ratingCache = {};
    ratings.forEach(r => {
      ratingCache[r._id] = {
        avg: parseFloat(r.avgRating.toFixed(1)),
        count: r.count
      };
    });

    res.json(ratingCache);
  } catch (err) {
    res.status(500).json({ error: 'Server error compiling ratings' });
  }
});

// 15. Create New Inquiry / Contact Message (Public with Honeypot Bot Shield & Rate Limiting)
app.post('/api/inquiries', inquiryLimiter, async (req, res) => {
  try {
    const { name, email, phone, message, source, hp_check } = req.body;

    // Honeypot Shield: If hidden honeypot field is filled, silently discard bot submission
    if (hp_check && typeof hp_check === 'string' && hp_check.trim().length > 0) {
      console.log('[BOT BLOCKED] Honeypot field was filled by automated bot:', hp_check);
      return res.json({ 
        success: true, 
        message: 'Your inquiry has been submitted successfully!' 
      });
    }

    if (!name || !email || !message || typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = (phone || '').trim();
    const cleanMessage = message.trim();

    // Bot Pattern Detection:
    // 1. Dotted-gmail burner bots (e.g., a.z.i.w.o.m.o.b.u.b... with 3+ dots in username)
    const usernamePart = cleanEmail.split('@')[0] || '';
    const dotCount = (usernamePart.match(/\./g) || []).length;
    if (dotCount >= 3 && cleanEmail.endsWith('@gmail.com')) {
      console.log('[BOT BLOCKED] Dotted burner Gmail address detected:', cleanEmail);
      return res.json({ success: true, message: 'Your inquiry has been submitted successfully!' });
    }

    // 2. Random gibberish generator pattern (no spaces, length > 14, erratic upper/lowercase or unpronounceable consonant clusters)
    const isRandomGibberish = (str) => {
      if (str.length > 14 && !str.includes(' ') && !/[aeiouAEIOU]{2,}/.test(str)) return true;
      if (str.length > 18 && !str.includes(' ')) return true;
      return false;
    };
    if (isRandomGibberish(cleanName) || (cleanMessage.length > 18 && isRandomGibberish(cleanMessage))) {
      console.log('[BOT BLOCKED] Random gibberish bot string detected in name/message:', cleanName);
      return res.json({ success: true, message: 'Your inquiry has been submitted successfully!' });
    }

    const newInquiry = new Inquiry({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      source: source || 'Contact Form',
      status: 'new'
    });

    await newInquiry.save();
    res.json({ 
      success: true, 
      inquiryId: newInquiry._id,
      message: 'Your inquiry has been submitted successfully!' 
    });
  } catch (err) {
    console.error('[ERROR] saving inquiry:', err);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// ─── CUSTOMER AUTHENTICATION & PORTAL API ROUTES ───

// Customer Registration
app.post('/api/customer/register', customerRegisterLimiter, async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof password !== 'string' ||
        !name.trim() || !email.trim() || !phone.trim() || !password) {
      return res.status(400).json({ error: 'Full name, email, phone number, and password are required strings.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\s+/g, '');

    const existing = await Customer.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please sign in.' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);

    const customer = new Customer({
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      passwordHash,
      salt,
      address: address || {}
    });
    await customer.save();

    const token = generateCustomerToken(customer);
    return res.json({
      success: true,
      token,
      user: {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      },
      message: 'Account created successfully!'
    });
  } catch (err) {
    console.error('Customer register error:', err);
    res.status(500).json({ error: 'Failed to create account. Please try again later.' });
  }
});

// Customer Login (supports email or phone)
app.post('/api/customer/login', customerLoginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'Please enter your email/phone and password.' });
    }

    const cleanInput = email.trim().toLowerCase();
    const cleanPhone = email.trim().replace(/\s+/g, '');

    const customer = await Customer.findOne({
      $or: [
        { email: cleanInput },
        { phone: cleanPhone }
      ]
    });

    if (!customer) {
      return res.status(401).json({ error: 'Invalid email/phone or password. Please try again.' });
    }

    const hash = hashPassword(password, customer.salt);
    if (hash !== customer.passwordHash) {
      return res.status(401).json({ error: 'Invalid email/phone or password. Please try again.' });
    }

    const token = generateCustomerToken(customer);
    return res.json({
      success: true,
      token,
      user: {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      },
      message: 'Logged in successfully!'
    });
  } catch (err) {
    console.error('Customer login error:', err);
    res.status(500).json({ error: 'Failed to sign in. Please try again later.' });
  }
});

// Get Logged-in Customer Profile
app.get('/api/customer/me', requireCustomerAuth, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.customer._id.toString(),
      name: req.customer.name,
      email: req.customer.email,
      phone: req.customer.phone,
      address: req.customer.address
    }
  });
});

// Update Customer Profile & Address
app.put('/api/customer/profile', requireCustomerAuth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (name) req.customer.name = name.trim();
    if (phone) req.customer.phone = phone.trim().replace(/\s+/g, '');
    if (address) {
      req.customer.address = {
        street: address.street !== undefined ? address.street : req.customer.address?.street || '',
        city: address.city !== undefined ? address.city : req.customer.address?.city || '',
        state: address.state !== undefined ? address.state : req.customer.address?.state || '',
        pincode: address.pincode !== undefined ? address.pincode : req.customer.address?.pincode || ''
      };
    }
    await req.customer.save();

    res.json({
      success: true,
      user: {
        id: req.customer._id.toString(),
        name: req.customer.name,
        email: req.customer.email,
        phone: req.customer.phone,
        address: req.customer.address
      },
      message: 'Profile updated successfully!'
    });
  } catch (err) {
    console.error('Customer update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Customer Orders History (auto-links past orders by user id, phone, or email)
app.get('/api/customer/orders', requireCustomerAuth, async (req, res) => {
  try {
    const custId = req.customer._id.toString();
    const custPhone = req.customer.phone;
    const custEmail = req.customer.email;

    const query = {
      $or: [
        { userId: custId },
        { 'shippingDetails.phone': custPhone },
        { 'shippingDetails.phone': custPhone.replace(/^\+91/, '') },
        { 'shippingDetails.email': custEmail }
      ]
    };

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Customer orders error:', err);
    res.status(500).json({ error: 'Failed to fetch customer orders' });
  }
});

// ─── ADMIN API ROUTES ───

// Admin Login (Rate limited to 5 attempts / 15 minutes)
app.post('/api/admin/login', adminLoginLimiter, (req, res) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateAdminToken(username);
      return res.json({ 
        success: true, 
        token, 
        username,
        message: 'Admin authenticated successfully' 
      });
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  } catch (err) {
    res.status(500).json({ error: 'Server error processing admin login' });
  }
});

// Verify Admin Session Token
app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  res.json({ valid: true, username: ADMIN_USERNAME });
});

// Admin Dashboard Summary Statistics
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  try {
    const [totalInquiries, newInquiries, totalOrders, pendingOrders, totalProducts, outOfStockProducts, totalReviews] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Product.countDocuments(),
      Product.countDocuments({ inStock: false }),
      Review.countDocuments()
    ]);

    // Calculate total sales from orders
    const salesAggregate = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = salesAggregate.length > 0 ? salesAggregate[0].totalRevenue : 0;

    res.json({
      inquiries: { total: totalInquiries, new: newInquiries },
      orders: { total: totalOrders, pending: pendingOrders, revenue: totalRevenue },
      products: { total: totalProducts, outOfStock: outOfStockProducts },
      reviews: { total: totalReviews }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Admin: Get All Inquiries
app.get('/api/admin/inquiries', requireAdminAuth, async (req, res) => {
  try {
    const { status, limit } = req.query;
    const query = status ? { status } : {};
    const maxLimit = parseInt(limit) || 100;
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).limit(maxLimit);
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Admin: Update Inquiry Status
app.patch('/api/admin/inquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'resolved', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true, inquiry: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Admin: Delete Inquiry
app.delete('/api/admin/inquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// Admin: Get All Orders
app.get('/api/admin/orders', requireAdminAuth, async (req, res) => {
  try {
    const { status, limit } = req.query;
    const query = status ? { status } : {};
    const maxLimit = parseInt(limit) || 100;
    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(maxLimit);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Admin: Update Order Status
app.patch('/api/admin/orders/:id', requireAdminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Admin: Delete All Orders (for testing & maintenance cleanup)
app.delete('/api/admin/orders', requireAdminAuth, async (req, res) => {
  try {
    const result = await Order.deleteMany({});
    res.json({ success: true, message: `All orders deleted successfully (${result.deletedCount} orders removed).` });
  } catch (err) {
    console.error('[ADMIN DELETE ALL ORDERS ERROR]', err);
    res.status(500).json({ error: 'Failed to delete orders' });
  }
});

// Admin: Delete Order
app.delete('/api/admin/orders/:id', requireAdminAuth, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Admin: Get All Products (with complete catalog info)
app.get('/api/admin/products', requireAdminAuth, async (req, res) => {
  try {
    const products = await Product.find({}).sort({ id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Admin: Upload Product Image
app.post('/api/admin/upload-image', requireAdminAuth, async (req, res) => {
  try {
    const { base64Data, filename, category } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let ext = 'jpg';
    let buffer;
    if (matches && matches.length === 3) {
      const mime = matches[1];
      ext = mime.split('/')[1] || 'jpg';
      if (ext === 'jpeg') ext = 'jpg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(base64Data, 'base64');
    }

    const catFolder = (category && ['bangles', 'pendant-sets', 'necklaces', 'earrings'].includes(category)) ? category : 'products';
    const targetDir = path.join(__dirname, 'images', catFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const cleanFilename = `${Date.now()}_${(filename || 'product').replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;
    const filePath = path.join(targetDir, cleanFilename);
    fs.writeFileSync(filePath, buffer);

    const publicPath = `images/${catFolder}/${cleanFilename}`;
    res.json({ success: true, imagePath: publicPath });
  } catch (err) {
    console.error('[ERROR] uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image. Please check file format and try again.' });
  }
});

// Admin: Add New Product
app.post('/api/admin/products', requireAdminAuth, async (req, res) => {
  try {
    const { name, category, price, originalPrice, image, description, material, finish, stones, sizes, inStock, badge, featured } = req.body;
    if (!name || !category || price === undefined || originalPrice === undefined || !image || !description) {
      return res.status(400).json({ error: 'Missing required product fields' });
    }

    // Determine next sequential product ID
    const highestProduct = await Product.findOne().sort({ id: -1 });
    const nextId = highestProduct ? highestProduct.id + 1 : 1;

    const newProduct = new Product({
      id: nextId,
      type: category === 'pendant-sets' ? 'pendant-set' : category === 'necklaces' ? 'necklace' : category === 'earrings' ? 'earring' : 'bangle',
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      originalPrice: parseFloat(originalPrice),
      image: image.trim(),
      images: [image.trim()],
      description: description.trim(),
      material: material || 'Brass / Copper Alloy with 24K Gold Micro-Plating',
      finish: finish || 'Antique Matte Gold',
      stones: stones || 'Hand-set Kundan & AD Stones',
      sizes: Array.isArray(sizes) && sizes.length > 0 
        ? sizes 
        : (category === 'bangles' ? ['2.4', '2.6', '2.8'] : ['Standard']),
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      badge: badge || null,
      featured: Boolean(featured)
    });

    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error('[ERROR] saving new product:', err);
    res.status(500).json({ error: 'Failed to create product. Please check fields and try again.' });
  }
});

// Admin: Update Product
app.put('/api/admin/products/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const updated = await Product.findOneAndUpdate({ id }, updates, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin: Delete Product
app.delete('/api/admin/products/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Admin: Get All Reviews
app.get('/api/admin/reviews', requireAdminAuth, async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Admin: Delete Review
app.delete('/api/admin/reviews/:id', requireAdminAuth, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Helper function to format category names
function getCategoryDisplayName(cat) {
  const map = {
    'bangles': 'Bangles',
    'pendant-sets': 'Pendant Sets',
    'necklaces': 'Necklaces',
    'earrings': 'Earrings',
    'head-jewellery': 'Head Jewellery'
  };
  return map[cat] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ') : '');
}

function getProductSlug(product) {
  if (!product || !product.name) return '';
  return product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// 301 Redirect old numeric /product/:id and /product/:slug to canonical /products/:slug (per PDF audit)
app.get(['/product/:idOrSlug', '/product.html', '/product-template.html'], async (req, res, next) => {
  const param = (req.params.idOrSlug || req.query.id || req.query.slug || '').trim();
  if (!param) {
    return res.sendFile(path.join(process.cwd(), 'product-template.html'));
  }

  try {
    let product;
    if (/^\d+$/.test(param)) {
      product = await Product.findOne({ id: parseInt(param) });
    } else {
      product = await Product.findOne({ slug: param.toLowerCase() });
      if (!product) {
        product = await Product.findOne({
          $or: [
            { code: new RegExp('^' + param + '$', 'i') },
            { name: new RegExp('^' + param.replace(/-/g, ' ') + '$', 'i') }
          ]
        });
      }
    }

    if (product) {
      const slug = getProductSlug(product);
      return res.redirect(301, `/products/${slug}`);
    }

    return res.status(404).sendFile(path.join(process.cwd(), '404.html'));
  } catch (err) {
    return res.status(500).sendFile(path.join(process.cwd(), '500.html'));
  }
});

// SSR Canonical Product Page: /products/:slug (per PDF audit Page 10)
app.get('/products/:slug', async (req, res, next) => {
  const slug = (req.params.slug || '').trim().toLowerCase();
  if (!slug) {
    return res.redirect(301, '/shop');
  }

  try {
    let product = await Product.findOne({ slug: slug });
    if (!product) {
      // If numeric ID entered in slug parameter, look up by ID and 301 redirect
      if (/^\d+$/.test(slug)) {
        product = await Product.findOne({ id: parseInt(slug) });
        if (product) {
          return res.redirect(301, `/products/${getProductSlug(product)}`);
        }
      }
      const all = await Product.find({});
      product = all.find(p => getProductSlug(p) === slug);
    }

    if (!product) {
      return res.status(404).sendFile(path.join(process.cwd(), '404.html'));
    }

    const prodSlug = getProductSlug(product);
    if (slug !== prodSlug) {
      return res.redirect(301, `/products/${prodSlug}`);
    }

    let template = fs.readFileSync(path.join(process.cwd(), 'product-template.html'), 'utf8');

    // Dynamic Title & Meta per PDF audit recommendations (Pages 10-13)
    const seoTitle = `${product.name} | Bridal Jewellery Bangalore | Kannika`;
    const finishPart = product.finish || 'premium antique gold polish';
    const stonePart = product.stones ? `with ${product.stones}` : 'with intricate artisanal artistry';
    const seoDesc = `${product.name} in ${finishPart}, ${stonePart}. Available from Kannika Bangles Bangalore with express delivery and live WhatsApp inspection.`;
    const canonicalUrl = `https://kannikabangles.com/products/${prodSlug}`;
    const imageAbsUrl = `https://kannikabangles.com/${product.image.replace(/^\//, '')}`;

    // Reviews from mongoose database
    const ratingData = await Review.aggregate([
      { $match: { productId: product.id } },
      {
        $group: {
          _id: '$productId',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);
    const hasReviews = ratingData.length > 0 && ratingData[0].count > 0;
    const avgRating = hasReviews ? parseFloat(ratingData[0].avgRating.toFixed(1)) : 5.0;
    const reviewCount = hasReviews ? ratingData[0].count : 1;

    const prodCode = product.code || product.sku || (product.category === 'bangles' ? `KB-BAN-${String(product.id).padStart(3,'0')}` : product.category === 'pendant-sets' ? `KB-PEN-${String(product.id).padStart(3,'0')}` : product.category === 'necklaces' ? `KB-NEC-${String(product.id).padStart(3,'0')}` : product.category === 'head-jewellery' ? `KB-HDJ-${String(product.id).padStart(3,'0')}` : `KB-EAR-${String(product.id).padStart(3,'0')}`);
    const discount = product.originalPrice > product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const isBangle = product.category === 'bangles';
    const sizeLabel = isBangle ? 'Select Size (inches)' : 'Size & Fit';
    const sizeOptions = isBangle ? ['2.4', '2.6', '2.8'] : ['Free Size (Adjustable)'];

    const waText = encodeURIComponent(`*Inquiry from Sri Kannika Bangles Website*\n\nHello! I would like to inquire about / order this jewellery item:\n\n✨ *Product Name:* ${product.name}\n🏷️ *Product ID:* ${prodCode}\n📁 *Category:* ${getCategoryDisplayName(product.category)}\n🛍️ *Quantity:* 1\n💰 *Price:* ₹${product.price.toLocaleString('en-IN')}\n🔗 *Product Link:* https://kannikabangles.com/products/${prodSlug}\n\nPlease confirm stock availability and Bangalore doorstep delivery details. Thank you!`);

    // Generate Full SSR Product Detail HTML
    const ssrProductDetailHtml = `
      <div class="pd__breadcrumb">
        <a href="/">Home</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <a href="/shop">Shop</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <a href="/${product.category}">${getCategoryDisplayName(product.category)}</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <span>${product.name}</span>
      </div>

      <div class="pd__grid">
        <!-- Gallery Column -->
        <div class="pd__gallery">
          <div class="pd__main-image-wrap">
            <img id="pdMainImg" src="/${product.image.replace(/^\//, '')}" alt="${product.name} - Bangalore Bridal Jewellery" class="pd__main-image" loading="eager">
          </div>
          ${product.images && product.images.length > 1 ? `
            <div class="pd__thumbnails">
              ${product.images.map((img, i) => `
                <div class="pd__thumb ${i === 0 ? 'active' : ''}" onclick="switchImage(${i}, this)">
                  <img src="/${img.replace(/^\//, '')}" alt="${product.name} view ${i+1}" loading="lazy">
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Info Column -->
        <div class="pd__info">
          <div class="pd__category-tag" style="text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.12em; color: var(--gold-primary); font-weight: 700; margin-bottom: 6px;">${getCategoryDisplayName(product.category)}</div>
          <h1 class="pd__title" style="font-family: 'Cinzel', serif; font-size: clamp(1.4rem, 2.2vw, 1.85rem); margin-bottom: 10px; color: var(--text-primary); line-height: 1.25;">${product.name}</h1>
          
          <div class="pd__rating-row" style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
            <div class="pd__stars" style="color: #D4AF37; font-size: 0.95rem;">★★★★★</div>
            <span class="pd__rating-val" style="font-weight: 700; font-size: 0.88rem;">${avgRating}</span>
            <span class="pd__rating-count" style="color: var(--text-muted); font-size: 0.82rem;">(${reviewCount} verified review${reviewCount !== 1 ? 's' : ''})</span>
          </div>

          <div class="pd__price-wrap" style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
            <span class="pd__price" style="font-size: 1.6rem; font-weight: 800; color: var(--pink-primary);">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice > product.price ? `
              <span class="pd__original-price" style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
              <span class="pd__discount-badge" style="background: rgba(212, 69, 106, 0.1); color: var(--pink-primary); font-size: 0.82rem; font-weight: 700; padding: 4px 8px; border-radius: 6px;">Save ${discount}%</span>
            ` : ''}
          </div>

          <p class="pd__description" style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem; margin-bottom: 20px;">${product.description || `Handcrafted ${product.name} with premium gold finish & traditional artistry.`}</p>

          <!-- 🚚 BANGALORE EXPRESS DELIVERY BANNER (Consistent & Geography-aware) -->
          <div class="pd__delivery-box" style="margin-bottom: 16px; padding: 16px 18px; background: rgba(59, 12, 24, 0.05); border: 1.5px solid #3B0C18; border-radius: 12px; display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #3B0C18; display: flex; align-items: center; justify-content: center; color: #FFFFFF; box-shadow: 0 4px 12px rgba(59,12,24,0.15); flex-shrink: 0;">
              <i data-lucide="truck" style="width: 22px; height: 22px;"></i>
            </div>
            <div>
              <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #3B0C18; margin: 0 0 2px;">Bangalore Express Doorstep Delivery (24–48 Hrs)</h4>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Direct express delivery across all Bangalore pincodes (560xxx) from our Malleshwaram showroom. Pan-India shipping available in 7–10 business days.</p>
            </div>
          </div>

          <!-- ✨ SHINING & POLISHING ASSURANCE -->
          <div class="pd__polish-box" style="margin-bottom: 24px; padding: 14px 18px; background: rgba(255, 245, 248, 0.6); border: 1px solid rgba(212, 69, 106, 0.25); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; color: var(--pink-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.06); flex-shrink: 0;">
              <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <h4 style="font-family: 'Cinzel', serif; font-size: 0.92rem; font-weight: 700; color: var(--text-primary); margin: 0 0 2px;">Premium Micro Gold Polish &amp; Long-Lasting Luster</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Tarnish-resistant, skin-friendly micro plating crafted to retain vibrant heirloom gold radiance.</p>
            </div>
          </div>

          <!-- 📋 PRODUCT SPECIFICATIONS TABLE -->
          <div class="pd__details-section" style="margin-bottom: 24px;">
            <h3 style="font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; letter-spacing: 0.04em;">Product Specifications</h3>
            <div class="pd__details-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: rgba(255, 245, 248, 0.4); padding: 14px; border-radius: 10px; border: 1px solid var(--border-subtle);">
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Product ID</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 700; font-family: monospace; color: var(--text-primary); display: block; margin-top: 2px;">${prodCode}</span>
              </div>
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Category</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${getCategoryDisplayName(product.category)}</span>
              </div>
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Material</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${product.material || "Brass Base, Micro Gold Plated"}</span>
              </div>
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Finish</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${product.finish || "Antique Gold Polish"}</span>
              </div>
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Stones &amp; Pearls</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${product.stones || "Kundan, AD Stones & Faux Pearls"}</span>
              </div>
              <div class="pd__detail">
                <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Availability</span>
                <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 700; color: var(--accent-emerald); display: block; margin-top: 2px;">In Stock (Ready to Dispatch)</span>
              </div>
            </div>
          </div>

          <!-- 📏 SIZE SELECTION -->
          <div class="pd__size-section" style="margin-bottom: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <label class="pd__label" style="font-size: 0.86rem; font-weight: 700; color: var(--text-primary); margin: 0;">${sizeLabel}</label>
              ${isBangle ? `<span style="font-size: 0.78rem; color: #856404; font-weight: 600;">2.4 (Small) • 2.6 (Medium) • 2.8 (Large)</span>` : `<span style="font-size: 0.78rem; color: var(--accent-emerald); font-weight: 600;">Universal Fit • Adjustable</span>`}
            </div>
            <div class="pd__sizes" id="pdSizes" style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${sizeOptions.map(s => `
                <button type="button" class="pd__size-btn ${s === '2.6' || !isBangle ? 'active' : ''}" onclick="selectSize('${s}', this)" aria-label="Size ${s}">
                  <span>${s}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="pd__qty-section" style="margin-bottom: 24px;">
            <label class="pd__label" style="font-size: 0.86rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 8px;">Quantity</label>
            <div class="pd__qty-control" style="display: inline-flex; align-items: center; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden; background: #fff;">
              <button class="pd__qty-btn" onclick="updateQty(-1)" aria-label="Decrease" style="width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="minus" style="width:16px;height:16px;"></i>
              </button>
              <span class="pd__qty-value" id="qtyValue" style="width: 44px; text-align: center; font-weight: 700; font-size: 0.95rem;">1</span>
              <button class="pd__qty-btn" onclick="updateQty(1)" aria-label="Increase" style="width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="plus" style="width:16px;height:16px;"></i>
              </button>
            </div>
          </div>

          <div class="pd__actions" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            <div class="pd__actions-row">
              <button class="btn btn--primary btn--lg pd__add-btn" onclick="addProductToCart()" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="shopping-bag" style="width:18px;height:18px;"></i>
                Add to Cart
              </button>
              <a href="https://wa.me/919844758450?text=${waText}" target="_blank" class="btn btn--lg pd__whatsapp-btn" style="background: #25D366; color: white; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1; min-width: 0; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); padding: 14px 16px; font-size: 0.95rem; text-decoration: none;">
                <i data-lucide="message-circle" style="width:18px;height:18px;"></i>
                Buy via WhatsApp
              </a>
            </div>
            <div class="pd__actions-row">
              <button class="btn btn--outline btn--lg" onclick="buyNow()" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">
                Buy Now
              </button>
              <button class="btn btn--outline btn--lg" onclick="openGlobalEnquiryModal('${product.category}', 'Inquiring about ${product.name} (ID: ${prodCode})');" aria-label="Enquire about this product" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="message-square-heart" style="width:18px;height:18px;color:var(--pink-primary);"></i>
                Enquire
              </button>
            </div>
          </div>

          <!-- 💎 6-PILLAR LUXURY TRUST & ASSURANCE MATRIX -->
          <div class="pd__trust-matrix" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 24px; padding: 18px; background: rgba(255, 249, 245, 0.85); border: 1.5px solid rgba(212, 175, 55, 0.35); border-radius: 14px; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(37, 211, 102, 0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0A6C38;">
                <i data-lucide="shield-check" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Zero Blind Payment</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Pay ₹0 today • Inspect on video</div>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(59, 12, 24, 0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #3B0C18;">
                <i data-lucide="video" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Live 4K WhatsApp Call</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Inspect shine &amp; stones in daylight</div>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(212, 175, 55, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #8B6914;">
                <i data-lucide="truck" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Bangalore Express 24–48h</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Doorstep delivery from boutique</div>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(212, 69, 106, 0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--pink-primary);">
                <i data-lucide="repeat-2" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">7-Day Size Exchange</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Perfect wrist fit guarantee</div>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(139, 110, 20, 0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #8B6914;">
                <i data-lucide="sparkles" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Skin-Friendly Micro Polish</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Anti-tarnish 24K gold lacquer</div>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(46, 117, 89, 0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #2E7559;">
                <i data-lucide="package-check" style="width:18px;height:18px;"></i>
              </div>
              <div>
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Insured Box Packaging</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Tamper-proof velvet jewel case</div>
              </div>
            </div>
          </div>

          <!-- 📍 BANGALORE & PAN-INDIA PINCODE DELIVERY ESTIMATOR -->
          <div class="pd__pincode-checker" style="background: #FFFDF9; border: 1.5px solid rgba(212, 175, 55, 0.35); border-radius: 12px; padding: 14px 16px; margin-top: 18px;">
            <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <i data-lucide="map-pin" style="width: 16px; height: 16px; color: var(--pink-primary);"></i>
              Check Estimated Delivery Date
            </label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="deliveryPincodeInput" placeholder="Enter 6-digit PIN code (e.g. 560003)" maxlength="6" style="flex: 1; min-width: 0; padding: 10px 14px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.9rem; outline: none; background: #fff;">
              <button type="button" onclick="checkDeliveryPincode()" class="btn btn--outline btn--sm" style="white-space: nowrap; padding: 10px 16px; font-weight: 700; border-color: var(--pink-primary); color: var(--pink-primary); cursor: pointer;">Check</button>
            </div>
            <div id="pincodeResult" style="margin-top: 8px; font-size: 0.84rem; display: none; line-height: 1.4;"></div>
          </div>

          <!-- 👗 SAREE MATCHING & 💬 WHATSAPP ORDER DUAL ACTION BOX -->
          <div style="background: linear-gradient(135deg, rgba(255, 245, 248, 0.9) 0%, rgba(255, 252, 245, 0.9) 100%); border: 1px solid rgba(212, 69, 106, 0.25); border-radius: 12px; padding: 14px 16px; margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
              <div style="font-size: 0.85rem; color: var(--text-primary);">
                <strong style="display: block; color: var(--pink-primary); margin-bottom: 2px;">👗 Saree &amp; Lehenga Matching:</strong>
                Need help matching your saree border or lehenga color?
              </div>
              <a href="https://wa.me/919844758450?text=Hi!%20I%20would%20like%20help%20matching%20my%20saree%20with%20${encodeURIComponent(product.name)}%20(ID:%20${prodCode}).%20Here%20is%20my%20outfit%20photo:" target="_blank" class="btn btn--sm btn--primary" style="font-size: 0.8rem; padding: 8px 12px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; white-space: nowrap;">
                <i data-lucide="camera" style="width: 14px; height: 14px;"></i>
                Send Saree Photo
              </a>
            </div>
            <div style="border-top: 1px dashed rgba(212, 175, 55, 0.35); padding-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
              <div style="font-size: 0.85rem; color: var(--text-primary);">
                <strong style="display: block; color: #856404; margin-bottom: 2px;">💬 Real Photos &amp; WhatsApp Inquiry:</strong>
                Request unedited photos, weight details &amp; styling guidance.
              </div>
              <a href="https://wa.me/919844758450?text=Hi!%20Please%20share%20real%20photos%20and%20details%20for%20${encodeURIComponent(product.name)}%20(ID:%20${prodCode})." target="_blank" class="btn btn--sm btn--outline" style="font-size: 0.8rem; padding: 8px 12px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border-color: #856404; color: #856404; white-space: nowrap;">
                <i data-lucide="message-circle" style="width: 14px; height: 14px;"></i>
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          <!-- Studio Visuals & Raw Photo Transparency Box -->
          <div class="pd__ai-transparency" style="background: rgba(255, 248, 235, 0.95); border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 10px; padding: 14px 16px; margin-top: 16px;">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <i data-lucide="camera" style="width: 20px; height: 20px; color: #B38F24; flex-shrink: 0; margin-top: 2px;"></i>
              <div style="font-size: 0.84rem; line-height: 1.55; color: #4A3E30;">
                <strong style="color: #2C1820; display: block; margin-bottom: 3px; font-weight: 700;">📸 Visual Authenticity &amp; Live Photos:</strong>
                Our showcase photos are studio-enhanced with AI referencing our original handcrafted pieces. The physical jewellery closely resembles these visuals. Want to see unedited showroom photos before purchasing? 
                <a href="https://wa.me/919844758450?text=Hi!%20Please%20share%20raw%20photos%20of%20${encodeURIComponent(product.name)}%20(ID:%20${prodCode})" target="_blank" style="color: #25D366; font-weight: 700; text-decoration: underline; margin-left: 4px;">Request Raw Images on WhatsApp &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Generate Related Products HTML
    let relatedDb = await Product.find({ id: { $ne: product.id }, category: product.category }).limit(4);
    if (!relatedDb || relatedDb.length < 4) {
      const otherDb = await Product.find({ id: { $ne: product.id }, category: { $ne: product.category } }).limit(4 - (relatedDb ? relatedDb.length : 0));
      relatedDb = relatedDb ? relatedDb.concat(otherDb) : otherDb;
    }

    const ssrRelatedHtml = relatedDb.map(p => {
      const relSlug = getProductSlug(p);
      const relDisc = p.originalPrice > p.price 
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
        : 0;
      return `
        <div class="card product-card">
          <a href="/products/${relSlug}" class="card__image-link">
            <div class="card__image">
              <img src="/${p.image.replace(/^\//, '')}" alt="Kannika Bangles - ${p.name}" loading="lazy">
              ${relDisc > 0 ? `<div class="product-card__discount">-${relDisc}%</div>` : ''}
            </div>
          </a>
          <div class="card__body">
            <span class="card__category">${getCategoryDisplayName(p.category)}</span>
            <h3 class="card__title"><a href="/products/${relSlug}" style="color:inherit;text-decoration:none;">${p.name}</a></h3>
            <div class="card__price">
              ₹${p.price.toLocaleString('en-IN')}
              ${p.originalPrice > p.price ? `<span class="original">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <span class="stars" style="color: #D4AF37;">★★★★★</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">5.0 (18)</span>
            </div>
            <div class="card__cta-row product-card__cta-row" style="margin-top: 10px; width: 100%; display: flex; gap: 6px;">
              <a href="/products/${relSlug}" class="btn btn--outline btn--card-view" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; text-decoration: none; white-space: nowrap;">View Details</a>
              <button type="button" class="btn btn--primary btn--card-add" onclick="event.preventDefault(); addToCart(${p.id});" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; white-space: nowrap; cursor: pointer;">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": [imageAbsUrl],
      "description": product.description || seoDesc,
      "sku": prodCode,
      "mpn": prodCode,
      "brand": {
        "@type": "Brand",
        "name": "Sri Kannika Bangles"
      },
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": product.price,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Sri Kannika Bangles",
          "url": "https://kannikabangles.com"
        }
      }
    };

    if (hasReviews) {
      jsonLd.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toString(),
        "reviewCount": reviewCount.toString()
      };
    }

    // Inject Meta & Schema into Head
    template = template.replace(/<title>.*?<\/title>/i, `<title>${seoTitle}</title>`);
    template = template.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${seoDesc}">`);
    
    // Inject dynamic canonical link
    template = template.replace(/<link rel="canonical".*?>/i, `<link rel="canonical" href="${canonicalUrl}">`);

    // Inject Open Graph URLs
    template = template.replace(/<meta property="og:title" content=".*?">/i, `<meta property="og:title" content="${seoTitle}">`);
    template = template.replace(/<meta property="og:description" content=".*?">/i, `<meta property="og:description" content="${seoDesc}">`);
    template = template.replace(/<meta property="og:url" content=".*?">/i, `<meta property="og:url" content="${canonicalUrl}">`);
    template = template.replace(/<meta property="og:image" content=".*?">/i, `<meta property="og:image" content="${imageAbsUrl}">`);
    template = template.replace(/<meta name="twitter:title" content=".*?">/i, `<meta name="twitter:title" content="${seoTitle}">`);
    template = template.replace(/<meta name="twitter:description" content=".*?">/i, `<meta name="twitter:description" content="${seoDesc}">`);
    template = template.replace(/<meta name="twitter:image" content=".*?">/i, `<meta name="twitter:image" content="${imageAbsUrl}">`);

    // Inject schema
    template = template.replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script></head>`);

    // Pre-render semantic HTML directly into the page containers
    template = template.replace('<div id="productDetail" class="product-detail__content"></div>', `<div id="productDetail" class="product-detail__content">${ssrProductDetailHtml}</div>`);
    template = template.replace('<div class="product-grid" id="relatedProducts"></div>', `<div class="product-grid" id="relatedProducts">${ssrRelatedHtml}</div>`);

    res.send(template);
  } catch (err) {
    console.error('SSR product render error:', err);
    res.status(500).sendFile(path.join(__dirname, '500.html'));
  }
});

// ─── SSR Category Pages with Pre-Rendered Product Grid ───
async function serveCategorySSR(req, res, category, titleText, metaDesc) {
  try {
    let template = fs.readFileSync(path.join(process.cwd(), 'shop-template.html'), 'utf8');

    // Inject category-specific title & meta (Strictly no meta keywords per PDF audit Page 2)
    template = template.replace(/<title>.*?<\/title>/i, `<title>${titleText}</title>`);
    template = template.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${metaDesc}">`);
    template = template.replace(/<meta name="keywords"[^>]*>\s*/gi, '');

    // Inject canonical link
    const canonicalUrl = `https://kannikabangles.com/${category === 'all' ? 'shop' : category}`;
    template = template.replace(/<link rel="canonical".*?>/i, `<link rel="canonical" href="${canonicalUrl}">`);
    template = template.replace(/<meta property="og:url" content=".*?">/i, `<meta property="og:url" content="${canonicalUrl}">`);
    template = template.replace(/<meta property="og:title" content=".*?">/i, `<meta property="og:title" content="${titleText}">`);
    template = template.replace(/<meta property="og:description" content=".*?">/i, `<meta property="og:description" content="${metaDesc}">`);
    template = template.replace(/<meta name="twitter:title" content=".*?">/i, `<meta name="twitter:title" content="${titleText}">`);
    template = template.replace(/<meta name="twitter:description" content=".*?">/i, `<meta name="twitter:description" content="${metaDesc}">`);

    // Query products from database dynamically
    const allProducts = await Product.find({}).sort({ id: 1 });
    let products = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);

    // When viewing All Collections, interleave categories for a diverse, balanced mix across rows
    if (category === 'all') {
      const bangles = allProducts.filter(p => p.category === 'bangles');
      const necklaces = allProducts.filter(p => p.category === 'necklaces');
      const pendants = allProducts.filter(p => p.category === 'pendant-sets');
      const earrings = allProducts.filter(p => p.category === 'earrings');
      const headJewellery = allProducts.filter(p => p.category === 'head-jewellery');
      
      const mixed = [];
      const maxLen = Math.max(bangles.length, necklaces.length, pendants.length, earrings.length, headJewellery.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < bangles.length) mixed.push(bangles[i]);
        if (i < necklaces.length) mixed.push(necklaces[i]);
        if (i < pendants.length) mixed.push(pendants[i]);
        if (i < earrings.length) mixed.push(earrings[i]);
        if (i < headJewellery.length) mixed.push(headJewellery[i]);
      }
      products = mixed;
    }

    // Build ItemList JSON-LD schema dynamically from database query
    const itemListElements = products.map((product, idx) => {
      const pSlug = getProductSlug(product);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": `https://kannikabangles.com/products/${pSlug}`,
          "image": `https://kannikabangles.com/${product.image.replace(/^\//, '')}`,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "INR",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      };
    });

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": titleText,
      "numberOfItems": itemListElements.length,
      "itemListElement": itemListElements
    };

    template = template.replace('</head>', `<script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n</head>`);

    // Pre-render product grid HTML dynamically with canonical /products/:slug URLs
    let ssrHtml = '';
    products.forEach(product => {
      const prodSlug = getProductSlug(product);
      const discount = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

      ssrHtml += `
      <div class="card product-card" itemscope itemtype="https://schema.org/Product">
        <a href="/products/${prodSlug}" class="card__image-link">
          <div class="card__image">
            <img src="/${product.image.replace(/^\//, '')}" alt="${product.name} - Handcrafted Indian Jewellery Bangalore" loading="lazy" itemprop="image">
            ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          </div>
        </a>
        <div class="card__body">
          <span class="card__category">${getCategoryDisplayName(product.category)}</span>
          <h3 class="card__title" itemprop="name"><a href="/products/${prodSlug}" style="color:inherit;text-decoration:none;">${product.name}</a></h3>
          <div class="card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="INR">
            <span itemprop="price" content="${product.price}">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice > product.price ? `<span class="original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            <link itemprop="availability" href="https://schema.org/InStock">
          </div>
          <div class="card__cta-row product-card__cta-row" style="margin-top: 10px; width: 100%; display: flex; gap: 6px;">
            <a href="/products/${prodSlug}" class="btn btn--outline btn--card-view" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; text-decoration: none; white-space: nowrap;">View Details</a>
            <button type="button" class="btn btn--primary btn--card-add" onclick="event.preventDefault(); addToCart(${product.id});" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; white-space: nowrap; cursor: pointer;">Add to Cart</button>
          </div>
        </div>
      </div>`;
    });

    template = template.replace(
      '<div id="productGrid" class="product-grid"></div>',
      `<div id="productGrid" class="product-grid">${ssrHtml}</div>`
    );

    // Fix "Showing 0" Bug: render actual count in SSR HTML instantly
    template = template.replace(
      '<span id="productCount">0</span>',
      `<span id="productCount">${products.length} product${products.length !== 1 ? 's' : ''}</span>`
    );

    // Dynamic Active Navbar Link Selection
    template = template.replace(/class="navbar__link active"/g, 'class="navbar__link"');
    if (['bangles', 'pendant-sets', 'necklaces', 'earrings', 'head-jewellery'].includes(category)) {
      template = template.replace(
        `href="/${category}" class="navbar__dropdown-link"`,
        `href="/${category}" class="navbar__dropdown-link active"`
      );
      template = template.replace(
        'class="navbar__link navbar__link--has-dropdown"',
        'class="navbar__link navbar__link--has-dropdown active"'
      );
    }

    // Dynamic Category H1 Selection per PDF Audit (Page 5)
    let categoryH1 = '';
    let categoryLabel = 'Shop';
    if (category === 'bangles') {
      categoryH1 = 'Bridal Bangles &amp; Traditional Kadas in Bangalore';
      categoryLabel = 'Bangles';
    } else if (category === 'pendant-sets') {
      categoryH1 = 'Handcrafted Pendant Sets in Bangalore';
      categoryLabel = 'Pendant Sets';
    } else if (category === 'necklaces') {
      categoryH1 = 'Bridal Necklaces, Chokers &amp; Harams in Bangalore';
      categoryLabel = 'Necklaces';
    } else if (category === 'earrings') {
      categoryH1 = 'Bridal Jhumkas &amp; Earrings in Bangalore';
      categoryLabel = 'Earrings';
    } else if (category === 'head-jewellery') {
      categoryH1 = 'Bridal Matha Patti &amp; Maang Tikka in Bangalore';
      categoryLabel = 'Head Jewellery';
    } else {
      categoryH1 = 'Shop Artificial &amp; Bridal Jewellery Online';
      categoryLabel = 'Shop';
    }
    template = template.replace(/<h1 class="shop-header__title"[^>]*>.*?<\/h1>/i, `<h1 class="shop-header__title" id="seoMainH1">${categoryH1}</h1>`);
    template = template.replace('<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>Shop</span></div>', `<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>${categoryLabel}</span></div>`);

    // Pre-render Category Filter Chips with dynamic counts from DB
    const categoriesMeta = [
      { id: "all", name: "All Collections", icon: "gem", count: allProducts.length },
      { id: "bangles", name: "Bangles", icon: "circle", count: allProducts.filter(p => p.category === 'bangles').length },
      { id: "pendant-sets", name: "Pendant Sets", icon: "sparkles", count: allProducts.filter(p => p.category === 'pendant-sets').length },
      { id: "necklaces", name: "Necklaces", icon: "gem", count: allProducts.filter(p => p.category === 'necklaces').length },
      { id: "earrings", name: "Earrings", icon: "sparkles", count: allProducts.filter(p => p.category === 'earrings').length },
      { id: "head-jewellery", name: "Head Jewellery", icon: "crown", count: allProducts.filter(p => p.category === 'head-jewellery').length }
    ];

    let chipsHtml = '';
    categoriesMeta.forEach(cat => {
      const url = cat.id === 'all' ? '/shop' : `/${cat.id}`;
      const isActive = cat.id === category;
      chipsHtml += `
        <a href="${url}" class="filter-chip ${isActive ? 'active' : ''}" data-category="${cat.id}" style="text-decoration: none;">
          <i data-lucide="${cat.icon}" style="width:16px;height:16px;"></i>
          <span>${cat.name}</span>
          <span class="filter-chip__count">${cat.count}</span>
        </a>
      `;
    });

    template = template.replace(
      '<div id="categoryFilters"></div>',
      `<div id="categoryFilters">${chipsHtml}</div>`
    );

    // Dynamic SEO Rich Text & FAQ Schema Injection
    let seoContent = '';
    const seoFileName = category === 'all' ? 'shop-all.html' : `${category}.html`;
    const seoFilePath = path.join(__dirname, 'seo', seoFileName);
    if (fs.existsSync(seoFilePath)) {
      seoContent = fs.readFileSync(seoFilePath, 'utf8');

      // Extract FAQ Q&A pairs for FAQPage JSON-LD Schema
      const faqMatches = [...seoContent.matchAll(/<div class="seo-accordion-item">[\s\S]*?<button[^>]*>([\s\S]*?)<span[\s\S]*?<\/button>[\s\S]*?<div class="seo-accordion-content">[\s\S]*?<p>([\s\S]*?)<\/p>/gi)];
      if (faqMatches.length > 0) {
        const faqEntities = faqMatches.map(m => ({
          "@type": "Question",
          "name": m[1].replace(/Q\d+\.\s*/i, '').trim().replace(/\s+/g, ' '),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')
          }
        }));

        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqEntities
        };

        template = template.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>\n</head>`);
      }
    }
    template = template.replace('<!--SSR_SEO_CONTENT-->', seoContent);

    res.send(template);
  } catch (err) {
    console.error('[ERROR] serveCategorySSR failed:', err);
    res.status(500).sendFile(path.join(__dirname, '500.html'));
  }
}

// Category routes strictly aligned with PDF audit Page 5 metadata
app.get('/bangles', async (req, res) => {
  await serveCategorySSR(req, res, 'bangles',
    'Bridal Bangles & Kadas in Bangalore | Kannika Bangles',
    'Explore bridal bangles, Kundan kadas, temple bangles and micro-gold plated wedding stacks in Bangalore. Sizes 2.2-2.12 with showroom and WhatsApp styling.'
  );
});

app.get('/necklaces', async (req, res) => {
  await serveCategorySSR(req, res, 'necklaces',
    'Bridal Necklaces & Choker Sets Bangalore | Kannika Bangles',
    'Shop bridal chokers, temple harams and Kundan necklace sets in Bangalore. Explore wedding-ready designs with live WhatsApp inspection and Malleshwaram pickup.'
  );
});

app.get('/earrings', async (req, res) => {
  await serveCategorySSR(req, res, 'earrings',
    'Bridal Jhumkas & Earrings in Bangalore | Kannika Bangles',
    'Shop bridal jhumkas, temple earrings, studs and statement wedding earrings in Bangalore with premium micro-gold finishes and live WhatsApp inspection.'
  );
});

app.get('/pendant-sets', async (req, res) => {
  await serveCategorySSR(req, res, 'pendant-sets',
    'Pendant Sets in Bangalore | Bridal & 1 Gram Gold | Kannika',
    'Browse handcrafted pendant sets in Bangalore, including Kundan, temple, AD and 1 gram gold styles with matching earrings and WhatsApp product inspection.'
  );
});

app.get('/head-jewellery', async (req, res) => {
  await serveCategorySSR(req, res, 'head-jewellery',
    'Bridal Matha Patti & Maang Tikka Bangalore | Kannika',
    'Explore bridal Matha Patti, Maang Tikka and South Indian Nethi Chutti designs in Bangalore. Match your head jewellery with chokers, sarees and bridal sets.'
  );
});

app.get('/shop', async (req, res) => {
  await serveCategorySSR(req, res, 'all',
    'Shop Artificial & Bridal Jewellery Online | Kannika Bangles',
    'Browse bangles, necklaces, pendant sets and earrings with premium micro-gold finishes. Shop online or inspect pieces on live WhatsApp video from Bangalore.'
  );
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/areas', (req, res) => {
  res.sendFile(path.join(__dirname, 'areas.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'checkout.html'));
});

// Serve Admin Dashboard
app.get(['/admin', '/admin.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve Bridal & Temple Jewellery Landing Pages
app.get('/bridal-jewellery-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'bridal-jewellery-bangalore.html'));
});

app.get('/temple-jewellery-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple-jewellery-bangalore.html'));
});

app.get('/muhurtham-jewellery-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'muhurtham-jewellery-bangalore.html'));
});

app.get('/reception-and-sangeet-jewellery-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'reception-and-sangeet-jewellery-bangalore.html'));
});

app.get('/haldi-and-mehendi-jewellery-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'haldi-and-mehendi-jewellery-bangalore.html'));
});

app.get('/bangle-size-chart-calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'bangle-size-chart-calculator.html'));
});

app.get('/temple-vaddanam-kamarbandh', (req, res) => {
  res.sendFile(path.join(__dirname, 'temple-vaddanam-kamarbandh.html'));
});

app.get('/bridal-matha-patti-maang-tikka', (req, res) => {
  res.sendFile(path.join(__dirname, 'bridal-matha-patti-maang-tikka.html'));
});

app.get('/antique-vanki-baajuband', (req, res) => {
  res.sendFile(path.join(__dirname, 'antique-vanki-baajuband.html'));
});

app.get('/wedding-glass-bangle-stacks', (req, res) => {
  res.sendFile(path.join(__dirname, 'wedding-glass-bangle-stacks.html'));
});

app.get('/wedding-return-gifts-bangles-bangalore', (req, res) => {
  res.sendFile(path.join(__dirname, 'wedding-return-gifts-bangles-bangalore.html'));
});

app.get('/south-indian-bridal-jewellery-set', (req, res) => {
  res.sendFile(path.join(__dirname, 'south-indian-bridal-jewellery-set.html'));
});

// Serve blog guide pages with path-traversal protection
app.get('/blog/:slug', (req, res) => {
  const slug = String(req.params.slug || '').trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
  const blogDir = path.resolve(__dirname, 'blog');
  const filePath = path.resolve(blogDir, `${slug}.html`);
  if (filePath.startsWith(blogDir) && fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  return res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Serve areas location pages with path-traversal protection
app.get('/areas/:location', (req, res) => {
  const loc = String(req.params.location || '').trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(loc)) {
    return res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
  const areasDir = path.resolve(__dirname, 'areas');
  const filePath = path.resolve(areasDir, `${loc}.html`);
  if (filePath.startsWith(areasDir) && fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  return res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Serve Static Frontend files with Clean URLs
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Fallback to 404.html
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware (Mask internal stack traces and error details)
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
  res.status(500).sendFile(path.join(__dirname, '500.html'));
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

module.exports = app; // For Vercel Serverless Function export
