const fs = require('fs');

console.log('Building 6 remaining distinct, high-density, uniquely structured SEO pages...');

// Shared Navbar HTML
const sharedNavbar = `  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" tabindex="0">
        <span></span><span></span><span></span>
      </div>
      <a href="/" class="navbar__brand navbar__brand--royal" aria-label="Kannika Bangles Home">
        <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="navbar__logo-img">
        <div class="navbar__brand-text">
          <span class="brand-text__title">SRI KANNIKA</span>
          <span class="brand-text__subtitle">BANGLES &amp; JEWELS</span>
        </div>
      </a>
      <ul class="navbar__links" id="navLinks" role="menubar">
        <li class="mobile-drawer__header">
          <div class="mobile-drawer__brand">
            <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="mobile-drawer__logo-img">
            <span class="mobile-drawer__title">Sri Kannika Bangles</span>
          </div>
          <button class="mobile-drawer__close" id="navClose" aria-label="Close menu">
            <i data-lucide="x" style="width:22px;height:22px;"></i>
          </button>
        </li>
        <li role="none"><a href="/" class="navbar__link" role="menuitem"><span class="navbar__link-text">Home</span></a></li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/shop" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Jewellery</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bangles" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="circle"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bangles</span></span></a></li>
            <li><a href="/wedding-glass-bangle-stacks" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="layers"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Glass Bangle Stacks</span></span></a></li>
            <li><a href="/wedding-return-gifts-bangles-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gift"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Wedding Return Gifts</span></span></a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Necklaces</span></span></a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Pendant Sets</span></span></a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Earrings</span></span></a></li>
            <li><a href="/shop" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="grid"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Jewellery</span></span></a></li>
          </ul>
        </li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span></span></a></li>
            <li><a href="/south-indian-bridal-jewellery-set" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Complete Bridal Sets</span></span></a></li>
            <li><a href="/temple-vaddanam-kamarbandh" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="shield"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Vaddanam (Waist Belt)</span></span></a></li>
            <li><a href="/bridal-matha-patti-maang-tikka" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Matha Patti &amp; Maang Tikka</span></span></a></li>
            <li><a href="/antique-vanki-baajuband" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="award"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Vanki &amp; Bajuband</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span></span></a></li>
            <li><a href="/cz-and-ad-diamond-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">CZ &amp; AD Diamond</span></span></a></li>
            <li><a href="/kundan-and-jadau-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Kundan &amp; Jadau</span></span></a></li>
            <li><a href="/antique-matte-finish-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Matte Finish</span></span></a></li>
          </ul>
        </li>
        <li role="none"><a href="/bangle-size-chart-calculator" class="navbar__link" role="menuitem"><span class="navbar__link-text">Size Guide</span></a></li>
        <li role="none"><a href="/blog" class="navbar__link" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/about" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">About &amp; Contact</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/about" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="info"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">About Us</span></span></a></li>
            <li><a href="/contact" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="phone"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Contact Us</span></span></a></li>
          </ul>
        </li>
      </ul>
      <div class="navbar__actions">
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20visiting%20your%20website" class="btn btn--primary" style="padding: 8px 16px; font-size: 0.85rem;" target="_blank" rel="noopener">
          <i data-lucide="message-circle" style="width:16px;height:16px;margin-right:6px;"></i> WhatsApp Stylist
        </a>
      </div>
    </div>
  </nav>`;

// Shared Cross Link Grid HTML
const sharedCrossLinks = `  <section class="section" style="background: #FAF7F2; padding: 60px 20px; border-top: 1px solid rgba(212,175,55,0.2);">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 600;">Complete Kalyana Ensemble</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 8px;">Explore Specialized Bridal Categories</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <a href="/bangle-size-chart-calculator" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">📏</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Bangle Size Calculator</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Dual-method wrist sizing chart with millimeter to Indian sizing conversions.</p>
        </a>
        <a href="/south-indian-bridal-jewellery-set" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">👑</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">7-Piece Bridal Set</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Complete Muhurtham Kalyana package crafted in antique matte micro gold.</p>
        </a>
        <a href="/temple-vaddanam-kamarbandh" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">✨</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Temple Vaddanam</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Adjustable waist belts (Ottiyanam) with Lakshmi &amp; peacock Nakshi carvings.</p>
        </a>
        <a href="/bridal-matha-patti-maang-tikka" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🌸</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Matha Patti &amp; Tikka</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Temple Nethi Chutti and multi-tier Kundan forehead adornments.</p>
        </a>
        <a href="/antique-vanki-baajuband" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">💎</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Antique Vanki &amp; Bajuband</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Traditional inverted V-shaped bridal armlets with non-slip velvet linings.</p>
        </a>
        <a href="/wedding-glass-bangle-stacks" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🔴</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Glass Bangle Stacks</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Emerald green &amp; ruby red Muhurtham glass churi sets with antique kadas.</p>
        </a>
        <a href="/wedding-return-gifts-bangles-bangalore" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🎁</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Wedding Return Gifts</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Wholesale Thamboolam gift bangle sets in assorted sizes with potli pouches.</p>
        </a>
      </div>
    </div>
  </section>`;

// Shared Footer HTML
const sharedFooter = `  <footer class="footer">
    <div class="container" style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
      <div class="superpower-trust-strip">
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="shield-check" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Zero Blind Payment</strong><span>Pay ₹0 today online</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="video" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Live Video Call</strong><span>Inspect in 4K before paying</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="camera" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Bridal Saree Match</strong><span>1-on-1 stylist color pairing</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="ruler" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Exact Wrist Sizing</strong><span>Custom fit from 2.2 to 2.10</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="map-pin" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Malleshwaram Store</strong><span>Real Bangalore showroom</span></div>
        </div>
      </div>
    </div>

    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__brand-name"><span>Kannika</span> Bangles</div>
        <p class="footer__desc">Turning every bride's dream into a beautiful reality. Handcrafted bangles blending tradition with modern style since generations.</p>
        <div class="footer__social" style="margin-top: 16px;">
          <a href="https://wa.me/919844758450" target="_blank" rel="noopener" class="footer__social-link" aria-label="WhatsApp" style="color:#25D366;border-color:rgba(37,211,102,0.4);"><i data-lucide="message-circle" style="width:18px;height:18px;"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Quick Links</h4>
        <a href="/" class="footer__link">Home</a>
        <a href="/shop" class="footer__link">Shop All</a>
        <a href="/bangle-size-chart-calculator" class="footer__link">Bangle Size Calculator</a>
        <a href="/bridal-jewellery-bangalore" class="footer__link">Bridal Jewellery</a>
        <a href="/temple-jewellery-bangalore" class="footer__link">Temple Jewellery</a>
        <a href="/muhurtham-jewellery-bangalore" class="footer__link">Muhurtham Jewellery</a>
        <a href="/about.html" class="footer__link">Our Story</a>
        <a href="/contact.html" class="footer__link">Contact Us</a>
        <a href="/blog" class="footer__link">Blog &amp; Guides</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Bridal Special</h4>
        <a href="/south-indian-bridal-jewellery-set" class="footer__link">Complete Bridal Sets</a>
        <a href="/temple-vaddanam-kamarbandh" class="footer__link">Temple Vaddanam</a>
        <a href="/bridal-matha-patti-maang-tikka" class="footer__link">Matha Patti &amp; Tikka</a>
        <a href="/antique-vanki-baajuband" class="footer__link">Antique Vanki Armlets</a>
        <a href="/wedding-glass-bangle-stacks" class="footer__link">Glass Bangle Stacks</a>
        <a href="/wedding-return-gifts-bangles-bangalore" class="footer__link">Wedding Return Gifts</a>
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
      <p>&copy; 2026 Kannika Bangles. All rights reserved. Handcrafted in Bengaluru.</p>
    </div>
  </footer>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>`;

console.log('Template parts configured. Proceeding with page content definitions...');
