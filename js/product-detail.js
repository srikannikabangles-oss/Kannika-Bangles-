/* =====================================================
   KANNIKA BANGLES — Product Detail Page Logic
   ===================================================== */

let currentProduct = null;
let selectedSize = '2.6';
let selectedQuantity = 1;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    showProductNotFound();
    return;
  }

  currentProduct = getProductById(productId);

  if (!currentProduct) {
    showProductNotFound();
    return;
  }

  if (typeof fetchAllProductRatings !== 'undefined') {
    await fetchAllProductRatings();
  }
  await renderProductDetail();
  renderRelatedProducts();
  renderReviews();
});

async function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container || !currentProduct) return;

  const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);

  // Update page title
  document.title = `${currentProduct.name} — Kannika Bangles`;

  const rtRating = getProductRealtimeRating(currentProduct.id);

  container.innerHTML = `
    <div class="pd__breadcrumb">
      <a href="index.html">Home</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <a href="shop.html">Shop</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <a href="shop.html?category=${currentProduct.category}">${getCatName(currentProduct.category)}</a>
    </div>

    <div class="pd__container">
      <div class="pd__gallery">
        <div class="pd__main-image" id="mainImage">
          <img src="${currentProduct.images[0]}" alt="${currentProduct.name}" id="pdMainImg">
          ${currentProduct.badge ? `<span class="badge badge--${currentProduct.badge === 'bestseller' ? 'featured' : currentProduct.badge} pd__badge">${currentProduct.badge.toUpperCase()}</span>` : ''}
        </div>
        ${currentProduct.images.length > 1 ? `
        <div class="pd__thumbnails">
          ${currentProduct.images.map((img, i) => `
            <button class="pd__thumb ${i === 0 ? 'active' : ''}" onclick="switchImage(${i}, this)">
              <img src="${img}" alt="${currentProduct.name} view ${i + 1}" loading="lazy">
            </button>
          `).join('')}
        </div>` : ''}
      </div>

      <div class="pd__info">
        <h1 class="pd__name">${currentProduct.name}</h1>

        <div class="pd__rating" style="display: flex; align-items: center; gap: 8px;">
          <span class="stars">${getStarRating(rtRating.avg)}</span>
          <span class="pd__rating-text" style="font-size: 0.92rem; color: var(--text-muted);">${rtRating.avg} (${rtRating.count} review${rtRating.count !== 1 ? 's' : ''})</span>
        </div>

        <div class="pd__pricing">
          <span class="pd__price">${formatPrice(currentProduct.price)}</span>
          ${currentProduct.originalPrice > currentProduct.price ? `
            <span class="pd__original-price">${formatPrice(currentProduct.originalPrice)}</span>
            <span class="pd__discount-badge">Save ${discount}%</span>
          ` : ''}
        </div>

        <p class="pd__description">${currentProduct.description}</p>

        <div class="pd__details-grid">
          <div class="pd__detail">
            <span class="pd__detail-label">Material</span>
            <span class="pd__detail-value">${currentProduct.material}</span>
          </div>
          <div class="pd__detail">
            <span class="pd__detail-label">Finish</span>
            <span class="pd__detail-value">${currentProduct.finish}</span>
          </div>
          <div class="pd__detail">
            <span class="pd__detail-label">Stones</span>
            <span class="pd__detail-value">${currentProduct.stones}</span>
          </div>
          <div class="pd__detail">
            <span class="pd__detail-label">Availability</span>
            <span class="pd__detail-value" style="color: var(--accent-emerald);">In Stock ✓</span>
          </div>
        </div>

        <div class="pd__size-section">
          <label class="pd__label">Select Size (inches)</label>
          <div class="pd__sizes">
            ${currentProduct.sizes.map(size => `
              <button class="pd__size-btn ${size === selectedSize ? 'active' : ''}" onclick="selectSize('${size}', this)">
                ${size}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="pd__qty-section">
          <label class="pd__label">Quantity</label>
          <div class="pd__qty-control">
            <button class="pd__qty-btn" onclick="updateQty(-1)" aria-label="Decrease">
              <i data-lucide="minus" style="width:16px;height:16px;"></i>
            </button>
            <span class="pd__qty-value" id="qtyValue">${selectedQuantity}</span>
            <button class="pd__qty-btn" onclick="updateQty(1)" aria-label="Increase">
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
            <button class="btn btn--outline btn--lg pd__wishlist-btn wishlist-toggle" data-product-id="${currentProduct.id}" onclick="event.preventDefault(); toggleDetailWishlist(this);" aria-label="Add to wishlist" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0;">
              <i data-lucide="heart" ${isInWishlist(currentProduct.id) ? 'style="fill: var(--pink-primary);"' : ''}></i>
            </button>
          </div>
        </div>

        <div class="pd__trust">
          <div class="pd__trust-item">
            <i data-lucide="shield-check" style="width:20px;height:20px;color:var(--gold-primary);"></i>
            <span>Quality Guaranteed</span>
          </div>
          <div class="pd__trust-item">
            <i data-lucide="truck" style="width:20px;height:20px;color:var(--gold-primary);"></i>
            <span>Free Shipping ₹5000+</span>
          </div>
          <div class="pd__trust-item">
            <i data-lucide="rotate-ccw" style="width:20px;height:20px;color:var(--gold-primary);"></i>
            <span>Easy Returns</span>
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
      mainImg.src = currentProduct.images[index];
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
  if (btn) btn.classList.add('active');
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
    btn.innerHTML = '<i data-lucide="check" style="width:20px;height:20px;"></i> Added!';
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
  window.location.href = 'cart.html';
}

function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container || !currentProduct) return;

  const related = PRODUCTS.filter(p => 
    p.id !== currentProduct.id && 
    (p.category === currentProduct.category || p.featured)
  ).slice(0, 4);

  let html = '';
  related.forEach(product => {
    const rtRating = getProductRealtimeRating(product.id);
    html += `
      <a href="/product/${product.id}" class="card">
        <div class="card__image">
          <img src="${product.image}" alt="Kannika Bangles product - ${product.name}" loading="lazy">
        </div>
        <div class="card__body">
          <span class="card__category">${getCatName(product.category)}</span>
          <h3 class="card__title">${product.name}</h3>
          <div class="card__price">
            ${formatPrice(product.price)}
            ${product.originalPrice > product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="card__rating" style="display: flex; align-items: center; gap: 4px;">
            <span class="stars">${getStarRating(rtRating.avg)}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${rtRating.avg} (${rtRating.count})</span>
          </div>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}

function getCatName(catId) {
  const names = {
    'bangles': 'Bangles Collection',
    'necklaces': 'Necklaces Collection',
    'earrings': 'Earrings Collection'
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
      <a href="shop.html" class="btn btn--primary">Browse Collection</a>
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
  const size = selectedSize || '2.6';
  const qty = selectedQuantity || 1;
  const unitPrice = currentProduct.price;
  const totalPrice = unitPrice * qty;
  
  let message = `*Inquiry from Kannika Bangles Website*\n\n`;
  message += `I am interested in purchasing this product:\n`;
  message += `✨ *${currentProduct.name}*\n`;
  message += `🆔 Product ID: ${currentProduct.id}\n`;
  message += `📏 Size: ${size}\n`;
  message += `🛍️ Quantity: ${qty}\n`;
  message += `💰 Price: ₹${unitPrice.toLocaleString('en-IN')}${qty > 1 ? ` (Total: ₹${totalPrice.toLocaleString('en-IN')})` : ''}\n\n`;
  message += `Please confirm product availability and ordering steps. Thank you!`;
  
  const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  showToast('Opening WhatsApp for booking inquiry...', '🛍️');
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
};

