const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

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
  // Ignore API requests or internal routes
  if (req.path.startsWith('/api') || req.path.startsWith('/node_modules')) {
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
app.get(['/shop.html', '/shop-template.html'], (req, res) => {
  const category = req.query.category;
  if (category === 'bangles') return res.redirect(301, '/bangles');
  if (category === 'necklaces') return res.redirect(301, '/necklaces');
  if (category === 'earrings') return res.redirect(301, '/earrings');
  return res.redirect(301, '/shop');
});

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

// SSR Dynamic Product Page with pre-rendered Schema & OpenGraph
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
    const seoTitle = `${product.name} — Buy Online Bangalore | Sri Kannika Bangles`;
    const seoDesc = `Buy ${product.name} for ₹${product.price}. Handcrafted Indian jewellery, Kundan & AD stone finishes from Sri Kannika Bangles, Malleshwaram, Bangalore.`;
    const imageAbsUrl = `https://kannikabangles.com/${product.image}`;

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

    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": [imageAbsUrl],
      "description": product.description || `Handcrafted ${product.name} from Sri Kannika Bangles, Bangalore.`,
      "sku": `KB-EAR-${product.id}`,
      "mpn": `KB-${product.id}`,
      "brand": {
        "@type": "Brand",
        "name": "Kannika Bangles"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://kannikabangles.com/product/${product.id}`,
        "priceCurrency": "INR",
        "price": product.price,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
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

    // Inject schema
    template = template.replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script></head>`);

    // Pre-render semantic H1 for search crawlers (SEO)
    template = template.replace('<!--SSR_PRODUCT_NAME-->', product.name);

    res.send(template);
  } catch (err) {
    res.status(500).send('<pre>Error: ' + err.message + '\\n' + err.stack + '</pre>');
  }
});

// ─── SSR Category Pages with Pre-Rendered Product Grid ───
async function serveCategorySSR(req, res, category, titleText, metaDesc) {
  try {
    let template = fs.readFileSync(path.join(process.cwd(), 'shop-template.html'), 'utf8');

    // Inject category-specific title & meta
    template = template.replace(/<title>.*?<\/title>/i, `<title>${titleText}</title>`);
    template = template.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${metaDesc}">`);

    // Inject canonical link
    const canonicalUrl = `https://kannikabangles.com/${category === 'all' ? 'shop' : category}`;
    template = template.replace(/<link rel="canonical".*?>/i, `<link rel="canonical" href="${canonicalUrl}">`);

    // Query products from database dynamically
    const query = category === 'all' ? {} : { category: category };
    const products = await Product.find(query).sort({ id: 1 });

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
        <div class="card__image">
          <img src="/${product.image}" alt="${product.name} - Handcrafted Indian Jewellery Bangalore" loading="lazy" itemprop="image">
          ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
        </div>
        <a href="/product/${product.id}" class="card__body" itemprop="url">
          <span class="card__category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          <h3 class="card__title" itemprop="name">${product.name}</h3>
          <div class="card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="INR">
            <span itemprop="price" content="${product.price}">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice > product.price ? `<span class="original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            <link itemprop="availability" href="https://schema.org/InStock">
          </div>
        </a>
      </div>`;
    });

    template = template.replace(
      '<div id="productGrid" class="product-grid"></div>',
      `<div id="productGrid" class="product-grid">${ssrHtml}</div>`
    );

    // Dynamic Active Navbar Link Selection
    template = template.replace(/class="navbar__link active"/g, 'class="navbar__link"');
    if (category === 'bangles' || category === 'necklaces' || category === 'earrings') {
      template = template.replace(
        `href="/${category}" class="navbar__link"`,
        `href="/${category}" class="navbar__link active"`
      );
    }

    // Dynamic Category H1 Selection
    let categoryH1 = '';
    let categoryLabel = 'Shop';
    if (category === 'bangles') {
      categoryH1 = 'Jewellery Shop in Bangalore';
      categoryLabel = 'Bangles';
    } else if (category === 'necklaces') {
      categoryH1 = 'Bridal &amp; Kundan Necklace Sets Bangalore';
      categoryLabel = 'Necklaces';
    } else if (category === 'earrings') {
      categoryH1 = 'Chandbali &amp; Jhumka Earrings Online Bangalore';
      categoryLabel = 'Earrings';
    } else {
      categoryH1 = 'Shop Handcrafted Indian Jewellery Bangalore';
      categoryLabel = 'Shop';
    }
    template = template.replace('<!--SSR_CATEGORY_H1-->', categoryH1);
    template = template.replace('<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>Shop</span></div>', `<div class="breadcrumb"><span>Home</span> <i data-lucide="chevron-right"></i> <span>${categoryLabel}</span></div>`);

    // Dynamic SEO Rich Text Injection
    let seoContent = '';
    const seoFileName = category === 'all' ? 'shop-all.html' : `${category}.html`;
    const seoFilePath = path.join(__dirname, 'seo', seoFileName);
    if (fs.existsSync(seoFilePath)) {
      seoContent = fs.readFileSync(seoFilePath, 'utf8');
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
    'Jewellery Shop in Bangalore — Kannika Bangles',
    'Visit Sri Kannika Bangles, a premium jewellery shop in bangalore. Explore our handcrafted bridal bangles, Kundan kadas and antique wristwear sets.'
  );
});

app.get('/necklaces', async (req, res) => {
  await serveCategorySSR(req, res, 'necklaces',
    'Bridal & Kundan Necklace Sets Bangalore | Kannika Bangles',
    'Buy bridal necklace sets & Kundan necklaces in Bangalore. Explore chokers, haram designs & temple jewellery necklaces from Sri Kannika Bangles.'
  );
});

app.get('/earrings', async (req, res) => {
  await serveCategorySSR(req, res, 'earrings',
    'Chandbali & Jhumka Earrings Online Bangalore | Kannika Bangles',
    'Shop Chandbali earrings & Jhumka earrings online in Bangalore. Discover exquisite bridal & antique earrings handcrafted by Sri Kannika Bangles.'
  );
});

app.get('/shop', async (req, res) => {
  await serveCategorySSR(req, res, 'all',
    'Shop Handcrafted Indian Jewellery Bangalore | Kannika Bangles',
    'Shop luxury handcrafted Indian jewellery online at Kannika Bangles Bangalore. Explore our exclusive bridal bangles, necklaces, and earrings.'
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
try {
  app.listen(PORT, '::1');
} catch (e) {
  // IPv6 listener fallback
}

module.exports = app; // For Vercel Serverless Function export
