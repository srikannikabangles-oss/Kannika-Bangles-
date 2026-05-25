/* =====================================================
   KANNIKA BANGLES — Authentication & Account Settings
   Supabase Auth Client Configuration & Dynamic Header UI
   ===================================================== */

const SUPABASE_URL = 'https://husexfwrdjftshwaxama.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1c2V4ZndyZGpmdHNod2F4YW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODA4NTcsImV4cCI6MjA5NTI1Njg1N30.ymPgFmj881CdbUVJvVVtTUfQtadgMpI2vH0Zge5r81U';

// Initialize Supabase
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Supabase JS library not loaded. Make sure to load the CDN script.');
}

document.addEventListener('DOMContentLoaded', () => {
  if (supabaseClient) {
    // 1. Listen to Auth state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
      updateUserNavbarUI(session);
    });

    // 2. Initial UI update
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      updateUserNavbarUI(session);
    });
  }
});

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

  if (session && session.user) {
    // Logged in UI - Dropdown Menu
    userWrapper.className = 'navbar__user-menu';
    userWrapper.innerHTML = `
      <button class="navbar__user-btn" aria-label="User Account" id="userMenuBtn">
        <i data-lucide="user" style="width:22px;height:22px;"></i>
      </button>
      <div class="user-dropdown" id="userDropdown">
        <div class="user-dropdown__header">
          <div class="user-dropdown__email" title="${session.user.email}">${session.user.email}</div>
        </div>
        <div class="user-dropdown__divider"></div>
        <button class="user-dropdown__item" id="btnSignOut">
          <i data-lucide="log-out" style="width:16px;height:16px;"></i>
          <span>Sign Out</span>
        </button>
      </div>
    `;
  } else {
    // Anonymous UI - Login Page Link
    userWrapper.className = 'navbar__user-login-btn';
    userWrapper.innerHTML = `
      <a href="login.html" class="navbar__user-btn" aria-label="Login">
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
  if (session && session.user) {
    const signOutBtn = document.getElementById('btnSignOut');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
          if (typeof showToast === 'function') {
            showToast('Sign out failed: ' + error.message, '✗');
          } else {
            alert('Sign out failed: ' + error.message);
          }
        } else {
          if (typeof showToast === 'function') {
            showToast('Signed out successfully');
          }
          window.location.reload();
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
  }
}
