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

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// Cache-Control for static assets
app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: '365d',
  immutable: true
}));
app.use('/css', express.static(path.join(__dirname, 'css'), {
  maxAge: '365d',
  immutable: true
}));
app.use('/js', express.static(path.join(__dirname, 'js'), {
  maxAge: '365d',
  immutable: true
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

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// MongoDB Schemas & Models
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
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

// 2. Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findOne({ id: id });
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
app.post('/api/reviews', async (req, res) => {
  try {
    const { productId, userId, name, rating, comment } = req.body;
    if (!productId || !name || !rating || !comment) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const newReview = new Review({
      productId: parseInt(productId),
      userId: userId || null,
      name,
      rating: parseInt(rating),
      comment
    });

    await newReview.save();
    res.json({ success: true, review: newReview });
  } catch (err) {
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

    const newOrder = new Order({
      userId: userId || null,
      items: mappedItems,
      subtotal: parseFloat(subtotal),
      shippingFee: parseFloat(shippingFee),
      total: parseFloat(total),
      shippingDetails
    });

    await newOrder.save();
    res.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error saving order' });
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

// 15. Create New Inquiry / Contact Message (Public)
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newInquiry = new Inquiry({
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      message: message.trim(),
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

// ─── ADMIN API ROUTES ───

// Admin Login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
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
    res.status(500).json({ error: 'Failed to create product: ' + err.message });
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
    'earrings': 'Earrings'
  };
  return map[cat] || cat;
}

// SSR Dynamic Product Page with pre-rendered Content, Schema & OpenGraph
app.get(['/product/:id', '/product.html', '/product-template.html'], async (req, res, next) => {
  const productId = parseInt(req.params.id || req.query.id);
  if (!productId || isNaN(productId)) {
    return res.sendFile(path.join(process.cwd(), 'product-template.html'));
  }

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.sendFile(path.join(process.cwd(), 'product-template.html'));
    }

    let template = fs.readFileSync(path.join(process.cwd(), 'product-template.html'), 'utf8');

    // Dynamic Title & Meta
    const seoTitle = `${product.name} (${product.code || 'KB-' + product.id}) — Kannika Bangles Bangalore`;
    const seoDesc = `Buy ${product.name} (Product ID: ${product.code || 'KB-' + product.id}) online for ₹${product.price.toLocaleString('en-IN')}. Handcrafted luxury jewellery with 10-day pan-India delivery & micro gold polish from Sri Kannika Bangles, Malleshwaram, Bangalore.`;
    const imageAbsUrl = `https://kannikabangles.com/${product.image.replace(/^\//, '')}`;

    // Get real-time reviews from mongoose database
    const ratingData = await Review.aggregate([
      { $match: { productId: productId } },
      {
        $group: {
          _id: '$productId',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);
    const avgRating = ratingData.length > 0 ? parseFloat(ratingData[0].avgRating.toFixed(1)) : 5.0;
    const reviewCount = ratingData.length > 0 ? ratingData[0].count : 18;

    const prodCode = product.code || product.sku || (product.category === 'bangles' ? `KB-BAN-${String(product.id).padStart(3,'0')}` : product.category === 'pendant-sets' ? `KB-PEN-${String(product.id).padStart(3,'0')}` : product.category === 'necklaces' ? `KB-NEC-${String(product.id).padStart(3,'0')}` : `KB-EAR-${String(product.id).padStart(3,'0')}`);
    const discount = product.originalPrice > product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const waText = encodeURIComponent(`*Inquiry from Sri Kannika Bangles Website*\n\nHello! I would like to inquire about / order this jewellery item:\n\n✨ *Product Name:* ${product.name}\n🏷️ *Product ID:* ${prodCode}\n📁 *Category:* ${getCategoryDisplayName(product.category)}\n🛍️ *Quantity:* 1\n💰 *Price:* ₹${product.price.toLocaleString('en-IN')}\n🔗 *Product Link:* https://kannikabangles.com/product/${product.id}\n\nPlease confirm stock availability and 10-day pan-India delivery details. Thank you!`);

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

      <div class="pd__container">
        <div class="pd__gallery">
          <div class="pd__main-image" id="mainImage" style="position: relative; border-radius: 16px; overflow: hidden; background: #fff; border: 1.5px solid rgba(212, 175, 55, 0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <img src="/${product.image.replace(/^\//, '')}" alt="${product.name} - Sri Kannika Bangles" id="pdMainImg" style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; transition: transform 0.4s ease;">
            ${product.badge ? `<span class="badge badge--${product.badge === 'bestseller' ? 'featured' : product.badge} pd__badge" style="position: absolute; top: 14px; left: 14px; z-index: 5;">${product.badge.toUpperCase()}</span>` : ''}
            ${discount > 0 ? `<span style="position: absolute; top: 14px; right: 14px; z-index: 5; background: var(--pink-primary); color: white; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">SAVE ${discount}%</span>` : ''}
          </div>
          ${product.images && product.images.length > 1 ? `
          <div class="pd__thumbnails" style="display: flex; gap: 10px; margin-top: 14px; overflow-x: auto;">
            ${product.images.map((img, i) => `
              <button class="pd__thumb ${i === 0 ? 'active' : ''}" onclick="switchImage(${i}, this)" style="width: 64px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid ${i === 0 ? 'var(--pink-primary)' : 'var(--border-subtle)'}; background: #fff; cursor: pointer; padding: 0;">
                <img src="/${img.replace(/^\//, '')}" alt="${product.name} view ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;">
              </button>
            `).join('')}
          </div>` : ''}
        </div>

        <div class="pd__info">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
            <span class="pd__category-tag" style="font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 700; color: var(--pink-primary); letter-spacing: 0.08em; text-transform: uppercase;">${getCategoryDisplayName(product.category)}</span>
            <span class="pd__sku-tag" style="font-family: monospace; font-size: 0.82rem; font-weight: 700; color: #856404; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">ID: ${prodCode}</span>
          </div>
          <h1 class="pd__name" style="font-family: 'Cinzel', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: var(--text-primary); margin: 4px 0 12px;">${product.name}</h1>

          <div class="pd__rating" style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="stars" style="color: #D4AF37; font-size: 1.1rem;">★★★★★</span>
            <span class="pd__rating-text" style="font-size: 0.92rem; color: var(--text-muted); font-weight: 600;">${avgRating} (${reviewCount} reviews)</span>
            <span style="display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: #ccc; margin: 0 4px;"></span>
            <span style="font-size: 0.85rem; color: var(--accent-emerald); font-weight: 700;">Verified Quality ✓</span>
          </div>

          <div class="pd__pricing" style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
            <span class="pd__price" style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary);">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice > product.price ? `
              <span class="pd__original-price" style="font-size: 1.1rem; color: var(--text-muted); text-decoration: line-through;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
              <span class="pd__discount-badge" style="background: rgba(212, 69, 106, 0.1); color: var(--pink-primary); font-size: 0.82rem; font-weight: 700; padding: 4px 8px; border-radius: 6px;">Save ${discount}%</span>
            ` : ''}
          </div>

          <p class="pd__description" style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem; margin-bottom: 20px;">${product.description || `Handcrafted ${product.name} with premium gold finish & traditional artistry.`}</p>

          <!-- 🚚 10-DAY PAN-INDIA DELIVERY BANNER -->
          <div class="pd__delivery-box" style="margin-bottom: 16px; padding: 16px 18px; background: rgba(212, 175, 55, 0.08); border: 1.5px solid rgba(212, 175, 55, 0.35); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; color: #B38F24; box-shadow: 0 4px 12px rgba(0,0,0,0.06); flex-shrink: 0;">
              <i data-lucide="truck" style="width: 22px; height: 22px;"></i>
            </div>
            <div>
              <h4 style="font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 2px;">Delivery Across India Within 10 Days</h4>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Safe & insured express courier dispatch directly from our Malleshwaram, Bangalore showroom with tracking.</p>
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
            <div class="pd__actions-row" style="display: flex; gap: 12px; width: 100%;">
              <button class="btn btn--primary btn--lg pd__add-btn" onclick="addProductToCart()" style="flex: 1; min-width: 0; white-space: nowrap; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="shopping-bag" style="width:18px;height:18px;"></i>
                Add to Cart
              </button>
              <a href="https://wa.me/919844758450?text=${waText}" target="_blank" class="btn btn--lg pd__whatsapp-btn" style="background: #25D366; color: white; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1; min-width: 0; white-space: nowrap; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); padding: 14px 16px; font-size: 0.95rem; text-decoration: none;">
                <i data-lucide="message-circle" style="width:18px;height:18px;"></i>
                Buy via WhatsApp
              </a>
            </div>
            <div class="pd__actions-row" style="display: flex; gap: 12px; width: 100%;">
              <button class="btn btn--outline btn--lg" onclick="buyNow()" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">
                Buy Now
              </button>
              <button class="btn btn--outline btn--lg" onclick="openGlobalEnquiryModal('${product.category}', 'Inquiring about ${product.name} (ID: ${prodCode})');" aria-label="Enquire about this product" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="message-square-heart" style="width:18px;height:18px;color:var(--pink-primary);"></i>
                Enquire
              </button>
            </div>
          </div>

          <div class="pd__trust" style="display: flex; justify-content: space-between; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
            <div class="pd__trust-item" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
              <i data-lucide="shield-check" style="width:20px;height:20px;color:var(--gold-primary);"></i>
              <span>100% Handcrafted</span>
            </div>
            <div class="pd__trust-item" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
              <i data-lucide="truck" style="width:20px;height:20px;color:var(--gold-primary);"></i>
              <span>Delivery in 10 Days</span>
            </div>
            <div class="pd__trust-item" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
              <i data-lucide="sparkles" style="width:20px;height:20px;color:var(--gold-primary);"></i>
              <span>Micro Gold Polish</span>
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

          <!-- 👗 SAREE MATCHING & 🎥 VIDEO CALL DUAL ACTION BOX -->
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
                <strong style="display: block; color: #856404; margin-bottom: 2px;">🎥 Live 5-Min Video Call:</strong>
                Inspect weight, luster &amp; stone shine in real-time.
              </div>
              <a href="https://wa.me/919844758450?text=Hi!%20I%20would%20like%20to%20schedule%20a%20quick%205-min%20video%20call%20to%20view%20${encodeURIComponent(product.name)}%20(ID:%20${prodCode})%20live." target="_blank" class="btn btn--sm btn--outline" style="font-size: 0.8rem; padding: 8px 12px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border-color: #856404; color: #856404; white-space: nowrap;">
                <i data-lucide="video" style="width: 14px; height: 14px;"></i>
                Book Video Call
              </a>
            </div>
          </div>

          <!-- Studio Visuals & Raw Photo Transparency Box -->
          <div class="pd__ai-transparency" style="background: rgba(255, 248, 235, 0.95); border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 10px; padding: 14px 16px; margin-top: 16px;">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <i data-lucide="camera" style="width: 20px; height: 20px; color: #B38F24; flex-shrink: 0; margin-top: 2px;"></i>
              <div style="font-size: 0.84rem; line-height: 1.55; color: #4A3E30;">
                <strong style="color: #2C1820; display: block; margin-bottom: 3px; font-weight: 700;">📸 Visual Authenticity &amp; Live Photos:</strong>
                Our showcase photos are studio-enhanced with AI referencing our original handcrafted pieces. The actual physical product closely resembles these visuals. Want to see unedited raw photos or a live video before purchasing? 
                <a href="https://wa.me/919844758450?text=Hi!%20Please%20share%20raw%20photos%20or%20a%20live%20video%20clip%20of%20${encodeURIComponent(product.name)}%20(ID:%20${prodCode})" target="_blank" style="color: #25D366; font-weight: 700; text-decoration: underline; margin-left: 4px;">Request Raw Images on WhatsApp &rarr;</a>
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
      const relDisc = p.originalPrice > p.price 
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
        : 0;
      return `
        <div class="card product-card">
          <a href="/product/${p.id}" class="card__image-link">
            <div class="card__image">
              <img src="/${p.image.replace(/^\//, '')}" alt="Kannika Bangles - ${p.name}" loading="lazy">
              ${relDisc > 0 ? `<div class="product-card__discount">-${relDisc}%</div>` : ''}
            </div>
          </a>
          <div class="card__body">
            <span class="card__category">${getCategoryDisplayName(p.category)}</span>
            <h3 class="card__title"><a href="/product/${p.id}" style="color:inherit;text-decoration:none;">${p.name}</a></h3>
            <div class="card__price">
              ₹${p.price.toLocaleString('en-IN')}
              ${p.originalPrice > p.price ? `<span class="original">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <span class="stars" style="color: #D4AF37;">★★★★★</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">5.0 (18)</span>
            </div>
            <div class="card__cta-row" style="margin-top: 10px; width: 100%;">
              <a href="/product/${p.id}" class="btn btn--outline btn--sm" style="width: 100%; justify-content: center; font-size: 0.82rem; font-weight: 600; padding: 8px 12px; border-radius: 6px; text-decoration: none;">View Details</a>
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
      "description": product.description || `Handcrafted ${product.name} from Sri Kannika Bangles, Bangalore.`,
      "sku": prodCode,
      "mpn": prodCode,
      "brand": {
        "@type": "Brand",
        "name": "Sri Kannika Bangles"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://kannikabangles.com/product/${product.id}`,
        "priceCurrency": "INR",
        "price": product.price,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Sri Kannika Bangles"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toString(),
        "reviewCount": reviewCount.toString()
      }
    };

    // Inject Meta & Schema into Head
    template = template.replace(/<title>.*?<\/title>/i, `<title>${seoTitle}</title>`);
    template = template.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${seoDesc}">`);
    
    // Inject dynamic canonical link
    const canonicalUrl = `https://kannikabangles.com/product/${product.id}`;
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
    res.status(500).send('<pre>Error: ' + err.message + '\\n' + err.stack + '</pre>');
  }
});

// ─── SSR Category Pages with Pre-Rendered Product Grid ───
async function serveCategorySSR(req, res, category, titleText, metaDesc, keywords) {
  try {
    let template = fs.readFileSync(path.join(process.cwd(), 'shop-template.html'), 'utf8');

    // Inject category-specific title & meta
    template = template.replace(/<title>.*?<\/title>/i, `<title>${titleText}</title>`);
    template = template.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${metaDesc}">`);
    template = template.replace(/<meta name="keywords" content=".*?">/i, `<meta name="keywords" content="${keywords}">`);

    // Inject canonical link
    const canonicalUrl = `https://kannikabangles.com/${category === 'all' ? 'shop' : category}`;
    template = template.replace(/<link rel="canonical".*?>/i, `<link rel="canonical" href="${canonicalUrl}">`);
    template = template.replace(/<meta property="og:url" content=".*?">/i, `<meta property="og:url" content="${canonicalUrl}">`);
    template = template.replace(/<meta property="og:title" content=".*?">/i, `<meta property="og:title" content="${titleText}">`);
    template = template.replace(/<meta property="og:description" content=".*?">/i, `<meta property="og:description" content="${metaDesc}">`);
    template = template.replace(/<meta name="twitter:title" content=".*?">/i, `<meta name="twitter:title" content="${titleText}">`);
    template = template.replace(/<meta name="twitter:description" content=".*?">/i, `<meta name="twitter:description" content="${metaDesc}">`);

    // Query products from database dynamically
    const query = category === 'all' ? {} : { category: category };
    let products = await Product.find(query).sort({ id: 1 });

    // When viewing All Collections, interleave categories for a diverse, balanced mix across rows
    if (category === 'all') {
      const bangles = products.filter(p => p.category === 'bangles');
      const necklaces = products.filter(p => p.category === 'necklaces');
      const pendants = products.filter(p => p.category === 'pendant-sets');
      const earrings = products.filter(p => p.category === 'earrings');
      
      const mixed = [];
      const maxLen = Math.max(bangles.length, necklaces.length, pendants.length, earrings.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < bangles.length) mixed.push(bangles[i]);
        if (i < necklaces.length) mixed.push(necklaces[i]);
        if (i < pendants.length) mixed.push(pendants[i]);
        if (i < earrings.length) mixed.push(earrings[i]);
      }
      products = mixed;
    }

    // Build ItemList JSON-LD schema dynamically from database query
    const itemListElements = products.map((product, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "url": `https://kannikabangles.com/product/${product.id}`,
        "image": `https://kannikabangles.com/${product.image}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "INR",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }
    }));

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": titleText,
      "numberOfItems": itemListElements.length,
      "itemListElement": itemListElements
    };

    template = template.replace('</head>', `<script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n</head>`);

    // Pre-render product grid HTML dynamically
    let ssrHtml = '';
    products.forEach(product => {
      const discount = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

      ssrHtml += `
      <div class="card product-card" itemscope itemtype="https://schema.org/Product">
        <a href="/product/${product.id}" class="card__image-link">
          <div class="card__image">
            <img src="/${product.image}" alt="${product.name} - Handcrafted Indian Jewellery Bangalore" loading="lazy" itemprop="image">
            ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          </div>
        </a>
        <div class="card__body">
          <span class="card__category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          <h3 class="card__title" itemprop="name"><a href="/product/${product.id}" style="color:inherit;text-decoration:none;">${product.name}</a></h3>
          <div class="card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="INR">
            <span itemprop="price" content="${product.price}">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice > product.price ? `<span class="original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            <link itemprop="availability" href="https://schema.org/InStock">
          </div>
          <div class="card__cta-row" style="margin-top: 10px; width: 100%;">
            <a href="/product/${product.id}" class="btn btn--outline btn--sm" style="width: 100%; justify-content: center; font-size: 0.82rem; font-weight: 600; padding: 8px 12px; border-radius: 6px; text-decoration: none;">View Details</a>
          </div>
        </div>
      </div>`;
    });

    template = template.replace(
      '<div id="productGrid" class="product-grid"></div>',
      `<div id="productGrid" class="product-grid">${ssrHtml}</div>`
    );

    // Dynamic Active Navbar Link Selection
    template = template.replace(/class="navbar__link active"/g, 'class="navbar__link"');
    if (category === 'bangles' || category === 'pendant-sets' || category === 'necklaces' || category === 'earrings') {
      template = template.replace(
        `href="/${category}" class="navbar__dropdown-link"`,
        `href="/${category}" class="navbar__dropdown-link active"`
      );
      template = template.replace(
        'class="navbar__link navbar__link--has-dropdown"',
        'class="navbar__link navbar__link--has-dropdown active"'
      );
    }

    // Dynamic Category H1 Selection
    let categoryH1 = '';
    let categoryLabel = 'Shop';
    if (category === 'bangles') {
      categoryH1 = 'Bridal Bangles &amp; Traditional Kadas in Bangalore';
      categoryLabel = 'Bangles';
    } else if (category === 'pendant-sets') {
      categoryH1 = 'Handcrafted Pendant Sets &amp; Bridal Jewellery in Bangalore';
      categoryLabel = 'Pendant Sets';
    } else if (category === 'necklaces') {
      categoryH1 = 'Exquisite Bridal Necklaces &amp; Kundan Sets in Bangalore';
      categoryLabel = 'Necklaces';
    } else if (category === 'earrings') {
      categoryH1 = 'Designer Earrings, Jhumkas &amp; Studs in Bangalore';
      categoryLabel = 'Earrings';
    } else {
      categoryH1 = 'Indian Wedding &amp; Bridal Jewellery Collection Bangalore';
      categoryLabel = 'Shop';
    }
    template = template.replace('<!--SSR_CATEGORY_H1-->', categoryH1);
    template = template.replace('<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>Shop</span></div>', `<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>${categoryLabel}</span></div>`);

    // Pre-render Category Filter Chips with deep links
    const categoriesMeta = [
      { id: "all", name: "All Collections", icon: "gem", count: 46 },
      { id: "bangles", name: "Bangles", icon: "circle", count: 14 },
      { id: "pendant-sets", name: "Pendant Sets", icon: "sparkles", count: 14 },
      { id: "necklaces", name: "Necklaces", icon: "gem", count: 6 },
      { id: "earrings", name: "Earrings", icon: "sparkles", count: 12 }
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
    res.status(500).send('<pre>Error: ' + err.message + '\\n' + err.stack + '</pre>');
  }
}

app.get('/bangles', async (req, res) => {
  await serveCategorySSR(req, res, 'bangles',
    'Bridal Bangles & Kundan Kadas Bangalore | Sri Kannika Bangles',
    'Shop handcrafted bridal bangles & Kundan kadas in Bangalore. Premium antique gold polish, AD stone spacer sets & 10-day pan-India delivery. Visit Malleshwaram showroom.',
    'bridal bangles bangalore, kundan kadas bangalore, antique gold kadas bangalore, ad stone bangles bangalore, micro gold plated bangles bangalore, bangles shop in malleshwaram'
  );
});

app.get('/necklaces', async (req, res) => {
  await serveCategorySSR(req, res, 'necklaces',
    'Bridal Necklaces & Kundan Choker Sets Bangalore | Kannika',
    'Explore luxury bridal necklace sets & antique harams in Bangalore. Handcrafted Kundan chokers, temple nakshi designs & micro gold finish with express pan-India shipping.',
    'bridal necklace sets bangalore, antique haram bangalore, kundan choker sets bangalore, temple necklace jewellery bangalore, matte finish bridal necklace'
  );
});

app.get('/earrings', async (req, res) => {
  await serveCategorySSR(req, res, 'earrings',
    'Designer Bridal Earrings & Jhumkas Bangalore | Kannika',
    'Shop authentic bridal jhumkas, chandbalis & AD studs in Bangalore. Handcrafted temple & Kundan earrings with skin-friendly micro gold polish. Visit Malleshwaram.',
    'bridal earrings bangalore, antique jhumkas bangalore, kundan chandbali earrings bangalore, ad stone bridal studs bangalore, temple jewellery earrings malleshwaram'
  );
});

app.get('/pendant-sets', async (req, res) => {
  await serveCategorySSR(req, res, 'pendant-sets',
    'Handcrafted Pendant Sets in Bangalore | Sri Kannika Bangles',
    'Buy handcrafted pendant sets with matching earrings in Bangalore. Discover Kundan, antique matte & CZ stone lockets with 24k micro gold polish. Order online today.',
    'pendant sets bangalore, bridal pendant jewellery bangalore, kundan pendant with earrings bangalore, antique locket sets bangalore, gold plated pendant sets malleshwaram'
  );
});

app.get('/shop', async (req, res) => {
  await serveCategorySSR(req, res, 'all',
    'Indian Bridal Jewellery Collection Bangalore | Kannika Bangles',
    'Explore Bangalore\'s premier collection of handcrafted bridal jewellery. Shop traditional bangles, necklace sets, pendants & jhumkas with 10-day pan-India delivery.',
    'bridal jewellery bangalore, indian bridal jewellery online, imitation jewellery bangalore, wedding jewellery sets bengaluru, buy jewellery online bangalore'
  );
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, 'blog', `${slug}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(__dirname, 'blog.html'));
  }
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

// Serve blog guide pages
app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, 'blog', `${slug}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
});

// Serve areas location pages specifically
app.get('/areas/:location', (req, res) => {
  const loc = req.params.location;
  const filePath = path.join(__dirname, 'areas', `${loc}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
});

// Serve Static Frontend files with Clean URLs
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Fallback to 404.html
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).send('Server Error: ' + err.message);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

module.exports = app; // For Vercel Serverless Function export
