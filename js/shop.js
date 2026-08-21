/* =====================================================
   KANNIKA BANGLES — Shop Page Logic
   Filtering, Sorting, Product Grid Rendering
   ===================================================== */

let currentCategory = 'all';
let currentType = 'all';
let currentSort = 'featured';
let currentPriceRange = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  // Check pathname first (e.g., /bangles, /pendant-sets, /necklaces, /earrings)
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (['bangles', 'pendant-sets', 'necklaces', 'earrings'].includes(path)) {
    currentCategory = path;
  }

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

  // Fetch full live catalog from API to ensure in-memory products match MongoDB Atlas exactly
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const dbProducts = await res.json();
      if (Array.isArray(dbProducts) && dbProducts.length > 0) {
        window.PRODUCTS = dbProducts;
        if (typeof CATEGORIES !== 'undefined') {
          CATEGORIES.forEach(cat => {
            if (cat.id === 'all') {
              cat.count = dbProducts.length;
            } else {
              cat.count = dbProducts.filter(p => p.category === cat.id).length;
            }
          });
        }
      }
    }
  } catch (e) {
    console.error('Error syncing live products in shop:', e);
  }

  if (typeof fetchAllProductRatings !== 'undefined') {
    await fetchAllProductRatings();
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
    const url = cat.id === 'all' ? '/shop' : `/${cat.id}`;
    html += `
      <a href="${url}" 
         class="filter-chip ${cat.id === currentCategory ? 'active' : ''}" 
         data-category="${cat.id}" 
         style="text-decoration: none;">
        <i data-lucide="${cat.icon}" style="width:16px;height:16px;"></i>
        <span>${cat.name}</span>
        <span class="filter-chip__count">${cat.count}</span>
      </a>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

const CATEGORY_TITLES = {
  'all': {
    h1: 'Indian Wedding & Bridal Jewellery Collection Bangalore',
    label: 'All Collections',
    title: 'Jewellery Shop in Bangalore | Bridal Bangles | Kannika'
  },
  'bangles': {
    h1: 'Bridal Bangles & Traditional Kadas in Bangalore',
    label: 'Bangles',
    title: 'Bridal Bangles & Kadas in Bangalore | Kannika Bangles'
  },
  'pendant-sets': {
    h1: 'Handcrafted Pendant Sets & Bridal Jewellery in Bangalore',
    label: 'Pendant Sets',
    title: 'Bridal Pendant Sets in Bangalore | Kannika Bangles'
  },
  'necklaces': {
    h1: 'Exquisite Bridal Necklaces & Kundan Sets in Bangalore',
    label: 'Necklaces',
    title: 'Handcrafted Bridal Necklaces in Bangalore | Kannika Bangles'
  },
  'earrings': {
    h1: 'Designer Earrings, Jhumkas & Studs in Bangalore',
    label: 'Earrings',
    title: 'Designer Earrings & Jhumkas in Bangalore | Kannika Bangles'
  }
};

function filterByCategory(category) {
  currentCategory = category;
  currentType = 'all'; // Reset type when category is chosen
  
  // Update active chip
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === category);
  });

  // Update active state in navbar dropdown
  document.querySelectorAll('.navbar__dropdown-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkCat = href.replace(/^\//, '').replace(/\/$/, '');
    link.classList.toggle('active', (category === 'all' && (linkCat === 'shop' || linkCat === '')) || linkCat === category);
  });

  // Update H1, Breadcrumb, and Document Title
  const meta = CATEGORY_TITLES[category] || CATEGORY_TITLES['all'];
  const h1El = document.getElementById('seoMainH1');
  if (h1El) h1El.innerHTML = meta.h1;

  const breadcrumbCurrent = document.querySelector('.shop-header__breadcrumb .current');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = meta.label;

  document.title = meta.title;

  renderProducts();

  // Update URL pathname cleanly without reload
  const newPath = category === 'all' ? '/shop' : `/${category}`;
  history.pushState({ category }, '', newPath);
}

// Handle browser Back/Forward navigation smoothly
window.addEventListener('popstate', () => {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const cat = ['bangles', 'pendant-sets', 'necklaces', 'earrings'].includes(path) ? path : 'all';
  filterByCategory(cat);
});

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
  let products = (window.PRODUCTS && window.PRODUCTS.length > 0) ? [...window.PRODUCTS] : (typeof PRODUCTS !== 'undefined' ? [...PRODUCTS] : []);

  if (currentCategory !== 'all') {
    products = products.filter(p => p.category === currentCategory || p.type === currentCategory);
  }

  if (currentType !== 'all') {
    products = products.filter(p => p.type === currentType || p.category === currentType);
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
      products.sort((a, b) => {
        const ratingA = typeof getProductRealtimeRating !== 'undefined' ? getProductRealtimeRating(a.id).avg : 5.0;
        const ratingB = typeof getProductRealtimeRating !== 'undefined' ? getProductRealtimeRating(b.id).avg : 5.0;
        return ratingB - ratingA;
      });
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

    html += `
      <div class="card product-card" style="animation-delay: ${index * 0.08}s">
        <div class="card__image">
          <img src="${getProductImageUrl(product.image)}" alt="Kannika Bangles product - ${product.name}" loading="lazy">
          ${badgeHTML ? `<div class="product-card__badge">${badgeHTML}</div>` : ''}
          ${discount > 0 ? `<div class="product-card__discount">-${discount}%</div>` : ''}

          <div class="card__overlay">
            <div class="product-card__overlay-actions">
              <a href="/product/${product.id}" class="btn btn--primary btn--sm">View Details</a>
              <button class="btn btn--outline btn--sm" onclick="event.preventDefault(); addToCart(${product.id})">
                <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="card__body">
          <span class="card__category">${getCategoryLabel(product.category)}</span>
          <h3 class="card__title"><a href="/product/${product.id}" style="color:inherit;text-decoration:none;">${product.name}</a></h3>
          <div class="card__price">
            ${formatPrice(product.price)}
            ${product.originalPrice > product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
            <span class="stars">${getStarRating(getProductRealtimeRating(product.id).avg)}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${getProductRealtimeRating(product.id).avg} (${getProductRealtimeRating(product.id).count})</span>
          </div>
          <div class="card__cta-row" style="margin-top: 10px; width: 100%;">
            <a href="/product/${product.id}" class="btn btn--outline btn--sm" style="width: 100%; justify-content: center; font-size: 0.82rem; font-weight: 600; padding: 8px 12px; border-radius: 6px; text-decoration: none;">View Details</a>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getCategoryLabel(catId) {
  const labels = {
    'bangles': 'Bangles',
    'pendant-sets': 'Pendant Sets',
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
