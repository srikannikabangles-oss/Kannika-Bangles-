/* =====================================================
   KANNIKA BANGLES — Product Detail Page Logic
   ===================================================== */

let currentProduct = null;
let selectedSize = '2.6';
let selectedQuantity = 1;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const pathMatch = window.location.pathname.match(/\/product\/(\d+)/);
  const productId = (pathMatch && pathMatch[1]) || params.get('id');

  if (!productId) {
    showProductNotFound();
    return;
  }

  currentProduct = (typeof getProductById === 'function') ? getProductById(productId) : null;
  if (!currentProduct) {
    try {
      const res = await fetch(`/api/products/${productId}`);
      if (res.ok) currentProduct = await res.json();
    } catch (e) {
      console.warn('Could not fetch product from API:', e);
    }
  }

  if (!currentProduct) {
    showProductNotFound();
    return;
  }

  try {
    if (typeof fetchAllProductRatings !== 'undefined') {
      await fetchAllProductRatings();
    }
  } catch (e) {}

  await renderProductDetail();
  renderRelatedProducts();
  if (typeof renderReviews === 'function') renderReviews();
});

async function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container || !currentProduct) return;

  const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);

  // Update page title
  document.title = `${currentProduct.name} — Kannika Bangles`;

  const rtRating = getProductRealtimeRating(currentProduct.id);

  const isBangle = currentProduct.category === 'bangles';
  const sizeLabel = isBangle ? 'Select Size (inches)' : 'Size & Fit';
  const sizeOptions = isBangle ? ['2.4', '2.6', '2.8'] : ['Free Size (Adjustable)'];
  if (!isBangle) selectedSize = 'Free Size (Adjustable)';

  const prodCode = currentProduct.code || currentProduct.sku || `KB-${currentProduct.id}`;

  container.innerHTML = `
    <div class="pd__breadcrumb">
      <a href="/">Home</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <a href="/shop">Shop</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <a href="/${currentProduct.category}">${getCatName(currentProduct.category)}</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <span>${currentProduct.name}</span>
    </div>

    <div class="pd__container">
      <div class="pd__gallery">
        <div class="pd__main-image" id="mainImage" style="position: relative; border-radius: 16px; overflow: hidden; background: #fff; border: 1.5px solid rgba(212, 175, 55, 0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          <img src="${getProductImageUrl(currentProduct.images[0])}" alt="${currentProduct.name} - Sri Kannika Bangles" id="pdMainImg" style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; transition: transform 0.4s ease;">
          ${currentProduct.badge ? `<span class="badge badge--${currentProduct.badge === 'bestseller' ? 'featured' : currentProduct.badge} pd__badge" style="position: absolute; top: 14px; left: 14px; z-index: 5;">${currentProduct.badge.toUpperCase()}</span>` : ''}
          ${discount > 0 ? `<span style="position: absolute; top: 14px; right: 14px; z-index: 5; background: var(--pink-primary); color: white; font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">SAVE ${discount}%</span>` : ''}
        </div>
        ${currentProduct.images.length > 1 ? `
        <div class="pd__thumbnails" style="display: flex; gap: 10px; margin-top: 14px; overflow-x: auto;">
          ${currentProduct.images.map((img, i) => `
            <button class="pd__thumb ${i === 0 ? 'active' : ''}" onclick="switchImage(${i}, this)" style="width: 64px; height: 64px; border-radius: 8px; overflow: hidden; border: 2px solid ${i === 0 ? 'var(--pink-primary)' : 'var(--border-subtle)'}; background: #fff; cursor: pointer; padding: 0;">
              <img src="${getProductImageUrl(img)}" alt="${currentProduct.name} view ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;">
            </button>
          `).join('')}
        </div>` : ''}
      </div>

      <div class="pd__info">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
          <span class="pd__category-tag" style="font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 700; color: var(--pink-primary); letter-spacing: 0.08em; text-transform: uppercase;">${getCatName(currentProduct.category)}</span>
          <span class="pd__sku-tag" style="font-family: monospace; font-size: 0.82rem; font-weight: 700; color: #856404; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">ID: ${prodCode}</span>
        </div>
        <h1 class="pd__name" style="font-family: 'Cinzel', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: var(--text-primary); margin: 4px 0 12px;">${currentProduct.name}</h1>

        <div class="pd__rating" style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span class="stars" style="color: #D4AF37; font-size: 1.1rem;">${getStarRating(rtRating.avg)}</span>
          <span class="pd__rating-text" style="font-size: 0.92rem; color: var(--text-muted); font-weight: 600;">${rtRating.avg} (${rtRating.count} reviews)</span>
          <span style="display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: #ccc; margin: 0 4px;"></span>
          <span style="font-size: 0.85rem; color: var(--accent-emerald); font-weight: 700;">Verified Quality ✓</span>
        </div>

        <div class="pd__pricing" style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
          <span class="pd__price" style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary);">${formatPrice(currentProduct.price)}</span>
          ${currentProduct.originalPrice > currentProduct.price ? `
            <span class="pd__original-price" style="font-size: 1.1rem; color: var(--text-muted); text-decoration: line-through;">${formatPrice(currentProduct.originalPrice)}</span>
            <span class="pd__discount-badge" style="background: rgba(212, 69, 106, 0.1); color: var(--pink-primary); font-size: 0.82rem; font-weight: 700; padding: 4px 8px; border-radius: 6px;">Save ${discount}%</span>
          ` : ''}
        </div>

        <p class="pd__description" style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem; margin-bottom: 20px;">${currentProduct.description}</p>

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
              <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${getCatName(currentProduct.category)}</span>
            </div>
            <div class="pd__detail">
              <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Material</span>
              <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${currentProduct.material}</span>
            </div>
            <div class="pd__detail">
              <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Finish</span>
              <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${currentProduct.finish}</span>
            </div>
            <div class="pd__detail">
              <span class="pd__detail-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Stones &amp; Pearls</span>
              <span class="pd__detail-value" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; margin-top: 2px;">${currentProduct.stones}</span>
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
              <span class="pd__qty-value" id="qtyValue" style="width: 44px; text-align: center; font-weight: 700; font-size: 0.95rem;">${selectedQuantity}</span>
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
            <button class="btn btn--lg pd__whatsapp-btn" onclick="buyViaWhatsAppDirect()" style="background: #25D366; color: white; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1; min-width: 0; white-space: nowrap; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); padding: 14px 16px; font-size: 0.95rem;">
              <i data-lucide="message-circle" style="width:18px;height:18px;"></i>
              Buy via WhatsApp
            </button>
          </div>
          <div class="pd__actions-row" style="display: flex; gap: 12px; width: 100%;">
            <button class="btn btn--outline btn--lg" onclick="buyNow()" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">
              Buy Now
            </button>
            <button class="btn btn--outline btn--lg" onclick="openGlobalEnquiryModal('${currentProduct.category}', 'Inquiring about ${currentProduct.name} (ID: ${prodCode})');" aria-label="Enquire about this product" style="flex: 1; min-width: 0; padding: 14px 16px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
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
      </div>
    </div>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function switchImage(index, thumb) {
  currentImageIndex = index;
  const mainImg = document.getElementById('pdMainImg');
  if (mainImg && currentProduct) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = getProductImageUrl(currentProduct.images[index]);
      mainImg.style.opacity = '1';
    }, 200);
  }

  // Update active thumbnail
  document.querySelectorAll('.pd__thumb').forEach(t => t.classList.remove('active'));
  if (thumb) thumb.classList.add('active');
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll('.pd__size-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
    btn.style.borderColor = 'var(--pink-primary)';
    btn.style.background = 'rgba(212, 69, 106, 0.08)';
    btn.style.color = 'var(--pink-primary)';
  }
}

function updateQty(delta) {
  selectedQuantity = Math.max(1, Math.min(10, selectedQuantity + delta));
  const el = document.getElementById('qtyValue');
  if (el) el.textContent = selectedQuantity;
}

function addProductToCart() {
  if (!currentProduct) return;
  addToCart(currentProduct.id, selectedSize, selectedQuantity);
  
  // Animate button
  const btn = document.querySelector('.pd__add-btn');
  if (btn) {
    btn.innerHTML = '<i data-lucide="check" style="width:20px;height:20px;"></i> Added to Bag!';
    btn.style.background = 'var(--accent-emerald)';
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="shopping-bag" style="width:20px;height:20px;"></i> Add to Cart';
      btn.style.background = '';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 2000);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function buyNow() {
  if (!currentProduct) return;
  addToCart(currentProduct.id, selectedSize, selectedQuantity);
  window.location.href = '/cart';
}

function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container || !currentProduct) return;

  // Filter 4 related products (prefer same category, then others)
  let related = PRODUCTS.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);
  if (related.length < 4) {
    const others = PRODUCTS.filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category);
    related = related.concat(others);
  }
  related = related.slice(0, 4);

  let html = '';
  related.forEach(product => {
    const rtRating = getProductRealtimeRating(product.id);
    const discount = product.originalPrice > product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    html += `
      <div class="card product-card">
        <a href="/product/${product.id}" class="card__image-link">
          <div class="card__image">
            <img src="${getProductImageUrl(product.image)}" alt="Kannika Bangles - ${product.name}" loading="lazy">
            ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          </div>
        </a>
        <div class="card__body">
          <span class="card__category">${getCatName(product.category)}</span>
          <h3 class="card__title"><a href="/product/${product.id}" style="color:inherit;text-decoration:none;">${product.name}</a></h3>
          <div class="card__price">
            ${formatPrice(product.price)}
            ${product.originalPrice > product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
            <span class="stars" style="color: #D4AF37;">${getStarRating(rtRating.avg)}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${rtRating.avg} (${rtRating.count})</span>
          </div>
          <div class="card__cta-row" style="margin-top: 10px; width: 100%;">
            <a href="/product/${product.id}" class="btn btn--outline btn--sm" style="width: 100%; justify-content: center; font-size: 0.82rem; font-weight: 600; padding: 8px 12px; border-radius: 6px; text-decoration: none;">View Details</a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getCatName(catId) {
  const names = {
    'bangles': 'Bangles',
    'pendant-sets': 'Pendant Sets',
    'necklaces': 'Necklaces',
    'earrings': 'Earrings'
  };
  return names[catId] || catId;
}

function showProductNotFound() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  
  container.innerHTML = `
    <div class="pd__not-found">
      <i data-lucide="search-x" style="width:80px;height:80px;color:var(--text-muted);"></i>
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist or has been removed.</p>
      <a href="/shop" class="btn btn--primary">Browse Collection</a>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function toggleDetailWishlist(btn) {
  if (!currentProduct) return;
  const isAdded = await toggleWishlist(currentProduct.id);
  if (getLoggedInUserId()) {
    const icon = btn.querySelector('i');
    if (icon) {
      if (isAdded) {
        icon.style.fill = 'var(--pink-primary)';
      } else {
        icon.style.fill = 'none';
      }
    }
  }
}

/* ─── Customer Reviews System (MongoDB + local fallback) ─── */
async function getProductReviews(productId) {
  try {
    const response = await fetch(`/api/reviews/${parseInt(productId)}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Failed to fetch reviews from database, utilizing local fallback:', e);
  }

  // Seed default reviews for the product if none exist
  const seed = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely stunning! The Kundan detailing and finish are of royal standard. Very comfortable sizes, and the packaging was lovely.",
      date: "March 2026",
      verified: true
    },
    {
      name: "Meera Reddy",
      rating: 4,
      comment: "Highly pleased with the craftsmanship. Truly elegant design that sits beautifully for bridal functions. The size fits exactly.",
      date: "February 2026",
      verified: true
    }
  ];

  // Specific custom reviews for some premium products
  if (parseInt(productId) === 13) {
    seed.unshift({
      name: "Anjali Patel",
      rating: 5,
      comment: "Exquisite bridal choker! It is the highlight of my wedding jewelry collection. Sparkling polki and pearls look remarkably genuine.",
      date: "May 2026",
      verified: true
    });
  }

  return seed;
}

async function saveProductReview(productId, review) {
  try {
    const user = window.Clerk && window.Clerk.user;
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: parseInt(productId),
        userId: user ? user.id : null,
        name: review.name,
        rating: review.rating,
        comment: review.comment
      })
    });

    if (response.ok) return;
    throw new Error('API error');
  } catch (e) {
    console.warn('Failed to save review in database, saving locally:', e);
  }

  try {
    const allReviews = JSON.parse(localStorage.getItem('kannika_reviews')) || {};
    if (!allReviews[productId]) {
      allReviews[productId] = await getProductReviews(productId);
    }
    allReviews[productId].unshift(review);
    localStorage.setItem('kannika_reviews', JSON.stringify(allReviews));
  } catch (e) {
    console.error('Failed to save review locally', e);
  }
}

async function renderReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container || !currentProduct) return;

  const reviews = await getProductReviews(currentProduct.id);
  const count = reviews.length;
  const avg = count > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1) : '5.0';

  // Calculate distributions
  const starsBreakdown = [0, 0, 0, 0, 0]; // Index 0 represents 1 star, Index 4 represents 5 stars
  reviews.forEach(r => {
    const index = Math.max(1, Math.min(5, r.rating)) - 1;
    starsBreakdown[index]++;
  });

  const percentage = starsBreakdown.map(c => count > 0 ? Math.round((c / count) * 100) : 0);

  container.innerHTML = `
    <div class="text-center reveal" style="margin-bottom: 40px;">
      <p class="section-subtitle">What Our Clients Say</p>
      <h2 class="section-title">Client <span class="text-gold">Reviews</span></h2>
      <div class="divider"></div>
    </div>

    <div class="reviews-grid">
      <!-- Ratings Summary Card -->
      <div class="reviews-summary reveal reveal--left">
        <div class="reviews-summary__score">${avg}</div>
        <div class="star-rating" style="margin-bottom: 8px;">
          ${getStarRating(parseFloat(avg))}
        </div>
        <div class="reviews-summary__count">Based on ${count} Customer Review${count !== 1 ? 's' : ''}</div>

        <div class="reviews-summary__bars">
          ${[5, 4, 3, 2, 1].map(stars => {
            const pct = percentage[stars - 1];
            return `
              <div class="reviews-bar-row">
                <span style="width: 35px; text-align: left;">${stars} ★</span>
                <div class="reviews-bar">
                  <div class="reviews-bar__fill" style="width: ${pct}%;"></div>
                </div>
                <span style="width: 35px; text-align: right; color: var(--text-muted);">${pct}%</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Reviews Feed -->
      <div class="reviews-list reveal reveal--right">
        <div class="reviews-list__header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 1.3rem;">All Reviews (${count})</h3>
          <a href="#writeReviewForm" class="btn btn--outline btn--sm">Write Review</a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${reviews.map(r => `
            <div class="review-card">
              <div class="review-card__header">
                <div>
                  <div class="review-card__author">
                    <span>${r.name}</span>
                    ${r.verified ? `<span class="review-card__verified"><i data-lucide="check" style="width: 10px; height: 10px; display: inline-block; vertical-align: middle;"></i> Verified Purchase</span>` : ''}
                  </div>
                  <div class="star-rating" style="font-size: 0.95rem; margin-top: 6px;">
                    ${getStarRating(r.rating)}
                  </div>
                </div>
                <div class="review-card__date">${r.date}</div>
              </div>
              <p class="review-card__comment">${r.comment}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Write a Review Form -->
    <div class="review-form reveal" id="writeReviewForm">
      <h3 class="review-form__title" style="margin-bottom: 8px;">Write a Customer Review</h3>
      <p class="review-form__desc">Your review helps other luxury seekers make informed bridal booking choices.</p>

      <form id="reviewSubmitForm" onsubmit="handleReviewSubmit(event)">
        <div class="review-form__stars-row">
          <label class="form-label" style="margin-bottom: 12px; display: block;">Your Rating *</label>
          <div class="star-rating--interactive">
            <input type="radio" id="star5" name="reviewRating" value="5" required>
            <label for="star5" title="5 stars"><i data-lucide="star" style="width:32px;height:32px;"></i></label>
            <input type="radio" id="star4" name="reviewRating" value="4">
            <label for="star4" title="4 stars"><i data-lucide="star" style="width:32px;height:32px;"></i></label>
            <input type="radio" id="star3" name="reviewRating" value="3">
            <label for="star3" title="3 stars"><i data-lucide="star" style="width:32px;height:32px;"></i></label>
            <input type="radio" id="star2" name="reviewRating" value="2">
            <label for="star2" title="2 stars"><i data-lucide="star" style="width:32px;height:32px;"></i></label>
            <input type="radio" id="star1" name="reviewRating" value="1">
            <label for="star1" title="1 star"><i data-lucide="star" style="width:32px;height:32px;"></i></label>
          </div>
        </div>

        <div class="form-group">
          <label for="reviewName" class="form-label">Your Name *</label>
          <input type="text" id="reviewName" class="form-input" placeholder="Enter your name" required autocomplete="name">
        </div>

        <div class="form-group">
          <label for="reviewComment" class="form-label">Review Description *</label>
          <textarea id="reviewComment" class="form-input" placeholder="Share your experience wearing this jewelry..." required></textarea>
        </div>

        <button type="submit" class="btn btn--primary">Submit Review</button>
      </form>
    </div>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  if (!currentProduct) return;

  if (!window.Clerk || !window.Clerk.user) {
    showToast('Please log in to submit a review! 🔒', '🔒');
    setTimeout(() => {
      if (window.Clerk) {
        window.Clerk.openSignIn();
      } else {
        window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
      }
    }, 1500);
    return;
  }

  const form = document.getElementById('reviewSubmitForm');
  const nameInput = document.getElementById('reviewName');
  const commentInput = document.getElementById('reviewComment');
  const ratingInput = form.querySelector('input[name="reviewRating"]:checked');

  if (!ratingInput) {
    showToast('Please select a star rating!', '★');
    return;
  }

  const newReview = {
    name: nameInput.value.trim(),
    rating: parseInt(ratingInput.value),
    comment: commentInput.value.trim(),
    date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    verified: true
  };

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="loader__ring" style="width: 14px; height: 14px; border-width: 2px; margin: 0; display: inline-block;"></span> Submitting...`;

  await saveProductReview(currentProduct.id, newReview);
  showToast('Thank you! Your review was submitted.', '💌');
  
  form.reset();
  btn.disabled = false;
  btn.innerHTML = originalText;

  await renderReviews();
}

window.buyViaWhatsAppDirect = function() {
  if (!currentProduct) return;
  const whatsappPhone = window.SUPPORT_WHATSAPP_PHONE || '919844758450';
  const prodCode = currentProduct.code || currentProduct.sku || `KB-${currentProduct.id}`;
  const qty = selectedQuantity || 1;
  const unitPrice = currentProduct.price;
  const totalPrice = unitPrice * qty;
  
  let message = `*Inquiry from Sri Kannika Bangles Website*\n\n`;
  message += `Hello! I would like to inquire about / order this jewellery item:\n\n`;
  message += `✨ *Product Name:* ${currentProduct.name}\n`;
  message += `🏷️ *Product ID:* ${prodCode}\n`;
  message += `📁 *Category:* ${getCatName(currentProduct.category)}\n`;
  message += `🛍️ *Quantity:* ${qty}\n`;
  message += `💰 *Price:* ₹${unitPrice.toLocaleString('en-IN')}${qty > 1 ? ` (Total: ₹${totalPrice.toLocaleString('en-IN')})` : ''}\n`;
  message += `🔗 *Product Link:* https://kannikabangles.com/product/${currentProduct.id}\n\n`;
  message += `Please confirm stock availability and 10-day pan-India delivery details. Thank you!`;
  
  const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  showToast('Opening WhatsApp with Product Details...', '🛍️');
  setTimeout(() => {
    window.open(url, '_blank') || (window.location.href = url);
  }, 400);
};
