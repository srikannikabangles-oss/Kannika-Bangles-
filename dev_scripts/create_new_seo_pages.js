const fs = require('fs');
const path = require('path');

// Common Header Navbar generator
function getNavbarHtml(activeNav = '') {
  return `  <!-- ─── Navigation ─── -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <!-- Left side: hamburger menu button -->
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Center / Left: Branding with Logo -->
      <a href="/index.html" class="navbar__brand" aria-label="Kannika Bangles Home">
        <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="navbar__logo-img">
      </a>

      <!-- Navigation Links / Slide-out Menu -->
      <ul class="navbar__links" id="navLinks" role="menubar">
        <!-- Mobile Drawer Header -->
        <li class="mobile-drawer__header">
          <div class="mobile-drawer__brand">
            <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="mobile-drawer__logo-img">
            <span class="mobile-drawer__title">Sri Kannika Bangles</span>
          </div>
          <button class="mobile-drawer__close" id="navClose" aria-label="Close menu">
            <i data-lucide="x" style="width:22px;height:22px;"></i>
          </button>
        </li>

        <li role="none"><a href="/index.html" class="navbar__link" role="menuitem"><span class="navbar__link-text">Home</span></a></li>
        
        <!-- Jewellery Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/shop" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Jewellery</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/shop" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Collections</span><span class="navbar__dropdown-desc">Explore complete 48-piece showcase</span></span></a></li>
            <li><a href="/bangles" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="circle"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Bangles &amp; Kadas</span><span class="navbar__dropdown-desc">Traditional stacks, Jadau kadas &amp; spacers</span></span></a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Necklaces &amp; Chokers</span><span class="navbar__dropdown-desc">Royal choker sets &amp; layered harams</span></span></a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Handcrafted Pendant Sets</span><span class="navbar__dropdown-desc">Heritage lockets with matching earrings</span></span></a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Designer Bridal Earrings</span><span class="navbar__dropdown-desc">Traditional jhumkas, chandbalis &amp; studs</span></span></a></li>
          </ul>
        </li>

        <!-- Bangalore Bridal Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown ${activeNav === 'bridal' ? 'active' : ''}" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bangalore Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span><span class="navbar__dropdown-desc">Complete South Indian wedding suites &amp; sets</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span><span class="navbar__dropdown-desc">Antique matte Nakshi &amp; Lakshmi harams</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span><span class="navbar__dropdown-desc">Traditional wedding bangles &amp; Kemp chokers</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span><span class="navbar__dropdown-desc">Kundan, AD diamonds &amp; cocktail bridal sets</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span><span class="navbar__dropdown-desc">Floral antique jewellery &amp; colourful bangles</span></span></a></li>
          </ul>
        </li>

        <!-- Simple Direct Blog Link -->
        <li role="none"><a href="/blog" class="navbar__link ${activeNav === 'blog' ? 'active' : ''}" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>

        <!-- Areas We Serve Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/areas" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Areas We Serve</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/areas" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Bangalore Areas</span><span class="navbar__dropdown-desc">City-wide express delivery</span></span></a></li>
            <li><a href="/areas/malleshwaram.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Malleshwaram</span><span class="navbar__dropdown-desc">Flagship showroom on Sampige Rd</span></span></a></li>
            <li><a href="/areas/chickpet.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Chickpet</span><span class="navbar__dropdown-desc">Heritage wholesale jewellery corridor</span></span></a></li>
            <li><a href="/areas/commercial-street.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Commercial Street</span><span class="navbar__dropdown-desc">Trendy party &amp; sangeet jewellery suites</span></span></a></li>
            <li><a href="/areas/whitefield.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Whitefield</span><span class="navbar__dropdown-desc">East Bangalore express doorstep delivery</span></span></a></li>
            <li><a href="/areas/indiranagar.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Indiranagar</span><span class="navbar__dropdown-desc">24-48 hr express delivery hub</span></span></a></li>
            <li><a href="/areas/jayanagar.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Jayanagar</span><span class="navbar__dropdown-desc">South Bangalore bridal consultations</span></span></a></li>
            <li><a href="/areas/koramangala.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Koramangala</span><span class="navbar__dropdown-desc">Contemporary &amp; sangeet party suites</span></span></a></li>
            <li><a href="/areas/rajajinagar.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Rajajinagar</span><span class="navbar__dropdown-desc">West Bangalore same-day courier dispatch</span></span></a></li>
          </ul>
        </li>

        <li role="none"><a href="/about.html" class="navbar__link" role="menuitem"><span class="navbar__link-text">About Us</span></a></li>
        <li role="none"><a href="/contact.html" class="navbar__link" role="menuitem"><span class="navbar__link-text">Contact Us</span></a></li>

        <!-- Mobile Drawer Quick Actions Footer -->
        <li class="mobile-drawer__footer">
          <div class="mobile-drawer__contact">
            <a href="tel:+919844758450" class="mobile-drawer__btn mobile-drawer__btn--call">
              <i data-lucide="phone" style="width:18px;height:18px;"></i> Call Showroom
            </a>
            <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20visiting%20your%20website" class="mobile-drawer__btn mobile-drawer__btn--whatsapp">
              <i data-lucide="message-circle" style="width:18px;height:18px;"></i> WhatsApp
            </a>
          </div>
        </li>
      </ul>

      <!-- Right side: Actions row -->
      <div class="navbar__actions">
        <a href="/shop" class="navbar__action-btn" aria-label="Search">
          <i data-lucide="search" style="width:19px;height:19px;"></i>
        </a>
        <div class="navbar__user-menu">
          <a href="/login.html" class="navbar__user-btn" aria-label="Account">
            <i data-lucide="user" style="width:19px;height:19px;"></i>
          </a>
        </div>
        <a href="/cart.html" class="navbar__cart" aria-label="Shopping Cart">
          <i data-lucide="shopping-bag" style="width:19px;height:19px;"></i>
          <span class="navbar__cart-badge">0</span>
        </a>
      </div>
    </div>
  </nav>`;
}

// Common Footer
function getFooterHtml() {
  return `  <!-- ─── Footer ─── -->
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__col footer__col--brand">
        <div class="footer__brand-logo">
          <img src="/images/kannika_logo.jpeg" alt="Sri Kannika Bangles" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #D4AF37;">
          <span style="font-family:'Cinzel',serif;font-size:1.3rem;font-weight:700;color:#FDF9F9;">Sri Kannika Bangles</span>
        </div>
        <p class="footer__desc" style="margin-top:14px;color:rgba(255,255,255,0.7);font-size:0.9rem;line-height:1.6;">
          Handcrafted bridal bangles, heritage temple jewellery, and antique bridal sets from Malleshwaram, Bangalore since 1991.
        </p>
        <div class="footer__socials" style="margin-top:16px;display:flex;gap:12px;">
          <a href="https://www.instagram.com/kannikabangles" target="_blank" rel="noopener" aria-label="Instagram" style="color:#D4AF37;"><i data-lucide="instagram"></i></a>
          <a href="https://www.facebook.com/kannikabangles" target="_blank" rel="noopener" aria-label="Facebook" style="color:#D4AF37;"><i data-lucide="facebook"></i></a>
          <a href="https://wa.me/919844758450" target="_blank" rel="noopener" aria-label="WhatsApp" style="color:#25D366;"><i data-lucide="message-circle"></i></a>
        </div>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading" style="font-family:'Cinzel',serif;color:#D4AF37;font-size:1.1rem;margin-bottom:16px;">Quick Links</h3>
        <ul class="footer__links" style="list-style:none;padding:0;margin:0;line-height:2;">
          <li><a href="/shop" style="color:rgba(255,255,255,0.8);text-decoration:none;">All Collections</a></li>
          <li><a href="/bangles" style="color:rgba(255,255,255,0.8);text-decoration:none;">Bridal Bangles &amp; Kadas</a></li>
          <li><a href="/bridal-jewellery-bangalore" style="color:rgba(255,255,255,0.8);text-decoration:none;">Bridal Jewellery Bangalore</a></li>
          <li><a href="/temple-jewellery-bangalore" style="color:rgba(255,255,255,0.8);text-decoration:none;">Temple Jewellery Bangalore</a></li>
          <li><a href="/muhurtham-jewellery-bangalore" style="color:rgba(255,255,255,0.8);text-decoration:none;">Muhurtham Jewellery</a></li>
          <li><a href="/blog" style="color:rgba(255,255,255,0.8);text-decoration:none;">Bridal Blog &amp; Guides</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading" style="font-family:'Cinzel',serif;color:#D4AF37;font-size:1.1rem;margin-bottom:16px;">Bangalore Areas</h3>
        <ul class="footer__links" style="list-style:none;padding:0;margin:0;line-height:2;">
          <li><a href="/areas/malleshwaram.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Malleshwaram Flagship</a></li>
          <li><a href="/areas/chickpet.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Chickpet Shopping</a></li>
          <li><a href="/areas/commercial-street.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Commercial Street</a></li>
          <li><a href="/areas/jayanagar.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Jayanagar</a></li>
          <li><a href="/areas/koramangala.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Koramangala</a></li>
          <li><a href="/areas/whitefield.html" style="color:rgba(255,255,255,0.8);text-decoration:none;">Whitefield Delivery</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading" style="font-family:'Cinzel',serif;color:#D4AF37;font-size:1.1rem;margin-bottom:16px;">Showroom Visit</h3>
        <p style="color:rgba(255,255,255,0.8);font-size:0.9rem;line-height:1.6;margin-bottom:10px;">
          <strong>No. 157/108, 9th Cross, East Park Road</strong><br>
          Malleshwaram, Bangalore - 560003
        </p>
        <p style="color:rgba(255,255,255,0.8);font-size:0.9rem;margin-bottom:8px;">
          <i data-lucide="phone" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> +91 98447 58450
        </p>
        <p style="color:rgba(255,255,255,0.8);font-size:0.9rem;">
          <i data-lucide="clock" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> Mon–Sat: 10am–8pm | Sun: 11am–6pm
        </p>
      </div>
    </div>

    <div class="footer__bottom" style="border-top:1px solid rgba(255,255,255,0.1);padding:20px;text-align:center;color:rgba(255,255,255,0.6);font-size:0.85rem;">
      <div class="container" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>&copy; 2026 Sri Kannika Bangles. All rights reserved. Handcrafted in Bengaluru.</div>
        <div style="display:flex;gap:16px;">
          <a href="/delivery-policy.html" style="color:inherit;text-decoration:none;">Delivery Policy</a>
          <a href="/exchange-policy.html" style="color:inherit;text-decoration:none;">Exchange Policy</a>
          <a href="/no-return-policy.html" style="color:inherit;text-decoration:none;">Hygiene &amp; Safety</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/main.js" defer></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>`;
}

module.exports = { getNavbarHtml, getFooterHtml };
