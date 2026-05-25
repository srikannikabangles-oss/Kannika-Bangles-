/* =====================================================
   KANNIKA BANGLES — Shop Page Logic
   Filtering, Sorting, Product Grid Rendering
   ===================================================== */

let currentCategory = 'all';
let currentType = 'all';
let currentSort = 'featured';
let currentPriceRange = 'all';

document.addEventListener('DOMContentLoaded', () => {
  // Check URL params for initial category
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get('category');
  if (urlCategory) {
    currentCategory = urlCategory;
  }
  const urlType = params.get('type');
  if (urlType) {
    currentType = urlType;
  }
  const urlSort = params.get('sort');
  if (urlSort) {
    currentSort = urlSort;
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.value = urlSort;
    }
  }

  // Parse search query from URL
  const urlSearch = params.get('search');
  const searchInput = document.getElementById('searchInput');
  if (urlSearch && searchInput) {
    searchInput.value = urlSearch;
  }

  renderCategoryFilters();
  renderProducts();
  initSortDropdown();
  initPriceFilter();
  initSearchInput();
});

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  let html = '';
  CATEGORIES.forEach(cat => {
    html += `
      <button class="filter-chip ${cat.id === currentCategory ? 'active' : ''}" 
              data-category="${cat.id}" 
              onclick="filterByCategory('${cat.id}')">
        <i data-lucide="${cat.icon}" style="width:16px;height:16px;"></i>
        <span>${cat.name}</span>
        <span class="filter-chip__count">${cat.count}</span>
      </button>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function filterByCategory(category) {
  currentCategory = category;
  currentType = 'all'; // Reset type when category is chosen
  
  // Update active chip
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === category);
  });

  renderProducts();

  // Update URL without reload
  const url = new URL(window.location);
  url.searchParams.delete('type');
  if (category === 'all') {
    url.searchParams.delete('category');
  } else {
    url.searchParams.set('category', category);
  }
  history.pushState({}, '', url);
}

function initSortDropdown() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
}

function initPriceFilter() {
  const priceSelect = document.getElementById('priceFilter');
  if (!priceSelect) return;

  priceSelect.addEventListener('change', (e) => {
    currentPriceRange = e.target.value;
    renderProducts();
  });
}

function getFilteredProducts() {
  let products = [...PRODUCTS];

  if (currentCategory !== 'all') {
    products = products.filter(p => p.category === currentCategory);
  }

  if (currentType !== 'all') {
    products = products.filter(p => p.type === currentType);
  }

  // Live search filter
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  if (query) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.stones && p.stones.toLowerCase().includes(query)) ||
      (p.finish && p.finish.toLowerCase().includes(query)) ||
      (p.material && p.material.toLowerCase().includes(query))
    );
  }

  // Price filter
  switch (currentPriceRange) {
    case 'under-3000':
      products = products.filter(p => p.price < 3000);
      break;
    case '3000-5000':
      products = products.filter(p => p.price >= 3000 && p.price <= 5000);
      break;
    case '5000-10000':
      products = products.filter(p => p.price >= 5000 && p.price <= 10000);
      break;
    case 'above-10000':
      products = products.filter(p => p.price > 10000);
      break;
  }

  // Sort
  switch (currentSort) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products.sort((a, b) => b.id - a.id);
      break;
    case 'featured':
    default:
      products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return products;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  const products = getFilteredProducts();

  if (countEl) {
    countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="shop-empty">
        <i data-lucide="package-x" style="width:64px;height:64px;color:var(--text-muted);"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters to find what you're looking for.</p>
        <button class="btn btn--outline" onclick="filterByCategory('all')">View All Products</button>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  let html = '';
  products.forEach((product, index) => {
    const badgeHTML = product.badge ? `<span class="badge badge--${product.badge === 'bestseller' ? 'featured' : product.badge}">${product.badge.toUpperCase()}</span>` : '';
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const activeWishlistClass = isInWishlist(product.id) ? 'active' : '';
    const heartFillStyle = isInWishlist(product.id) ? 'style="fill: var(--pink-primary);"' : '';

    html += `
      <div class="card product-card" style="animation-delay: ${index * 0.08}s">
        <div class="card__image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${badgeHTML ? `<div class="product-card__badge">${badgeHTML}</div>` : ''}
          ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}
          
          <button class="wishlist-toggle ${activeWishlistClass}" onclick="event.preventDefault(); handleWishlistToggle(${product.id}, this);" aria-label="Add to wishlist">
            <i data-lucide="heart" ${heartFillStyle}></i>
          </button>

          <div class="card__overlay">
            <div class="product-card__overlay-actions">
              <a href="product.html?id=${product.id}" class="btn btn--primary btn--sm">View Details</a>
              <button class="btn btn--outline btn--sm" onclick="event.preventDefault(); addToCart(${product.id})">
                <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <a href="product.html?id=${product.id}" class="card__body">
          <span class="card__category">${getCategoryLabel(product.category)}</span>
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

function getCategoryLabel(catId) {
  const labels = {
    'bangles': 'Bangles',
    'necklaces': 'Necklaces',
    'earrings': 'Earrings'
  };
  return labels[catId] || catId;
}

function initSearchInput() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(() => {
    // Update URL query parameters without reloading
    const url = new URL(window.location);
    const query = searchInput.value.trim();
    if (query) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    history.pushState({}, '', url);

    renderProducts();
  }, 300));
}
