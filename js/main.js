/* =====================================================
   KANNIKA BANGLES — Main JavaScript
   Navigation, Animations, Cart Badge, Shared Logic
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollAnimations();
  initBackToTop();
  updateCartBadge();
  updateWishlistBadge();
  initGlobalSearch();
  initLucide();
});

/* ─── Loading Screen ─── */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });

  // Fallback: hide loader after 3s
  setTimeout(() => {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 3000);
}

/* ─── Navbar Scroll Effect ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle, .navbar__toggle-left');
  const links = document.querySelector('.navbar__links');

  if (!navbar) return;

  // Scroll effect - solid bg on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Check initial scroll position
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    links.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && links.classList.contains('open')) {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ─── Scroll Animations (Intersection Observer) ─── */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-group');
  
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after revealed
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ─── Back to Top Button ─── */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Cart Management (Supabase DB + local fallback) ─── */
function getLocalCart() {
  try {
    return JSON.parse(localStorage.getItem('kannika_cart')) || [];
  } catch {
    return [];
  }
}

function saveLocalCart(cart) {
  localStorage.setItem('kannika_cart', JSON.stringify(cart));
}

async function getCart() {
  if (!supabaseClient) return getLocalCart();
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return []; // Guests always have empty carts since auth is required!

    const { data, error } = await supabaseClient
      .from('cart_items')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) throw error;
    return data.map(item => ({
      id: item.product_id,
      size: item.size,
      quantity: item.quantity
    }));
  } catch (err) {
    console.warn('Supabase cart fetch failed, using local fallback:', err);
    return getLocalCart();
  }
}

async function addToCart(productId, size = '2.6', quantity = 1) {
  if (!supabaseClient) {
    showToast('Database client not initialized');
    return;
  }
  
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    showToast('Please log in to add items to cart! 🔒', '🔒');
    setTimeout(() => {
      window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
    }, 1500);
    return;
  }

  const userId = session.user.id;
  try {
    const { data: existing, error: fetchError } = await supabaseClient
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', parseInt(productId))
      .eq('size', size)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      const { error: updateError } = await supabaseClient
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id);
      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabaseClient
        .from('cart_items')
        .insert([{ user_id: userId, product_id: parseInt(productId), size, quantity }]);
      if (insertError) throw insertError;
    }

    showToast('Added to cart! 🛍️');
    await updateCartBadge();
  } catch (error) {
    console.warn('Database cart write failed, utilizing local fallback:', error);
    const cart = getLocalCart();
    const existingIndex = cart.findIndex(item => item.id === parseInt(productId) && item.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id: parseInt(productId), size, quantity });
    }

    saveLocalCart(cart);
    showToast('Added to local cart!');
    await updateCartBadge();
  }
}

async function removeFromCart(productId, size) {
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        const { error } = await supabaseClient
          .from('cart_items')
          .delete()
          .eq('user_id', session.user.id)
          .eq('product_id', parseInt(productId))
          .eq('size', size);
        if (error) throw error;
        await updateCartBadge();
        return;
      }
    } catch (err) {
      console.warn('Failed database deletion, removing locally:', err);
    }
  }

  let cart = getLocalCart();
  cart = cart.filter(item => !(item.id === parseInt(productId) && item.size === size));
  saveLocalCart(cart);
  await updateCartBadge();
}

async function updateCartQuantity(productId, size, quantity) {
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        const { error } = await supabaseClient
          .from('cart_items')
          .update({ quantity: Math.max(1, quantity) })
          .eq('user_id', session.user.id)
          .eq('product_id', parseInt(productId))
          .eq('size', size);
        if (error) throw error;
        await updateCartBadge();
        return;
      }
    } catch (err) {
      console.warn('Failed database update, updating locally:', err);
    }
  }

  const cart = getLocalCart();
  const item = cart.find(item => item.id === parseInt(productId) && item.size === size);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveLocalCart(cart);
  }
  await updateCartBadge();
}

async function getCartCount() {
  const cart = await getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

async function getCartTotal() {
  const cart = await getCart();
  let total = 0;
  cart.forEach(item => {
    const product = getProductById(item.id);
    if (product) {
      total += product.price * item.quantity;
    }
  });
  return total;
}

async function clearCart() {
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        const { error } = await supabaseClient
          .from('cart_items')
          .delete()
          .eq('user_id', session.user.id);
        if (error) throw error;
        await updateCartBadge();
        return;
      }
    } catch (err) {
      console.warn('Failed database cart clearing, removing locally:', err);
    }
  }

  localStorage.removeItem('kannika_cart');
  await updateCartBadge();
}

async function updateCartBadge() {
  const badges = document.querySelectorAll('.navbar__cart-badge');
  const count = await getCartCount();
  
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  });
}

/* ─── Toast Notification ─── */
function showToast(message, icon = '✓') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast__icon">${icon}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-hide
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

/* ─── Initialize Lucide Icons ─── */
function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ─── Utility: Debounce ─── */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const WHATSAPP_ORDER_PHONE = '919844758450';

async function getCartOrderDetails() {
  const cart = await getCart();
  const items = [];
  let subtotal = 0;
  let savings = 0;

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    savings += Math.max(0, product.originalPrice - product.price) * item.quantity;
    items.push({ cartItem: item, product, itemTotal });
  });

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  return { items, subtotal, savings, shipping, total };
}

async function buildWhatsAppOrderMessage(shippingDetails = null) {
  const { items, subtotal, savings, shipping, total } = await getCartOrderDetails();
  if (items.length === 0) return '';

  let message = '*Booking Request from Kannika Bangles Website*\n\n';

  if (shippingDetails) {
    message += '*Shipping & Delivery Details:*\n';
    message += `👤 Name: ${shippingDetails.name}\n`;
    message += `📞 Phone: ${shippingDetails.phone}\n`;
    message += `📍 Address: ${shippingDetails.address}\n`;
    message += `🏙️ City/State: ${shippingDetails.city}, ${shippingDetails.state}\n`;
    message += `📮 Pincode: ${shippingDetails.pincode}\n\n`;
    message += '*Order Items:*\n';
  }

  items.forEach(({ cartItem, product, itemTotal }, index) => {
    const category = (CATEGORIES.find(c => c.id === product.category) || {}).name || product.category;
    message += `${index + 1}. *${product.name}*\n`;
    message += `   Product ID: ${product.id}\n`;
    message += `   Size: ${cartItem.size}\n`;
    message += `   Quantity: ${cartItem.quantity}\n`;
    message += `   Unit Price: ${formatPrice(product.price)}\n`;
    message += `   Item Total: ${formatPrice(itemTotal)}\n\n`;
  });

  message += '------------------------------\n';
  message += `Subtotal: ${formatPrice(subtotal)}\n`;
  if (savings > 0) message += `Savings: -${formatPrice(savings)}\n`;
  message += `Shipping: ${shipping === 0 ? 'FREE' : formatPrice(shipping)}\n`;
  message += `*Final Total: ${formatPrice(total)}*\n\n`;
  message += 'Please confirm availability and booking. Thank you!';

  return message;
}

async function getWhatsAppOrderUrl(shippingDetails = null) {
  const message = await buildWhatsAppOrderMessage(shippingDetails);
  if (!message) return '';
  return `https://wa.me/${WHATSAPP_ORDER_PHONE}?text=${encodeURIComponent(message)}`;
}

/* ─── Render Navbar HTML (reusable across pages) ─── */
function getNavbarHTML(activePage = '') {
  return `
    <nav class="navbar" id="navbar">
      <div class="navbar__inner">
        <a href="index.html" class="navbar__brand">
          <div class="navbar__logo-icon">💍</div>
          <div class="navbar__logo"><span>Kannika</span> Bangles</div>
        </a>
        <ul class="navbar__links" id="navLinks">
          <li><a href="index.html" class="navbar__link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="shop.html" class="navbar__link ${activePage === 'shop' ? 'active' : ''}">Shop</a></li>
          <li><a href="about.html" class="navbar__link ${activePage === 'about' ? 'active' : ''}">About</a></li>
          <li><a href="contact.html" class="navbar__link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
        </ul>
        <div class="navbar__actions">
          <a href="cart.html" class="navbar__cart" aria-label="Shopping Cart">
            <i data-lucide="shopping-bag" style="width:22px;height:22px;"></i>
            <span class="navbar__cart-badge">0</span>
          </a>
          <div class="navbar__toggle" id="navToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  `;
}

/* ─── Render Footer HTML (reusable across pages) ─── */
function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="footer__grid">
        <div class="footer__col">
          <div class="footer__brand-name"><span>Kannika</span> Bangles</div>
          <p class="footer__desc">Turning every bride's dream into a beautiful reality. Handcrafted bangles blending tradition with modern style since generations.</p>
          <div class="footer__social">
            <a href="#" class="footer__social-link" aria-label="Instagram"><i data-lucide="instagram" style="width:18px;height:18px;"></i></a>
            <a href="#" class="footer__social-link" aria-label="Facebook"><i data-lucide="facebook" style="width:18px;height:18px;"></i></a>
            <a href="#" class="footer__social-link" aria-label="Youtube"><i data-lucide="youtube" style="width:18px;height:18px;"></i></a>
          </div>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Quick Links</h4>
          <a href="index.html" class="footer__link">Home</a>
          <a href="shop.html" class="footer__link">Shop All</a>
          <a href="shop.html?category=bangles" class="footer__link">Bangles Collection</a>
          <a href="about.html" class="footer__link">Our Story</a>
          <a href="contact.html" class="footer__link">Contact Us</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Categories</h4>
          <a href="shop.html?category=bangles" class="footer__link">Bangles</a>
          <a href="shop.html?category=necklaces" class="footer__link">Necklaces</a>
          <a href="shop.html?category=earrings" class="footer__link">Earrings</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Get in Touch</h4>
          <div class="footer__contact-item">
            <i data-lucide="map-pin" style="width:18px;height:18px;"></i>
            <span>Sampige Road, Malleshwaram,<br>Bangalore, Karnataka</span>
          </div>
          <div class="footer__contact-item">
            <i data-lucide="phone" style="width:18px;height:18px;"></i>
            <a href="tel:08023462122">080 2346 2122</a>
          </div>
          <div class="footer__contact-item">
            <i data-lucide="mail" style="width:18px;height:18px;"></i>
            <a href="mailto:Srikannikabangles@gmail.com">Srikannikabangles@gmail.com</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© ${new Date().getFullYear()} Kannika Bangles. All rights reserved. Crafted with 💛 in Bangalore.</p>
      </div>
    </footer>

    <!-- WhatsApp Float Button -->
    <a href="https://wa.me/919844758450?text=Hi! I'm interested in your bangles collection." class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <!-- Back to Top -->
    <button class="back-to-top" aria-label="Back to top">
      <i data-lucide="chevron-up" style="width:22px;height:22px;"></i>
    </button>
  `;
}

/* ─── Wishlist Management (localStorage) ─── */
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('kannika_wishlist')) || [];
  } catch {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('kannika_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(parseInt(productId));
  let added = false;

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(parseInt(productId));
    added = true;
  }

  saveWishlist(wishlist);
  showToast(added ? 'Added to wishlist! ❤️' : 'Removed from wishlist');
  return added;
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(parseInt(productId));
}

function updateWishlistBadge() {
  const badges = document.querySelectorAll('.navbar__wishlist-badge');
  const wishlist = getWishlist();
  const count = wishlist.length;
  
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  });
}

function handleWishlistToggle(productId, btn) {
  const isAdded = toggleWishlist(productId);
  if (btn) {
    btn.classList.toggle('active', isAdded);
    const icon = btn.querySelector('i');
    if (icon) {
      if (isAdded) {
        icon.setAttribute('data-lucide', 'heart');
        icon.style.fill = 'var(--pink-primary)';
      } else {
        icon.setAttribute('data-lucide', 'heart');
        icon.style.fill = 'none';
      }
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

/* ─── Global Search Overlay Implementation ─── */
function initGlobalSearch() {
  // Inject Search Overlay HTML if not present
  if (!document.getElementById('globalSearchOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'globalSearchOverlay';
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-overlay__close" id="closeSearchOverlay">
        <i data-lucide="x" style="width:24px;height:24px;"></i>
      </div>
      <div class="search-overlay__content">
        <h2 class="search-overlay__title">Search <span class="text-gold">Our Catalog</span></h2>
        <form class="search-overlay__form" id="searchOverlayForm">
          <input type="text" class="search-overlay__input" id="searchOverlayInput" placeholder="Search bangles, necklaces, earrings..." required autocomplete="off">
          <button type="submit" class="search-overlay__btn" aria-label="Search">
            <i data-lucide="search" style="width:24px;height:24px;"></i>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const overlay = document.getElementById('globalSearchOverlay');
  const closeBtn = document.getElementById('closeSearchOverlay');
  const searchForm = document.getElementById('searchOverlayForm');
  const searchInput = document.getElementById('searchOverlayInput');

  // Intercept Search Button click on Navbar across pages
  document.querySelectorAll('.navbar__action-btn[aria-label="Search"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        overlay.classList.remove('active');
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

