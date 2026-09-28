/* =====================================================
   KANNIKA BANGLES — Wishlist Page Controller
   Native Auth & LocalStorage Persistent Wishlist
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  const userId = typeof getLoggedInUserId === 'function' ? getLoggedInUserId() : null;
  if (userId) {
    try {
      const res = await fetch(`/api/wishlist?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const dbItems = await res.json();
        if (Array.isArray(dbItems) && dbItems.length > 0) {
          const local = typeof getWishlist === 'function' ? getWishlist() : [];
          const merged = Array.from(new Set([...local, ...dbItems]));
          if (typeof saveWishlist === 'function') saveWishlist(merged);
        }
      }
    } catch (e) {
      console.warn('Could not sync DB wishlist:', e);
    }
  }

  if (typeof fetchLiveProducts === 'function') {
    try {
      await fetchLiveProducts();
    } catch (e) {}
  }

  renderWishlist();
  if (typeof updateWishlistBadges === 'function') updateWishlistBadges();
});

function isUserAuthenticated() {
  if (typeof window.isCustomerLoggedIn === 'function') {
    return window.isCustomerLoggedIn();
  }
  const token = localStorage.getItem('kannika_token');
  const user = localStorage.getItem('kannika_user');
  return !!(token && user);
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const emptyEl = document.getElementById('wishlistEmpty');
  const filledEl = document.getElementById('wishlistFilled');
  const authPromptEl = document.getElementById('wishlistAuthPrompt');
  const countEl = document.getElementById('wishlistCount');

  if (!grid) return;

  // Strict Login Requirement for Wishlist
  if (!isUserAuthenticated()) {
    if (authPromptEl) authPromptEl.style.display = 'flex';
    if (emptyEl) emptyEl.style.display = 'none';
    if (filledEl) filledEl.style.display = 'none';
    if (countEl) countEl.textContent = '0';
    grid.innerHTML = '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  if (authPromptEl) authPromptEl.style.display = 'none';

  const wishlist = typeof getWishlist === 'function' ? getWishlist() : [];
  if (countEl) countEl.textContent = wishlist.length;

  if (wishlist.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (filledEl) filledEl.style.display = 'none';
    grid.innerHTML = '';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (filledEl) filledEl.style.display = 'block';

  let html = '';
  wishlist.forEach((productId, index) => {
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const categoryLabel = (typeof CATEGORIES !== 'undefined' ? (CATEGORIES.find(c => c.id === product.category) || {}).name : null) || product.category;
    const badgeHTML = product.badge ? `<span class="badge badge--${product.badge === 'bestseller' ? 'featured' : product.badge}">${product.badge.toUpperCase()}</span>` : '';
    const imgUrl = typeof getProductImageUrl === 'function' ? getProductImageUrl(product.image || (product.images && product.images[0])) : (product.image || '');

    html += `
      <div class="card product-card" data-wishlist-id="${product.id}" style="animation-delay: ${index * 0.06}s">
        <div class="card__image">
          <img src="${imgUrl}" alt="Kannika Bangles - ${product.name}" loading="lazy">
          ${badgeHTML ? `<div class="product-card__badge">${badgeHTML}</div>` : ''}
          ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          
          <button class="wishlist-toggle active" onclick="event.preventDefault(); removeWishlistItem(${product.id});" aria-label="Remove from wishlist" style="background: rgba(255,255,255,0.95); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <i data-lucide="heart" style="fill: var(--pink-primary); color: var(--pink-primary);"></i>
          </button>
          
          <div class="card__overlay">
            <div class="product-card__overlay-actions">
              <a href="/product/${product.id}" class="btn btn--primary btn--sm">View Details</a>
              <button class="btn btn--outline btn--sm" onclick="event.preventDefault(); addWishlistItemToCart(${product.id})">
                <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="card__body">
          <span class="card__category">${categoryLabel}</span>
          <h3 class="card__title"><a href="/product/${product.id}" style="color:inherit; text-decoration:none;">${product.name}</a></h3>
          <div class="card__price">
            ${typeof formatPrice === 'function' ? formatPrice(product.price) : `₹${product.price}`}
            ${product.originalPrice > product.price ? `<span class="original">${typeof formatPrice === 'function' ? formatPrice(product.originalPrice) : `₹${product.originalPrice}`}</span>` : ''}
          </div>
          <div class="card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
            <span class="stars">${typeof getStarRating === 'function' ? getStarRating(product.rating || 5) : '★★★★★'}</span>
          </div>
          <div class="card__cta-row product-card__cta-row" style="margin-top: 10px; width: 100%; display: flex; gap: 6px;">
            <a href="/product/${product.id}" class="btn btn--outline btn--card-view" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; text-decoration: none; white-space: nowrap;">View Details</a>
            <button type="button" class="btn btn--primary btn--card-add" onclick="event.preventDefault(); addWishlistItemToCart(${product.id});" style="flex: 1; justify-content: center; font-size: 0.74rem; font-weight: 600; padding: 7px 4px; border-radius: 6px; white-space: nowrap; cursor: pointer;">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function removeWishlistItem(productId) {
  const card = document.querySelector(`[data-wishlist-id="${productId}"]`);
  if (card) {
    card.style.transition = 'all 0.3s ease';
    card.style.transform = 'scale(0.85)';
    card.style.opacity = '0';
    setTimeout(async () => {
      if (typeof toggleWishlist === 'function') {
        await toggleWishlist(productId);
      }
      renderWishlist();
    }, 250);
  } else {
    if (typeof toggleWishlist === 'function') {
      toggleWishlist(productId).then(() => renderWishlist());
    }
  }
}

function addWishlistItemToCart(productId) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) return;
  const isBangle = product.category === 'bangles';
  const size = isBangle ? (product.sizes && product.sizes.length > 0 ? product.sizes[0] : '2.6') : 'Free Size (Adjustable)';
  if (typeof addToCart === 'function') {
    addToCart(product.id, size, 1);
  }
}
