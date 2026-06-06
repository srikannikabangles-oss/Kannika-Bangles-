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
  initLoader();
  fixIOSInputZoom();     // Prevent iOS auto-zoom on inputs
  initMobileBottomNav();
  initNavbar();
  initScrollAnimations();
  initBackToTop();
  updateCartBadge();
  updateWishlistBadge();
  initGlobalSearch();
  initStickyATC();       // Sticky add-to-cart on product pages
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
  if (document.querySelector('.mobile-bottom-nav')) return;

  const bottomNav = document.createElement('nav');
  bottomNav.className = 'mobile-bottom-nav';
  bottomNav.setAttribute('aria-label', 'Mobile Navigation');

  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';

  const isHome = pageName === '' || pageName === 'index.html';
  const isShop = pageName === 'shop.html';
  const isWishlist = pageName === 'wishlist.html';
  const isCart = pageName === 'cart.html';
  const isProfile = pageName === 'login.html' || pageName === 'profile.html';

  bottomNav.innerHTML = `
    <a href="index.html" class="mobile-bottom-nav__item ${isHome ? 'active' : ''}" aria-label="Home">
      <i data-lucide="home" style="width:22px;height:22px;"></i>
      <span>Home</span>
    </a>
    <a href="shop.html" class="mobile-bottom-nav__item ${isShop ? 'active' : ''} mobile-bottom-nav__item--search" aria-label="Search">
      <i data-lucide="search" style="width:22px;height:22px;"></i>
      <span>Search</span>
    </a>
    <a href="wishlist.html" class="mobile-bottom-nav__item ${isWishlist ? 'active' : ''}" aria-label="Wishlist">
      <i data-lucide="heart" style="width:22px;height:22px;"></i>
      <span class="navbar__wishlist-badge">0</span>
      <span>Wishlist</span>
    </a>
    <a href="cart.html" class="mobile-bottom-nav__item ${isCart ? 'active' : ''}" aria-label="Cart">
      <i data-lucide="shopping-bag" style="width:22px;height:22px;"></i>
      <span class="navbar__cart-badge">0</span>
      <span>Cart</span>
    </a>
    <a href="login.html" class="mobile-bottom-nav__item ${isProfile ? 'active' : ''}" aria-label="Account">
      <i data-lucide="user" style="width:22px;height:22px;"></i>
      <span>Account</span>
    </a>
  `;

  document.body.appendChild(bottomNav);

  // Hook search overlay trigger (only on non-shop pages, prevents navigation)
  const searchBtn = bottomNav.querySelector('.mobile-bottom-nav__item--search');
  if (searchBtn && !isShop) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hapticFeedback('light');
      const overlay = document.getElementById('globalSearchOverlay');
      if (overlay) {
        overlay.classList.add('active');
        const searchInput = document.getElementById('searchOverlayInput');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 300);
        }
      }
    });
  }

  // Add touch ripple effect to all bottom nav items
  bottomNav.querySelectorAll('.mobile-bottom-nav__item').forEach(item => {
    item.addEventListener('click', () => {
      hapticFeedback('light');
    });

    item.addEventListener('touchstart', (e) => {
      item.classList.add('tapped');
      setTimeout(() => item.classList.remove('tapped'), 350);
    }, { passive: true });
  });
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
    const userId = getLoggedInUserId();
    if (!userId) return getLocalCart(); // Return guest cart instead of empty!

    const { data, error } = await supabaseClient
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

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
    return;
  }
  
  const userId = getLoggedInUserId();
  if (!userId) {
    // Guest cart additions
    const cart = getLocalCart();
    const existingIndex = cart.findIndex(item => item.id === parseInt(productId) && item.size === size);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id: parseInt(productId), size, quantity });
    }
    saveLocalCart(cart);
    showToast('Added to cart (Guest)! 🛍️');
    await updateCartBadge();
    return;
  }

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
  if (supabaseClient) {
    try {
      const userId = getLoggedInUserId();
      if (userId) {
        const { error } = await supabaseClient
          .from('cart_items')
          .delete()
          .eq('user_id', userId)
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
      const userId = getLoggedInUserId();
      if (userId) {
        const { error } = await supabaseClient
          .from('cart_items')
          .update({ quantity: Math.max(1, quantity) })
          .eq('user_id', userId)
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
      const userId = getLoggedInUserId();
      if (userId) {
        const { error } = await supabaseClient
          .from('cart_items')
          .delete()
          .eq('user_id', userId);
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

/* ─── Wishlist Management (Clerk & Supabase) ─── */
function getLoggedInUserId() {
  if (window.Clerk && window.Clerk.user) {
    return window.Clerk.user.id;
  }
  return null;
}

function getWishlist() {
  const userId = getLoggedInUserId();
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(`kannika_wishlist_${userId}`)) || [];
  } catch {
    return [];
  }
}

function saveWishlist(wishlist) {
  const userId = getLoggedInUserId();
  if (!userId) return;
  localStorage.setItem(`kannika_wishlist_${userId}`, JSON.stringify(wishlist));
  updateWishlistBadge();
}

async function syncWishlistFromDatabase(userId) {
  if (!supabaseClient || !userId) return;
  try {
    const { data, error } = await supabaseClient
      .from('wishlist_items')
      .select('product_id')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    const productIds = data.map(item => parseInt(item.product_id));
    localStorage.setItem(`kannika_wishlist_${userId}`, JSON.stringify(productIds));
    updateWishlistBadge();
    
    if (typeof renderWishlist === 'function') {
      renderWishlist();
    }
  } catch (err) {
    console.warn('Failed to sync wishlist from database:', err);
  }
}

async function mergeGuestCartIntoDatabase(userId) {
  if (!supabaseClient || !userId) return;
  try {
    const guestCart = JSON.parse(localStorage.getItem('kannika_cart')) || [];
    if (guestCart.length === 0) return;

    for (const item of guestCart) {
      const prodId = parseInt(item.id);
      const size = item.size || '2.6';
      const qty = parseInt(item.quantity) || 1;

      // Check if product exists in database cart
      const { data: existing, error: fetchError } = await supabaseClient
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', prodId)
        .eq('size', size)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
        // Update quantity
        const { error: updateError } = await supabaseClient
          .from('cart_items')
          .update({ quantity: existing.quantity + qty })
          .eq('id', existing.id);
        if (updateError) throw updateError;
      } else {
        // Insert item
        const { error: insertError } = await supabaseClient
          .from('cart_items')
          .insert([{ user_id: userId, product_id: prodId, size, quantity: qty }]);
        if (insertError) throw insertError;
      }
    }

    // Clear guest cart
    localStorage.removeItem('kannika_cart');
    console.log('Guest cart successfully merged into Supabase');
    await updateCartBadge();
    
    if (typeof renderCart === 'function') {
      renderCart();
    }
  } catch (err) {
    console.warn('Failed to merge guest cart into database:', err);
  }
}

async function toggleWishlist(productId) {
  if (!window.Clerk || !window.Clerk.user) {
    showToast('Please log in to add items to wishlist! 🔒', '🔒');
    setTimeout(() => {
      if (window.Clerk) {
        window.Clerk.openSignIn();
      } else {
        window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
      }
    }, 1500);
    return false;
  }

  const userId = getLoggedInUserId();
  const wishlist = getWishlist();
  const prodId = parseInt(productId);
  const index = wishlist.indexOf(prodId);
  let added = false;

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(prodId);
    added = true;
  }

  saveWishlist(wishlist);
  showToast(added ? 'Added to wishlist! ❤️' : 'Removed from wishlist');

  if (supabaseClient && userId) {
    try {
      if (added) {
        const { error } = await supabaseClient
          .from('wishlist_items')
          .insert([{ user_id: userId, product_id: prodId }]);
        if (error) throw error;
      } else {
        const { error } = await supabaseClient
          .from('wishlist_items')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', prodId);
        if (error) throw error;
      }
    } catch (err) {
      console.warn('Database wishlist sync failed, relying on local cache:', err);
    }
  }

  return added;
}

function isInWishlist(productId) {
  const userId = getLoggedInUserId();
  if (!userId) return false;
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

async function handleWishlistToggle(productId, btn) {
  const isAdded = await toggleWishlist(productId);
  if (btn && getLoggedInUserId()) {
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
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.remove('active');
      return;
    }

    if (typeof PRODUCTS === 'undefined') return;

    const filtered = PRODUCTS.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.material && product.material.toLowerCase().includes(query)) ||
        (product.stones && product.stones.toLowerCase().includes(query)) ||
        (product.finish && product.finish.toLowerCase().includes(query))
      );
    }).slice(0, 5);

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div class="search-overlay__no-results">No matching products found.</div>`;
    } else {
      resultsContainer.innerHTML = filtered.map(product => {
        const originalPriceHTML = product.originalPrice && product.originalPrice > product.price 
          ? `<span class="search-overlay__result-price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` 
          : '';
        return `
          <a href="product.html?id=${product.id}" class="search-overlay__result-item" onclick="document.getElementById('globalSearchOverlay').classList.remove('active');">
            <img src="${product.image}" alt="${product.name}" class="search-overlay__result-img">
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
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
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
