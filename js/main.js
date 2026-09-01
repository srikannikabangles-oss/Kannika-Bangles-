// Centralized Shop Configuration
window.SUPPORT_PHONE = '9844758450';
window.SUPPORT_WHATSAPP_PHONE = '919844758450';

function syncPhoneNumbersDOM() {
  const supportPhone = window.SUPPORT_PHONE || '9844758450';
  const whatsappPhone = window.SUPPORT_WHATSAPP_PHONE || '919844758450';
  
  const phoneDisplay = `+91 ${supportPhone.substring(0, 5)} ${supportPhone.substring(5)}`;
  const phoneCallHref = `tel:+91${supportPhone}`;
  
  // 1. Update tel links
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = phoneCallHref;
    if (link.textContent.trim().match(/^(?:080|\+91|98447|\d{10})/)) {
      link.textContent = phoneDisplay;
    }
  });
  
  // 2. Update whatsapp float and normal whatsapp links
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    try {
      const url = new URL(link.href);
      const text = url.searchParams.get('text') || "Hi! I'm interested in your bangles collection.";
      link.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
    } catch (e) {
      link.href = `https://wa.me/${whatsappPhone}?text=Hi!%20I'm%20interested%20in%20your%20bangles%20collection.`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncPhoneNumbersDOM();
  // initLoader(); // Removed for performance upgrade
  fixIOSInputZoom();     // Prevent iOS auto-zoom on inputs
  initMobileBottomNav();
  initNavbar();
  updateActiveNavLink();
  initScrollAnimations();
  initBackToTop();
  updateCartBadge();
  initGlobalSearch();
  initGlobalEnquirySystem(); // Floating & Modal Enquiry with FormSubmit & Admin sync
  initStickyATC();       // Sticky add-to-cart on product pages
  initLucide();
});

function updateActiveNavLink() {
  const path = window.location.pathname.replace(/\/$/, '');
  const dropdownItems = document.querySelectorAll('.navbar__dropdown-item');

  dropdownItems.forEach(item => {
    const parentLink = item.querySelector('.navbar__link--has-dropdown');
    const childLinks = item.querySelectorAll('.navbar__dropdown-link');
    let hasActiveChild = false;

    childLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.replace(/\/$/, '');
      if (cleanHref === path || (cleanHref !== '' && (path === cleanHref || path.endsWith(cleanHref)))) {
        link.classList.add('active');
        hasActiveChild = true;
      } else {
        link.classList.remove('active');
      }
    });

    if (parentLink) {
      if (hasActiveChild) {
        parentLink.classList.add('active');
      } else {
        parentLink.classList.remove('active');
      }
    }
  });

  const topLevelLinks = document.querySelectorAll('.navbar__links > li > .navbar__link:not(.navbar__link--has-dropdown)');
  topLevelLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/$/, '');
    if (cleanHref === path || (cleanHref !== '' && cleanHref !== '/index.html' && path.endsWith(cleanHref))) {
      link.classList.add('active');
    } else if ((path === '' || path === '/index.html') && (cleanHref === '' || cleanHref === '/index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

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

/* ─── Navbar Scroll Effect + Smart Hide/Show + Mobile Drawer ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle, .navbar__toggle-left');
  const links = document.querySelector('.navbar__links');

  if (!navbar) return;

  // Create nav backdrop overlay (mobile menu dimming)
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeMenu = () => {
    toggle && toggle.classList.remove('active');
    links && links.classList.remove('open');
    if (links) {
      links.style.left = '';
      links.style.right = '';
    }
    backdrop && backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  // — Smart scroll behavior —
  let lastScrollY = window.scrollY;
  let ticking = false;
  const SCROLL_THRESHOLD = 80; // Minimum scroll before hide kicks in

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Apply scrolled class (glassmorphism bg)
        if (currentScrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Smart hide/show on mobile only
        if (window.innerWidth <= 768 && currentScrollY > SCROLL_THRESHOLD) {
          if (currentScrollY > lastScrollY + 4) {
            // Scrolling DOWN — hide navbar (but not when menu is open)
            if (links && !links.classList.contains('open')) {
              navbar.style.transform = 'translateY(-100%)';
            }
          } else if (currentScrollY < lastScrollY - 4) {
            // Scrolling UP — reveal navbar
            navbar.style.transform = 'translateY(0)';
          }
        } else {
          navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Check initial scroll position
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  }

  // CSS transition for smart hide/show
  navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.35s ease, background 0.35s ease, box-shadow 0.35s ease';

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.contains('open');
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      if (!isOpen) {
        links.style.left = '0';
        links.style.right = 'auto';
      } else {
        links.style.left = '';
        links.style.right = '';
      }
      backdrop.classList.toggle('active', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
      // Always show navbar when menu opens
      navbar.style.transform = 'translateY(0)';
    });

    // Close menu on link click
    links.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when backdrop clicked
    backdrop.addEventListener('click', closeMenu);

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && links.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links && links.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ─── Mobile Bottom Navigation Dynamic Insertion ─── */
function initMobileBottomNav() {
  const existingBottomNav = document.querySelector('.mobile-bottom-nav');
  if (existingBottomNav) {
    existingBottomNav.remove();
  }

  const bottomNav = document.createElement('nav');
  bottomNav.className = 'mobile-bottom-nav';
  bottomNav.setAttribute('aria-label', 'Mobile Navigation');

  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';

  const isHome = pageName === '' || pageName === 'index.html' || path === '/';
  const isShop = pageName === 'shop' || path.startsWith('/shop') || path.startsWith('/bangles') || path.startsWith('/pendant-sets') || path.startsWith('/necklaces') || path.startsWith('/earrings');
  const isCart = pageName === 'cart' || pageName === 'cart.html' || path === '/cart';

  bottomNav.innerHTML = `
    <a href="/" class="mobile-bottom-nav__item ${isHome ? 'active' : ''}" aria-label="Home">
      <i data-lucide="home" style="width:22px;height:22px;"></i>
      <span>Home</span>
    </a>
    <a href="/shop" class="mobile-bottom-nav__item ${isShop ? 'active' : ''}" aria-label="Shop">
      <i data-lucide="gem" style="width:22px;height:22px;"></i>
      <span>Shop</span>
    </a>
    <button type="button" class="mobile-bottom-nav__item mobile-bottom-nav__item--enquiry" aria-label="Enquire" onclick="openGlobalEnquiryModal();" style="background:transparent;border:none;cursor:pointer;font-family:inherit;">
      <i data-lucide="message-square-heart" style="width:22px;height:22px;color:var(--pink-primary);"></i>
      <span>Enquire</span>
    </button>
    <a href="/cart" class="mobile-bottom-nav__item ${isCart ? 'active' : ''}" aria-label="Cart">
      <i data-lucide="shopping-bag" style="width:22px;height:22px;"></i>
      <span class="navbar__cart-badge">0</span>
      <span>Cart</span>
    </a>
  `;

  document.body.appendChild(bottomNav);

  // Add touch ripple effect to all bottom nav items
  bottomNav.querySelectorAll('.mobile-bottom-nav__item').forEach(item => {
    item.addEventListener('click', () => {
      hapticFeedback('light');
    });

    item.addEventListener('touchstart', () => {
      item.classList.add('tapped');
      setTimeout(() => item.classList.remove('tapped'), 350);
    }, { passive: true });
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
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

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Cart Management (MongoDB API + local fallback) ─── */
function getLocalCart() {
  try {
    const data = localStorage.getItem('kannika_cart');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('[Cart] getLocalCart error:', e);
    return [];
  }
}

function saveLocalCart(cart) {
  localStorage.setItem('kannika_cart', JSON.stringify(cart));
}

async function getCart() {
  const userId = getLoggedInUserId();
  
  if (userId) {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (res.ok) {
        const dbItems = await res.json();
        const merged = dbItems.map(item => ({
          id: item.id,
          size: item.size,
          quantity: item.quantity
        }));
        saveLocalCart(merged);
        return merged;
      }
    } catch (err) {
      console.warn('[Cart] Failed to fetch database cart, using local fallback:', err);
    }
  }

  return getLocalCart();
}

async function syncCartFromDatabase(userId) {
  if (!userId) return;
  try {
    const res = await fetch(`/api/cart?userId=${userId}`);
    if (res.ok) {
      const dbItems = await res.json();
      const merged = dbItems.map(item => ({
        id: item.id,
        size: item.size,
        quantity: item.quantity
      }));
      saveLocalCart(merged);
      await updateCartBadge();
      if (typeof renderCart === 'function') {
        renderCart();
      }
      if (typeof renderCheckout === 'function') {
        renderCheckout();
      }
    }
  } catch (err) {
    console.warn('Failed to sync cart from database:', err);
  }
}

async function addToCart(productId, size = '2.6', quantity = 1) {
  const cart = getLocalCart();
  const existingIndex = cart.findIndex(item => item.id === parseInt(productId) && item.size === size);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ id: parseInt(productId), size, quantity });
  }
  saveLocalCart(cart);
  showToast('Added to cart! 🛍️');
  await updateCartBadge();

  const userId = getLoggedInUserId();
  if (userId) {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: parseInt(productId), size, quantity })
      });
    } catch (error) {
      console.warn('API cart sync failed, local save intact:', error);
    }
  }
}

// Backup & Recovery Helpers
async function restoreCartFromBackup() {
  try {
    const backup = JSON.parse(localStorage.getItem('kannika_cart_backup'));
    if (!backup || backup.length === 0) return false;
    
    const userId = getLoggedInUserId();
    if (userId) {
      // Clear database cart first
      await clearCart();
      // Restore to Supabase
      for (const item of backup) {
        await addToCart(item.id, item.size, item.quantity);
      }
    } else {
      // Restore to local guest cart
      localStorage.setItem('kannika_cart', JSON.stringify(backup));
    }
    
    localStorage.removeItem('kannika_cart_backup');
    showToast('Cart restored successfully! 🛍️', '🛍️');
    await updateCartBadge();
    return true;
  } catch (e) {
    console.error('Failed to restore cart:', e);
    return false;
  }
}

async function removeFromCart(productId, size) {
  let cart = getLocalCart();
  cart = cart.filter(item => !(item.id === parseInt(productId) && item.size === size));
  saveLocalCart(cart);
  await updateCartBadge();

  const userId = getLoggedInUserId();
  if (userId) {
    try {
      await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: parseInt(productId), size })
      });
    } catch (err) {
      console.warn('Failed API cart remove, local unchanged:', err);
    }
  }
}

async function updateCartQuantity(productId, size, quantity) {
  const cart = getLocalCart();
  const item = cart.find(item => item.id === parseInt(productId) && item.size === size);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveLocalCart(cart);
  }
  await updateCartBadge();

  const userId = getLoggedInUserId();
  if (userId) {
    try {
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: parseInt(productId), size, quantity: Math.max(1, quantity) })
      });
    } catch (err) {
      console.warn('Failed API cart update, local unchanged:', err);
    }
  }
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
  localStorage.removeItem('kannika_cart');
  await updateCartBadge();

  const userId = getLoggedInUserId();
  if (userId) {
    try {
      await fetch('/api/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
    } catch (err) {
      console.warn('Failed API cart clear, local cleared:', err);
    }
  }
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

async function buildWhatsAppOrderMessage(shippingDetails = null, orderId = null) {
  const { items, subtotal, savings, shipping, total } = await getCartOrderDetails();
  if (items.length === 0) return '';

  let message = '*Booking Request from Kannika Bangles Website*\n';
  if (orderId) {
    message += `Order Reference ID: #${orderId.substring(0, 8).toUpperCase()}\n`;
  }
  message += '\n';

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
    const prodCode = product.code || product.sku || `KB-${product.id}`;
    message += `${index + 1}. *${product.name}*\n`;
    message += `   Product ID: ${prodCode}\n`;
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

async function getWhatsAppOrderUrl(shippingDetails = null, orderId = null) {
  const message = await buildWhatsAppOrderMessage(shippingDetails, orderId);
  if (!message) return '';
  const whatsappPhone = window.SUPPORT_WHATSAPP_PHONE || '919844758450';
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

/* ─── Render Navbar HTML (reusable across pages) ─── */
function getNavbarHTML(activePage = '') {
  return `
    <nav class="navbar" id="navbar">
      <div class="navbar__inner">
        <a href="/" class="navbar__brand">
          <div class="navbar__logo-icon">💍</div>
          <div class="navbar__logo"><span>Kannika</span> Bangles</div>
        </a>
        <ul class="navbar__links" id="navLinks">
          <li><a href="/" class="navbar__link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="/shop" class="navbar__link ${activePage === 'shop' ? 'active' : ''}">Shop</a></li>
          <li><a href="/about" class="navbar__link ${activePage === 'about' ? 'active' : ''}">About</a></li>
          <li><a href="/contact" class="navbar__link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
        </ul>
        <div class="navbar__actions">
          <a href="/cart" class="navbar__cart" aria-label="Shopping Cart">
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
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Quick Links</h4>
          <a href="/" class="footer__link">Home</a>
          <a href="/shop" class="footer__link">Shop All</a>
          <a href="/bridal-jewellery-bangalore" class="footer__link">Bridal Jewellery</a>
          <a href="/temple-jewellery-bangalore" class="footer__link">Temple Jewellery</a>
          <a href="/about.html" class="footer__link">Our Story</a>
          <a href="/contact.html" class="footer__link">Contact Us</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Categories</h4>
          <a href="/bangles" class="footer__link">Bangles</a>
          <a href="/necklaces" class="footer__link">Necklaces</a>
          <a href="/pendant-sets" class="footer__link">Pendant Sets</a>
          <a href="/earrings" class="footer__link">Earrings</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Policies</h4>
          <a href="/no-return-policy.html" class="footer__link">No Return Policy</a>
          <a href="/exchange-policy.html" class="footer__link">Exchange Policy</a>
          <a href="/delivery-policy.html" class="footer__link">Delivery Policy</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__heading">Get in Touch</h4>
          <div class="footer__contact-item">
            <i data-lucide="map-pin" style="width:18px;height:18px;"></i>
            <span>No. 157/108, 9th Cross, East Park Road, Malleshwaram, Bengaluru, Karnataka 560003</span>
          </div>
          <div class="footer__contact-item">
            <i data-lucide="phone" style="width:18px;height:18px;"></i>
            <a href="tel:+919844758450">+91 98447 58450</a>
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

/* ─── GLOBAL ENQUIRY SYSTEM (FormSubmit.co + MongoDB Admin Sync) ─── */
const STORE_CLIENT_EMAIL = 'Srikannikabangles@gmail.com';

function initGlobalEnquirySystem() {
  // 1. Inject Floating Enquiry Button if not already present
  if (!document.getElementById('floatingEnquiryBtn')) {
    const floatBtn = document.createElement('button');
    floatBtn.id = 'floatingEnquiryBtn';
    floatBtn.className = 'floating-enquiry-btn';
    floatBtn.setAttribute('aria-label', 'Enquire Now');
    floatBtn.onclick = () => openGlobalEnquiryModal();
    floatBtn.innerHTML = `
      <i data-lucide="sparkles" style="width:18px;height:18px;"></i>
      <span>Enquire Now</span>
    `;
    document.body.appendChild(floatBtn);
  }

  // 2. Inject Global Enquiry Modal if not already present
  if (!document.getElementById('globalEnquiryModal')) {
    const modal = document.createElement('div');
    modal.id = 'globalEnquiryModal';
    modal.className = 'enquiry-modal-backdrop';
    modal.innerHTML = `
      <div class="enquiry-modal-card" onclick="event.stopPropagation()">
        <button type="button" class="enquiry-modal-close" onclick="closeGlobalEnquiryModal()" aria-label="Close Enquiry Modal">
          <i data-lucide="x" style="width:20px;height:20px;"></i>
        </button>
        
        <div class="enquiry-modal-header">
          <div class="enquiry-modal-badge">
            <i data-lucide="gem" style="width:14px;height:14px;"></i>
            <span>Sri Kannika Bangles • Bangalore</span>
          </div>
          <h2 class="enquiry-modal-title">Custom Order &amp; Jewellery Inquiry</h2>
          <p class="enquiry-modal-subtitle">Direct showroom inquiry. We will contact you via WhatsApp / Email with full pricing, sizes &amp; details.</p>
        </div>

        <form id="globalEnquiryForm" class="enquiry-modal-form" onsubmit="handleGlobalEnquirySubmit(event)">
          <div class="form-row-2">
            <div class="enquiry-input-group">
              <label for="eqName">Your Full Name <span class="req">*</span></label>
              <input type="text" id="eqName" name="name" placeholder="e.g. Ananya Sharma" required>
            </div>
            <div class="enquiry-input-group">
              <label for="eqPhone">WhatsApp / Phone Number <span class="req">*</span></label>
              <input type="tel" id="eqPhone" name="phone" placeholder="e.g. 98447 58450" required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="enquiry-input-group">
              <label for="eqEmail">Email Address <span class="req">*</span></label>
              <input type="email" id="eqEmail" name="email" placeholder="e.g. ananya@example.com" required>
            </div>
            <div class="enquiry-input-group">
              <label for="eqInterest">Jewellery Category of Interest</label>
              <select id="eqInterest" name="interest">
                <option value="Saree & Lehenga Matching Consultation">👗 Saree &amp; Lehenga Matching Consultation</option>
                <option value="Book a 5-Min Live Video Call">🎥 Book a 5-Min Live Video Call</option>
                <option value="Bridal Jewellery Bangalore Sets">✨ Complete Bridal Suite / Wedding Set</option>
                <option value="Temple Jewellery & Nakshi Harams">🛕 Antique Temple Jewellery &amp; Harams</option>
                <option value="Bridal Bangles & Kadas">⭕ Bridal Bangles &amp; Kadas</option>
                <option value="Bridal Necklaces & Chokers">📿 Necklaces &amp; Chokers</option>
                <option value="Pendant Sets & Lockets">💎 Pendant Sets &amp; Lockets</option>
                <option value="Designer Earrings & Jhumkas">🌸 Designer Earrings &amp; Jhumkas</option>
                <option value="Bulk Wedding Order Inquiry">🛍️ Bulk Wedding / Return Gifts</option>
                <option value="Other Query">💬 Other Query</option>
              </select>
            </div>
          </div>

          <div class="enquiry-input-group">
            <label for="eqMessage">Your Message / Custom Requirements <span class="req">*</span></label>
            <textarea id="eqMessage" name="message" rows="3" placeholder="Tell us the bangles size, quantity, event date or specific design you are looking for..." required></textarea>
          </div>

          <div class="enquiry-form-footer">
            <p class="enquiry-form-notice">
              <i data-lucide="shield-check" style="width:15px;height:15px;color:var(--accent-emerald);"></i>
              Your details are safe. Received directly by our showroom owner.
            </p>
            <button type="submit" id="btnSubmitEnquiry" class="btn btn--primary btn--lg enquiry-submit-btn">
              <i data-lucide="send" style="width:18px;height:18px;"></i>
              <span>Send Inquiry to Showroom</span>
            </button>
          </div>
        </form>
      </div>
    `;

    modal.onclick = (e) => {
      if (e.target === modal) closeGlobalEnquiryModal();
    };

    document.body.appendChild(modal);
  }

  // Attach click events to any enquiry trigger buttons across page
  document.querySelectorAll('[data-open-enquiry]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = el.getAttribute('data-enquiry-topic') || '';
      const msg = el.getAttribute('data-enquiry-msg') || '';
      openGlobalEnquiryModal(topic, msg);
    });
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.openGlobalEnquiryModal = function(topic = '', msg = '') {
  const modal = document.getElementById('globalEnquiryModal');
  if (!modal) {
    initGlobalEnquirySystem();
  }
  const modalEl = document.getElementById('globalEnquiryModal');
  if (!modalEl) return;

  if (topic) {
    const interestSel = document.getElementById('eqInterest');
    if (interestSel) {
      let found = false;
      for (let i = 0; i < interestSel.options.length; i++) {
        if (interestSel.options[i].value.toLowerCase().includes(topic.toLowerCase())) {
          interestSel.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        interestSel.value = 'Other Query';
      }
    }
  }

  if (msg) {
    const msgEl = document.getElementById('eqMessage');
    if (msgEl && !msgEl.value) {
      msgEl.value = msg;
    }
  }

  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.closeGlobalEnquiryModal = function() {
  const modal = document.getElementById('globalEnquiryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleGlobalEnquirySubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('btnSubmitEnquiry');
  const originalBtnContent = btn ? btn.innerHTML : 'Send Inquiry';

  const name = (document.getElementById('eqName')?.value || '').trim();
  const phone = (document.getElementById('eqPhone')?.value || '').trim();
  const email = (document.getElementById('eqEmail')?.value || '').trim();
  const interest = (document.getElementById('eqInterest')?.value || '').trim();
  const message = (document.getElementById('eqMessage')?.value || '').trim();

  if (!name || !phone || !email || !message) {
    showToast('Please fill in all required fields.', '⚠️');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="loader__ring" style="width:16px;height:16px;border-width:2px;display:inline-block;margin:0 6px 0 0;"></span> Sending to Showroom...';
  }

  const payload = {
    name,
    phone,
    email,
    interest,
    message,
    page: window.location.href,
    source: `Website Modal (${interest || 'General'})`,
    _subject: `New Jewellery Inquiry from ${name} - Sri Kannika Bangles`,
    _captcha: 'false',
    _template: 'table'
  };

  try {
    // 1. Submit to FormSubmit.co for direct client email delivery & activation link support
    const formSubmitPromise = fetch(`https://formsubmit.co/ajax/${STORE_CLIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.warn('FormSubmit email dispatch fallback:', err);
    });

    // 2. Submit to MongoDB / Express API so inquiry appears immediately in Admin Panel
    const dbPromise = fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message: `[Interest: ${interest}] ${message}`,
        source: `Website Inquiry Modal`
      })
    }).catch(err => {
      console.warn('Backend DB inquiry save error:', err);
    });

    await Promise.allSettled([formSubmitPromise, dbPromise]);

    form.reset();
    closeGlobalEnquiryModal();
    showToast('Thank you! Your enquiry has been sent directly to our showroom team.', '💌');

  } catch (error) {
    console.error('Enquiry submission error:', error);
    showToast('Enquiry sent! Our showroom team will get back to you.', '💌');
    form.reset();
    closeGlobalEnquiryModal();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalBtnContent;
    }
  }
};

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
          <input type="text" class="search-overlay__input" id="searchOverlayInput" placeholder="Search bangles, pendant sets..." required autocomplete="off">
          <button type="submit" class="search-overlay__btn" aria-label="Search">
            <i data-lucide="search" style="width:24px;height:24px;"></i>
          </button>
        </form>
        <div class="search-overlay__results" id="searchOverlayResults"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const overlay = document.getElementById('globalSearchOverlay');
  const closeBtn = document.getElementById('closeSearchOverlay');
  const searchForm = document.getElementById('searchOverlayForm');
  const searchInput = document.getElementById('searchOverlayInput');
  const resultsContainer = document.getElementById('searchOverlayResults');

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
      resultsContainer.classList.remove('active');
      searchInput.value = '';
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      resultsContainer.classList.remove('active');
      searchInput.value = '';
    }
  });

  // Live filter event listener
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.remove('active');
      return;
    }

    try {
      let products = (typeof window !== 'undefined' && Array.isArray(window.PRODUCTS) && window.PRODUCTS.length > 0)
        ? window.PRODUCTS
        : null;

      if (!products) {
        const res = await fetch('/api/products');
        if (res.ok) {
          products = await res.json();
          window.PRODUCTS = products;
        }
      }

      if (!products && typeof PRODUCTS !== 'undefined') {
        products = PRODUCTS;
      }
      products = products || [];

      const filtered = products.filter(product => {
        return (
          (product.name && product.name.toLowerCase().includes(query)) ||
          (product.category && product.category.toLowerCase().includes(query)) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.material && product.material.toLowerCase().includes(query)) ||
          (product.stones && product.stones.toLowerCase().includes(query)) ||
          (product.finish && product.finish.toLowerCase().includes(query)) ||
          (product.type && product.type.toLowerCase().includes(query))
        );
      }).slice(0, 8); // Show up to 8 results for powerful search

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="search-overlay__no-results">No matching products found.</div>`;
      } else {
        resultsContainer.innerHTML = filtered.map(product => {
          const originalPriceHTML = product.originalPrice && product.originalPrice > product.price 
            ? `<span class="search-overlay__result-price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` 
            : '';
          return `
            <a href="/product/${product.id}" class="search-overlay__result-item" onclick="document.getElementById('globalSearchOverlay').classList.remove('active');">
              <img src="/${product.image}" alt="${product.name}" class="search-overlay__result-img">
              <div class="search-overlay__result-info">
                <div class="search-overlay__result-name">${product.name}</div>
                <div class="search-overlay__result-cat">${product.category}</div>
              </div>
              <div class="search-overlay__result-price">
                ₹${product.price.toLocaleString('en-IN')}
                ${originalPriceHTML}
              </div>
            </a>
          `;
        }).join('');
      }
      resultsContainer.classList.add('active');
    } catch (err) {
      console.error('Search error:', err);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (overlay.classList.contains('active') && !searchForm.contains(e.target) && !resultsContainer.contains(e.target) && !e.target.closest('.navbar__action-btn')) {
      resultsContainer.classList.remove('active');
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        overlay.classList.remove('active');
        resultsContainer.classList.remove('active');
        window.location.href = `/shop?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

/* ─── Haptic Feedback (Vibration API) ─── */
function hapticFeedback(type = 'light') {
  if (!navigator.vibrate) return;
  const patterns = {
    light:   [8],
    medium:  [18],
    success: [8, 40, 8],
    error:   [40, 25, 40],
    warning: [20]
  };
  navigator.vibrate(patterns[type] || [8]);
}

/* ─── iOS Auto-Zoom Fix ─── */
function fixIOSInputZoom() {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const computedSize = parseFloat(getComputedStyle(input).fontSize);
    if (computedSize < 16 && !input.dataset.iosFixed) {
      input.style.fontSize = '16px';
      input.dataset.iosFixed = '1';
    }
  });

  // Watch for dynamically added inputs
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          const newInputs = node.querySelectorAll ? node.querySelectorAll('input, select, textarea') : [];
          newInputs.forEach(input => {
            const computedSize = parseFloat(getComputedStyle(input).fontSize);
            if (computedSize < 16 && !input.dataset.iosFixed) {
              input.style.fontSize = '16px';
              input.dataset.iosFixed = '1';
            }
          });
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ─── Sticky Add-to-Cart Bar (Product Detail Pages — Mobile Only) ─── */
function initStickyATC() {
  const pdActions = document.querySelector('.pd__actions');
  if (!pdActions) return;
  if (window.innerWidth > 768) return;

  const pdPrice = document.querySelector('.pd__price');
  const pdAddBtn = document.querySelector('.pd__add-btn, .pd__actions .btn--primary');
  if (!pdPrice || !pdAddBtn) return;

  const stickyBar = document.createElement('div');
  stickyBar.className = 'pd__sticky-atc';
  stickyBar.innerHTML = `
    <div class="pd__sticky-atc__price">${pdPrice.textContent}</div>
    <button class="pd__sticky-atc__btn" id="stickyAddBtn">
      <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i>
      Add to Cart
    </button>
  `;
  document.body.appendChild(stickyBar);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const stickyBtn = document.getElementById('stickyAddBtn');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', () => {
      hapticFeedback('success');
      pdAddBtn.click();
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        stickyBar.classList.toggle('visible', !entry.isIntersecting);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  );
  observer.observe(pdActions);
}

/* ─── Touch Press Feedback on Product Cards (Mobile) ─── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.product-card, .card').forEach(card => {
      card.addEventListener('touchstart', () => {
        card.classList.add('tapped');
      }, { passive: true });
      card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('tapped'), 200);
      }, { passive: true });
    });
  }
});
