const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

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
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// MongoDB Schemas & Models
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


// Serve Static Frontend files with Clean URLs (extension-less routing)
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Route non-file requests with parameters to proper HTML (like shop, product)
app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop.html'));
});

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'product.html'));
});

app.get('/areas', (req, res) => {
  res.sendFile(path.join(__dirname, 'areas.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'checkout.html'));
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

// Fallback to 404.html
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app; // For Vercel Serverless Function export
