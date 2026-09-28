/* =====================================================
   SRI KANNIKA BANGLES — Native Customer Authentication
   Clean, reliable session management & responsive navbar UI
   ===================================================== */

function escapeHTML(str) {
  if (typeof window.escapeHTML === 'function') return window.escapeHTML(str);
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const AUTH_TOKEN_KEY = 'kannika_token';
const AUTH_USER_KEY = 'kannika_user';

// Core State Helpers
function getCustomerToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || null;
}

function getCurrentCustomer() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function getLoggedInUserId() {
  const user = getCurrentCustomer();
  return user && (user.id || user._id) ? (user.id || user._id) : null;
}

function isCustomerLoggedIn() {
  return !!(getCustomerToken() && getLoggedInUserId());
}

// Global Exports
window.getCustomerToken = getCustomerToken;
window.getCurrentCustomer = getCurrentCustomer;
window.getLoggedInUserId = getLoggedInUserId;
window.isCustomerLoggedIn = isCustomerLoggedIn;

// Authentication Actions
async function customerRegister(name, email, phone, password, address = {}) {
  try {
    const res = await fetch('/api/customer/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, address })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Registration failed');
    }

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));

    await onAuthSuccess(data.user);
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function customerLogin(email, password) {
  try {
    const res = await fetch('/api/customer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));

    await onAuthSuccess(data.user);
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function customerLogout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);

  if (typeof showToast === 'function') {
    showToast('Signed out successfully', '👋');
  }

  updateUserNavbarUI();

  // If on login/account page, refresh to show login form
  if (window.location.pathname.includes('login')) {
    window.location.reload();
  }
}

async function onAuthSuccess(user) {
  // Merge guest cart if available
  if (user && user.id && typeof window.mergeGuestCartIntoDatabase === 'function') {
    await window.mergeGuestCartIntoDatabase(user.id);
  } else if (user && user.id && typeof window.syncCartFromDatabase === 'function') {
    await window.syncCartFromDatabase(user.id);
  }

  // Execute pending cart action if customer was redirected to login
  let pendingBuyNow = false;
  try {
    const pendingCartStr = sessionStorage.getItem('kannika_pending_cart');
    if (pendingCartStr) {
      sessionStorage.removeItem('kannika_pending_cart');
      const item = JSON.parse(pendingCartStr);
      if (item && item.id && typeof window.addToCart === 'function') {
        await window.addToCart(item.id, item.size, item.quantity);
        if (item.buyNow) pendingBuyNow = true;
      }
    }
  } catch (e) {
    console.warn('Pending cart replay error:', e);
  }

  // Execute pending wishlist action if customer was redirected to login
  try {
    const pendingWishlistStr = sessionStorage.getItem('kannika_pending_wishlist');
    if (pendingWishlistStr) {
      sessionStorage.removeItem('kannika_pending_wishlist');
      const wish = JSON.parse(pendingWishlistStr);
      if (wish && wish.id && typeof window.toggleWishlist === 'function') {
        await window.toggleWishlist(wish.id);
      }
    }
  } catch (e) {
    console.warn('Pending wishlist replay error:', e);
  }

  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }

  updateUserNavbarUI();

  // If currently on login page, handle redirect automatically
  if (window.location.pathname.includes('login')) {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect');
    if (pendingBuyNow) {
      setTimeout(() => { window.location.href = '/cart'; }, 600);
      return;
    }
    if (redirectUrl && redirectUrl !== '/login') {
      setTimeout(() => { window.location.href = redirectUrl; }, 600);
      return;
    }
  }
}

async function syncCustomerProfile() {
  const token = getCustomerToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/customer/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
        return data.user;
      }
    } else if (res.status === 401) {
      // Token expired or invalidated
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      updateUserNavbarUI();
    }
  } catch (err) {
    console.warn('[Auth] sync profile failed, using cached profile:', err);
  }
  return getCurrentCustomer();
}

async function fetchCustomerOrders() {
  const token = getCustomerToken();
  if (!token) return [];

  try {
    const res = await fetch('/api/customer/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data.orders || [];
    }
  } catch (err) {
    console.error('Fetch customer orders error:', err);
  }
  return [];
}

async function updateCustomerProfile(profileData) {
  const token = getCustomerToken();
  if (!token) throw new Error('Not logged in');

  const res = await fetch('/api/customer/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to update profile');
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
  updateUserNavbarUI();
  return data.user;
}

// Global exports for actions
window.customerRegister = customerRegister;
window.customerLogin = customerLogin;
window.customerLogout = customerLogout;
window.fetchCustomerOrders = fetchCustomerOrders;
window.updateCustomerProfile = updateCustomerProfile;
window.syncCustomerProfile = syncCustomerProfile;

// Dynamic Navbar UI for Desktop and Mobile
function updateUserNavbarUI() {
  const user = getCurrentCustomer();
  const token = getCustomerToken();
  const isLoggedIn = !!(user && token);
  const loginHref = window.location.protocol === 'file:' ? 'login.html' : '/login';

  // 1. Desktop & Mobile Top Right Actions (No User Icon - Clean Login/Register & Sign Out)
  const userMenuContainers = document.querySelectorAll('.navbar__user-menu');
  userMenuContainers.forEach(container => {
    if (isLoggedIn) {
      const firstName = user && user.name ? user.name.split(' ')[0] : 'Account';
      container.innerHTML = `
        <div class="navbar__user-logged-wrap">
          <a href="${loginHref}" class="navbar__auth-greeting" title="My Orders &amp; Profile">Hi, ${escapeHTML(firstName)}</a>
          <button type="button" class="navbar__auth-btn navbar__auth-btn--signout" onclick="customerLogout()" aria-label="Sign Out" title="Sign Out">Sign Out</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <a href="${loginHref}" class="navbar__auth-btn" id="navbarAuthBtn" aria-label="Login or Register">Login / Register</a>
      `;
    }
  });

  // 2. Mobile Drawer User Card (Strictly for mobile slide-out drawer)
  const mobileNavLinks = document.getElementById('navLinks');
  if (mobileNavLinks && window.innerWidth <= 768) {
    let mobileUserSection = document.getElementById('mobileDrawerUserSection');
    if (!mobileUserSection) {
      mobileUserSection = document.createElement('li');
      mobileUserSection.id = 'mobileDrawerUserSection';
      mobileUserSection.className = 'mobile-drawer__user-section';
      const drawerHeader = mobileNavLinks.querySelector('.mobile-drawer__header');
      if (drawerHeader && drawerHeader.nextSibling) {
        mobileNavLinks.insertBefore(mobileUserSection, drawerHeader.nextSibling);
      } else {
        mobileNavLinks.prepend(mobileUserSection);
      }
    }

    if (isLoggedIn) {
      mobileUserSection.innerHTML = `
        <div class="mobile-user-card">
          <div class="mobile-user-card__info">
            <div class="mobile-user-card__avatar">
              <i data-lucide="user" style="width:18px;height:18px;"></i>
            </div>
            <div class="mobile-user-card__text">
              <span class="mobile-user-card__greeting">Namaskara,</span>
              <strong class="mobile-user-card__name">${escapeHTML(user.name)}</strong>
            </div>
          </div>
          <div class="mobile-user-card__links">
            <a href="/login.html" class="btn btn--outline btn--sm" style="flex:1;justify-content:center;text-decoration:none;font-size:0.8rem;padding:7px 10px;border-color:rgba(212,175,55,0.4);color:#FFDF8C;">
              <i data-lucide="package" style="width:14px;height:14px;"></i> My Orders
            </a>
            <button onclick="customerLogout()" class="btn btn--ghost btn--sm" style="font-size:0.8rem;padding:7px 10px;color:#d32f2f;">
              <i data-lucide="log-out" style="width:14px;height:14px;"></i> Logout
            </button>
          </div>
        </div>
      `;
    } else {
      mobileUserSection.innerHTML = `
        <div class="mobile-user-guest-card">
          <div class="mobile-user-guest-card__text">
            <span>Welcome to Sri Kannika Bangles</span>
          </div>
          <a href="/login.html" class="btn btn--outline btn--sm" style="width:100%;justify-content:center;text-decoration:none;font-size:0.85rem;padding:8px 12px;margin-top:6px;border-color:rgba(212,175,55,0.5);color:#FFDF8C;background:rgba(212,175,55,0.1);">
            <i data-lucide="log-in" style="width:15px;height:15px;"></i> Sign In / Register
          </a>
        </div>
      `;
    }
  } else if (mobileNavLinks && window.innerWidth > 768) {
    // Ensure any leftover mobile section is removed from desktop navbar
    const existing = document.getElementById('mobileDrawerUserSection');
    if (existing) existing.remove();
  }

  // Refresh Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  updateUserNavbarUI();
  syncCustomerProfile().then(() => {
    updateUserNavbarUI();
  });
});
