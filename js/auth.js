/* =====================================================
   KANNIKA BANGLES — Authentication & Account Settings
   Supabase Auth Client Configuration & Dynamic Header UI
   ===================================================== */

const SUPABASE_URL = 'https://husexfwrdjftshwaxama.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1c2V4ZndyZGpmdHNod2F4YW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODA4NTcsImV4cCI6MjA5NTI1Njg1N30.ymPgFmj881CdbUVJvVVtTUfQtadgMpI2vH0Zge5r81U';

// Initialize Supabase (keep database client intact for reviews and carts)
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Supabase JS library not loaded. Make sure to load the CDN script.');
}

const CLERK_PUBLISHABLE_KEY = 'pk_test_Y3Jpc3AtdGVybWl0ZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk';
const CLERK_FRONTEND_API = 'crisp-termite-13.clerk.accounts.dev';

// Load ClerkJS dynamically
(function loadClerkJS() {
  if (document.getElementById('clerk-js-sdk')) return;
  const script = document.createElement('script');
  script.id = 'clerk-js-sdk';
  script.setAttribute('data-clerk-publishable-key', CLERK_PUBLISHABLE_KEY);
  script.async = true;
  script.src = `https://${CLERK_FRONTEND_API}/npm/@clerk/clerk-js@4/dist/clerk.browser.js`;
  script.addEventListener('load', async () => {
    try {
      await window.Clerk.load();
      console.log('ClerkJS loaded successfully');

      const triggerUserSync = async () => {
        const userId = window.Clerk && window.Clerk.user && window.Clerk.user.id;
        if (userId) {
          if (typeof mergeGuestCartIntoDatabase === 'function') {
            await mergeGuestCartIntoDatabase(userId);
          }
          if (typeof syncWishlistFromDatabase === 'function') {
            await syncWishlistFromDatabase(userId);
          }
        }
      };

      // Update UI on initial load
      updateUserNavbarUI(window.Clerk.session);
      await triggerUserSync();

      // Listen for auth state changes
      window.Clerk.addListener(async (state) => {
        updateUserNavbarUI(state.session);
        if (state.session) {
          await triggerUserSync();
        }
      });

      // Update cart and wishlist badge counts once Clerk user ID is resolved
      if (typeof updateCartBadge === 'function') updateCartBadge();
      if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
    } catch (err) {
      console.error('Error loading Clerk:', err);
    }
  });
  document.body.appendChild(script);
})();

// Dynamic Navbar Account Action Injection
function updateUserNavbarUI(session) {
  const actionsContainer = document.querySelector('.navbar__actions');
  if (!actionsContainer) return;

  // Remove existing user profile UI if present to prevent duplication
  const existingUserBtn = actionsContainer.querySelector('.navbar__user-menu, .navbar__user-login-btn');
  if (existingUserBtn) {
    existingUserBtn.remove();
  }

  // Create new profile element
  const userWrapper = document.createElement('div');
  userWrapper.style.display = 'flex';
  userWrapper.style.alignItems = 'center';

  const user = window.Clerk && window.Clerk.user;

  if (user) {
    // Logged in UI - Dropdown Menu
    userWrapper.className = 'navbar__user-menu';
    const displayName = user.fullName || user.primaryEmailAddress?.emailAddress || 'Account';
    const email = user.primaryEmailAddress?.emailAddress || '';
    userWrapper.innerHTML = `
      <button class="navbar__user-btn" aria-label="User Account" id="userMenuBtn" title="${displayName}">
        <i data-lucide="user" style="width:22px;height:22px;"></i>
      </button>
      <div class="user-dropdown" id="userDropdown">
        <div class="user-dropdown__header">
          <div class="user-dropdown__name" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem; margin-bottom: 2px;">${displayName}</div>
          <div class="user-dropdown__email" title="${email}" style="font-size: 0.78rem; color: var(--text-muted);">${email}</div>
        </div>
        <div class="user-dropdown__divider"></div>
        <button class="user-dropdown__item" id="btnSignOut">
          <i data-lucide="log-out" style="width:16px;height:16px;"></i>
          <span>Sign Out</span>
        </button>
      </div>
    `;
  } else {
    // Anonymous UI - Login Trigger Link
    userWrapper.className = 'navbar__user-login-btn';
    userWrapper.innerHTML = `
      <a href="javascript:void(0)" class="navbar__user-btn btn-trigger-login" aria-label="Login">
        <i data-lucide="user" style="width:22px;height:22px;"></i>
      </a>
    `;
  }

  // Inject before the Cart link
  const cartLink = actionsContainer.querySelector('.navbar__cart');
  if (cartLink) {
    actionsContainer.insertBefore(userWrapper, cartLink);
  } else {
    actionsContainer.appendChild(userWrapper);
  }

  // Refresh Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set up events if logged in
  if (user) {
    const signOutBtn = document.getElementById('btnSignOut');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await window.Clerk.signOut();
          if (typeof showToast === 'function') {
            showToast('Signed out successfully');
          }
          window.location.reload();
        } catch (error) {
          alert('Sign out failed: ' + error.message);
        }
      });
    }

    // Toggle dropdown on click for mobile/desktop
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!userWrapper.contains(e.target)) {
          userDropdown.classList.remove('active');
        }
      });
    }
  } else {
    // Setup login modal triggers
    const loginBtn = userWrapper.querySelector('.btn-trigger-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.Clerk) {
          window.Clerk.openSignIn();
        }
      });
    }
  }
}
