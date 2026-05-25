/* =====================================================
   KANNIKA BANGLES — Wishlist Page Logic
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
});

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const emptyEl = document.getElementById('wishlistEmpty');
  const filledEl = document.getElementById('wishlistFilled');

  if (!grid) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (filledEl) filledEl.style.display = 'none';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (filledEl) filledEl.style.display = 'block';

  let html = '';
  wishlist.forEach((productId, index) => {
    const product = getProductById(productId);
    if (!product) return;

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const categoryLabel = (CATEGORIES.find(c => c.id === product.category) || {}).name || product.category;
    const badgeHTML = product.badge ? `<span class="badge badge--${product.badge === 'bestseller' ? 'featured' : product.badge}">${product.badge.toUpperCase()}</span>` : '';

    html += `
      <div class="card product-card" data-wishlist-id="${product.id}" style="animation-delay: ${index * 0.08}s">
        <div class="card__image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${badgeHTML ? `<div class="product-card__badge">${badgeHTML}</div>` : ''}
          ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          
          <button class="wishlist-toggle active" onclick="event.preventDefault(); removeWishlistItem(${product.id});" aria-label="Remove from wishlist">
            <i data-lucide="heart" style="fill: var(--pink-primary);"></i>
          </button>
          
          <div class="card__overlay">
            <div class="product-card__overlay-actions">
              <a href="product.html?id=${product.id}" class="btn btn--primary btn--sm">View Details</a>
              <button class="btn btn--outline btn--sm" onclick="event.preventDefault(); addWishlistItemToCart(${product.id})">
                <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <a href="product.html?id=${product.id}" class="card__body">
          <span class="card__category">${categoryLabel}</span>
          <h3 class="card__title">${product.name}</h3>
          <div class="card__price">
            ${formatPrice(product.price)}
            ${product.originalPrice > product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="card__rating">
            <span class="stars">${getStarRating(product.rating)}</span>
          </div>
        </a>
      </div>
    `;
  });

  grid.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function removeWishlistItem(productId) {
  const card = document.querySelector(`[data-wishlist-id="${productId}"]`);
  if (card) {
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.opacity = '0';
    setTimeout(() => {
      toggleWishlist(productId); // This removes it and updates badge
      renderWishlist();
    }, 300);
  } else {
    toggleWishlist(productId);
    renderWishlist();
  }
}

function addWishlistItemToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  // Bangle size default is 2.6
  const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : '2.6';
  addToCart(product.id, size, 1);
}
