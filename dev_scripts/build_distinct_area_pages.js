const fs = require('fs');
const path = require('path');

// Common universal header HTML
const universalHeader = `  
  
  </div>

  <!-- ─── Navigation ─── -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <!-- Left side: hamburger menu button (Mobile only) -->
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Center / Left: Branding with Logo -->
      <a href="/" class="navbar__brand" aria-label="Kannika Bangles Home">
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

        <li role="none"><a href="/" class="navbar__link" role="menuitem"><span class="navbar__link-text">Home</span></a></li>

        <!-- Jewellery Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/shop" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Jewellery</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/shop" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Collections</span></span></a></li>
            <li><a href="/bangles" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="circle"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Bangles &amp; Kadas</span></span></a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Necklaces &amp; Chokers</span></span></a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Handcrafted Pendant Sets</span></span></a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Designer Bridal Earrings</span></span></a></li>
          </ul>
        </li>

        <!-- Bangalore Bridal Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bangalore Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span></span></a></li>
          </ul>
        </li>

        <!-- Areas We Serve Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/areas" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Areas We Serve</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/areas" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Bangalore Areas</span></span></a></li>
            <li><a href="/areas/malleshwaram" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Malleshwaram</span></span></a></li>
            <li><a href="/areas/jayanagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Jayanagar</span></span></a></li>
            <li><a href="/areas/commercial-street" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Commercial Street</span></span></a></li>
            <li><a href="/areas/chickpet" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Chickpet</span></span></a></li>
            <li><a href="/areas/indiranagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Indiranagar</span></span></a></li>
            <li><a href="/areas/koramangala" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Koramangala</span></span></a></li>
            <li><a href="/areas/rajajinagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Rajajinagar</span></span></a></li>
            <li><a href="/areas/whitefield" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Whitefield</span></span></a></li>
          </ul>
        </li>

        <li role="none"><a href="/blog" class="navbar__link" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>
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
        <a href="/shop" class="navbar__action-btn" aria-label="Search Catalog" title="Search">
          <i data-lucide="search" style="width:19px;height:19px;"></i>
        </a>
        <a href="/wishlist.html" class="navbar__action-btn navbar__wishlist-btn" aria-label="Wishlist" title="Wishlist">
          <i data-lucide="heart" style="width:19px;height:19px;"></i>
          <span class="navbar__wishlist-badge" id="wishlistBadge">0</span>
        </a>
        <div class="navbar__user-menu">
          <a href="/login" class="navbar__auth-btn" id="navbarAuthBtn">Login / Register</a>
        </div>
        <a href="/cart.html" class="navbar__cart" aria-label="Shopping Bag" title="Bag">
          <i data-lucide="shopping-bag" style="width:19px;height:19px;"></i>
          <span class="navbar__cart-badge">0</span>
        </a>
      </div>
    </div>
  </nav>`;

// Common Footer
function getFooter(slug, areaName) {
  return `  <!-- ═══════════════════════════════════════════════════
       FOOTER
       ═══════════════════════════════════════════════════ -->
  <footer class="footer">
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
        <a href="/bridal-jewellery-bangalore" class="footer__link">Bridal Jewellery</a>
        <a href="/temple-jewellery-bangalore" class="footer__link">Temple Jewellery</a>
        <a href="/muhurtham-jewellery-bangalore" class="footer__link">Muhurtham Jewellery</a>
        <a href="/about.html" class="footer__link">Our Story</a>
        <a href="/contact.html" class="footer__link">Contact Us</a>
        <a href="/blog" class="footer__link">Blog &amp; Guides</a>
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
      <p>&copy; 2026 Kannika Bangles. All rights reserved. Handcrafted in Bengaluru.</p>
    </div>
  </footer>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
      { "@type": "ListItem", "position": 2, "name": "Areas We Serve", "item": "https://kannikabangles.com/areas" },
      { "@type": "ListItem", "position": 3, "name": "${areaName}", "item": "https://kannikabangles.com/areas/${slug}" }
    ]
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": "https://kannikabangles.com/#organization",
    "name": "Sri Kannika Bangles",
    "url": "https://kannikabangles.com/",
    "telephone": "+91 98447 58450",
    "email": "Srikannikabangles@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 157/108, 9th Cross, East Park Road, Malleshwaram",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560003",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "${areaName}, Bangalore"
    },
    "priceRange": "₹₹"
  }
  </script>

  <!-- Scripts for Lucide Icons, Animations, and Active Links -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>
  <script src="/js/products.js?v=8"></script>
  <script src="/js/cart.js?v=5"></script>
  <script src="/js/auth.js?v=20260916_201"></script>
  <script src="/js/main.js?v=12"></script>`;
}

function renderProductCard(p) {
  return `        <div class="product-card">
          <div class="product-card__image">
            <span class="product-card__badge"><span class="badge badge--featured">${p.badge || '★ Bestseller'}</span></span>
            <span class="product-card__discount">-20%</span>
            <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
            <div class="product-card__overlay">
              <a href="/product/${p.id}" class="btn btn--sm btn--outline">View Details</a>
              <button class="btn btn--sm btn--primary" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
          </div>
          <div class="product-card__body">
            <div class="product-card__category">${p.category}</div>
            <h3 class="product-card__name"><a href="/product/${p.id}" style="color:inherit;text-decoration:none;">${p.name}</a></h3>
            <div class="product-card__price-row">
              <span class="product-card__price">₹${p.price.toLocaleString('en-IN')}</span>
              <span class="product-card__original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div class="product-card__rating" style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
              <span class="product-card__stars" style="color: #D4AF37;">★★★★★</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">(${p.rating || '4.9'})</span>
            </div>
          </div>
        </div>`;
}

// Data definitions for 8 areas
const areaConfigs = [
  // 1. Malleshwaram
  {
    slug: 'malleshwaram',
    name: 'Malleshwaram',
    title: 'Jewellery Shop in Malleshwaram | Flagship Store Sri Kannika Bangles',
    desc: 'Visit Bangalore\'s premier jewellery shop in Malleshwaram. Flagship showroom on Sampige Road featuring royal temple kadas, antique bridal bangles & Jadau suites.',
    keywords: 'jewellery shop in malleshwaram, bangles store 8th cross malleshwaram, bridal jewellery malleshwaram bangalore, temple jewellery sampige road',
    themeClass: 'template-flagship-sanctuary',
    curationTitle: 'Signature Temple Kadas & Heritage Bangles',
    curationSubtitle: 'Handcrafted on Sampige Road with 24K Micro Gold Polish and Traditional Screw Clasps',
    products: [
      { id: 8, name: 'Traditional Gold Kada', category: 'Bridal Bangles', price: 1430, originalPrice: 1950, image: '/images/bangles/IMG-20260805-WA0014.jpg', badge: '★ Flagship Icon', rating: '5.0' },
      { id: 7, name: 'Artisan Temple Kada', category: 'Temple Jewellery', price: 1850, originalPrice: 2400, image: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Nakshi Carved', rating: '4.9' },
      { id: 9, name: 'Royal Floral Kada Pair', category: 'Bridal Bangles', price: 1650, originalPrice: 2200, image: '/images/bangles/IMG-20260805-WA0018.jpg', badge: '★ 2-Piece Pair', rating: '4.8' },
      { id: 6, name: 'Kundan Jadau Bangle Stack', category: 'Kundan Jewellery', price: 2200, originalPrice: 2900, image: '/images/bangles/IMG-20260805-WA0007.jpg', badge: '★ Bridal Stack', rating: '5.0' }
    ],
    editorial1: {
      title: 'Flagship Showroom Sanctuary on Sampige Road',
      text: `For more than three decades, Sri Kannika Bangles has been an indispensable pillar of Malleshwaram's cultural and bridal heritage. Located amidst the historic lanes of Sampige Road and 8th Cross, our showroom represents the gold standard of handcrafted South Indian wedding ornamentation.<br><br>Here, brides-to-be from across Karnataka arrive with their Kanjivaram wedding sarees to be matched with customized bangle sets, ruby-encrusted kadas, and antique Nakshi harams. Every ornament is sculpted from skin-safe brass bases and sealed with genuine 24-karat micro-gold electroplating.`,
      image: '/images/bangles/IMG-20260805-WA0008.jpg'
    },
    editorial2: {
      title: 'Temple Nakshi & Ancestral Metalcraft',
      text: `The signature aesthetic of Malleshwaram jewellery lies in deep antique patinas and mythological temple Nakshi motifs: Gajalakshmi emblems, peacock flourishes, and mango-leaf rhythms. Unlike modern hollow stampings, our kadas feature solid core casting that delivers an authentic royal weight and lifetime structural resilience.<br><br>Whether you visit our physical showroom on 9th Cross East Park Road or place an order for express local delivery, you receive certified handcrafted authenticity directly from the masters of the craft.`,
      image: '/images/necklaces/IMG-20260717-WA0008.jpg'
    },
    customModule: `
      <!-- Showroom Visit Card -->
      <div style="background: linear-gradient(135deg, #2C1820 0%, #1A0E13 100%); color: #fff; border: 1.5px solid rgba(212,175,55,0.4); border-radius: 20px; padding: 40px; margin: 50px 0; display: grid; grid-template-columns: 1.2fr 1fr; gap: 36px; align-items: center;" class="malleshwaram-showroom-card">
        <div>
          <span style="color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.8rem; font-weight: 700;">Physical Showroom Experience</span>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.8rem; margin: 8px 0 16px; color: #fff;">Visit Us in Malleshwaram</h3>
          <p style="color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">
            Step into our boutique sanctuary to test bangle sizes in person, consult with senior bridal stylists, and view over 500 heirloom stacks under true warm lighting.
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; color: #FFE28A;">
            <div><strong>📍 Address:</strong> No. 157/108, 9th Cross, East Park Road, Malleshwaram, Bangalore - 560003</div>
            <div><strong>⏰ Store Hours:</strong> Mon – Sun: 10:30 AM – 9:00 PM (All 7 Days)</div>
            <div><strong>📞 In-Store Desk:</strong> +91 98447 58450 / 080-2344-XXXX</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(212,175,55,0.2); border-radius: 14px; padding: 24px; text-align: center;">
          <i data-lucide="navigation" style="width:36px;height:36px;color:var(--gold-primary);margin-bottom:12px;"></i>
          <h4 style="font-family:'Cinzel',serif;font-size:1.15rem;color:#fff;margin-bottom:8px;">Easy Landmark Cues</h4>
          <p style="font-size:0.85rem;color:rgba(255,255,255,0.75);margin-bottom:16px;">Directly off 8th Cross shopping hub, 3 minutes walking from historic Kadu Malleshwara Temple.</p>
          <a href="https://maps.google.com/?q=Sri+Kannika+Bangles+Malleshwaram" target="_blank" rel="noopener" class="btn btn--primary btn--sm" style="width:100%;justify-content:center;">Open Google Maps Direction</a>
        </div>
      </div>`
  },

  // 2. Jayanagar
  {
    slug: 'jayanagar',
    name: 'Jayanagar',
    title: 'Bridal Jewellery in Jayanagar Bangalore | Kannika Bangles Muhurtham Suites',
    desc: 'Shop grand bridal jewellery & Muhurtham harams in Jayanagar, Bangalore. Handcrafted Kundan chokers, Kanjivaram saree-matching bangles & South Bangalore consultations.',
    keywords: 'bridal jewellery jayanagar bangalore, kundan chokers jayanagar 4th block, temple jewellery jayanagar, south indian wedding jewellery jayanagar',
    themeClass: 'template-bridal-lookbook',
    curationTitle: 'Grand Muhurtham Chokers & Layered Harams',
    curationSubtitle: 'Curated for Traditional South Bangalore Weddings & Kanjivaram Silk Saree Ensembles',
    products: [
      { id: 13, name: 'Royal Heritage Choker Set', category: 'Bridal Necklaces', price: 4999, originalPrice: 6500, image: '/images/necklaces/IMG-20260717-WA0002.jpg', badge: '★ Bridal Icon', rating: '5.0' },
      { id: 14, name: 'Kundan Nakshi Bridal Haram', category: 'Temple Harams', price: 5499, originalPrice: 7200, image: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Grand Length', rating: '4.9' },
      { id: 15, name: 'South Indian Temple Choker', category: 'Nakshi Chokers', price: 3899, originalPrice: 4999, image: '/images/necklaces/IMG-20260717-WA0008.jpg', badge: '★ Kemp Ruby Inset', rating: '4.9' },
      { id: 16, name: 'Antique Lakshmi Bridal Haram', category: 'Heritage Suites', price: 6299, originalPrice: 8200, image: '/images/necklaces/IMG-20260717-WA0011.jpg', badge: '★ Masterpiece', rating: '5.0' }
    ],
    editorial1: {
      title: 'South Bangalore\'s Bridal Destination for Jayanagar Brides',
      text: `Jayanagar has long stood as Bangalore\'s epicenter of classical taste, traditional family celebrations, and grand wedding shopping along the 4th Block shopping corridor. Brides planning their muhurtham ceremonies demand ornaments that reflect authentic South Indian heritage.<br><br>At Sri Kannika Bangles, our bridal suites are crafted to pair seamlessly with rich Kanjivaram silk weaves: emerald green borders, crimson brocades, and mustard yellow pattu sarees. Each bridal set includes matching statement jhumkas and adjustable dori ties for a bespoke neckline fit.`,
      image: '/images/necklaces/IMG-20260717-WA0010.jpg'
    },
    editorial2: {
      title: 'Bespoke Color Stacking & Saree Coordination',
      text: `Bridal wristwear in Jayanagar is an art of harmonious sequencing. Rather than plain uniform bangles, our senior stylists create multi-layered rhythm sequences combining heavy Nakshi kadas, filigree spacers, and cabochon stone accents.<br><br>Residents across Jayanagar Blocks 1 through 9 enjoy personalized WhatsApp styling consultations and guaranteed 24-to-48 hour insured courier delivery straight to their doorstep.`,
      image: '/images/bangles/IMG-20260805-WA0012.jpg'
    },
    customModule: `
      <!-- Saree Pairing Matrix -->
      <div style="background: #FFFBF8; border: 1.5px solid rgba(212,175,55,0.35); border-radius: 20px; padding: 36px; margin: 45px 0;">
        <div style="text-align: center; margin-bottom: 28px;">
          <span style="color: var(--pink-primary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; font-size: 0.8rem;">Bridal Lookbook Guide</span>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: var(--text-primary); margin-top: 6px;">Jayanagar Saree Palette Matching Matrix</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          <div style="background: #fff; border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; padding: 20px;">
            <h4 style="color: #9D1739; font-family:'Cinzel',serif; margin-bottom: 8px;">1. Crimson &amp; Sindoor Silks</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">Pair with antique matte Nakshi chokers and heavy Lakshmi kadas with rich Kemp ruby highlights for a regal traditional glow.</p>
          </div>
          <div style="background: #fff; border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; padding: 20px;">
            <h4 style="color: #8B6914; font-family:'Cinzel',serif; margin-bottom: 8px;">2. Mustard &amp; Haldi Pattu</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">Combine luminous Kundan glasswork with openable floral screw kadas and matching chandelier drops for vibrant ceremonies.</p>
          </div>
          <div style="background: #fff; border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; padding: 20px;">
            <h4 style="color: #1A5F7A; font-family:'Cinzel',serif; margin-bottom: 8px;">3. Peacock Blue &amp; Emerald Silks</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">Contrast with two-tone micro-gold and AD diamond bangles to reflect ambient stage lighting during evening receptions.</p>
          </div>
        </div>
      </div>`
  },

  // 3. Commercial Street
  {
    slug: 'commercial-street',
    name: 'Commercial Street',
    title: 'Bridal Jewellery in Commercial Street Bangalore | Kannika Bangles Boutique',
    desc: 'High-fashion bridal jewellery, AD diamond suites & party wear for Commercial Street shoppers. Direct artisan prices without boutique markups & express 24-hr delivery.',
    keywords: 'jewellery shop commercial street bangalore, imitation jewellery commercial street, ad diamond bangles shivaji nagar, sangeet jewellery commercial street',
    themeClass: 'template-glamour-boutique',
    curationTitle: 'Designer Bridal Earrings & Party Jhumkas',
    curationSubtitle: 'High-Sparkle Statement Pieces for Sangeet, Cocktail Evenings & Contemporary Brides',
    products: [
      { id: 3, name: 'Chandbali Drop Earring', category: 'Designer Earrings', price: 1950, originalPrice: 2600, image: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Trending Glam', rating: '5.0' },
      { id: 4, name: 'Antique AD Jhumka', category: 'Party Wear', price: 2450, originalPrice: 3200, image: '/images/earrings/IMG-20260720-WA0023.jpg', badge: '★ High Sparkle', rating: '4.9' },
      { id: 11, name: 'Pearl Drop Earring', category: 'Cocktail Glamour', price: 2250, originalPrice: 2900, image: '/images/earrings/IMG-20260720-WA0026.jpg', badge: '★ Luxury Pearl', rating: '4.8' },
      { id: 12, name: 'Ruby Kemp Chandbali', category: 'Bridal Earrings', price: 2100, originalPrice: 2750, image: '/images/earrings/IMG-20260720-WA0028.jpg', badge: '★ Bestseller', rating: '5.0' }
    ],
    editorial1: {
      title: 'Elevated High-Fashion Ornaments for Commercial Street Shoppers',
      text: `Commercial Street in Shivaji Nagar is renowned across South India as Bangalore\'s trendsetting corridor for lehengas, bridal gowns, and party couture. However, navigating fast-fashion markups and inconsistent plating qualities can be exhausting for discerning brides.<br><br>At Sri Kannika Bangles, we deliver high-voltage glamour backed by master artisan integrity. Our American Diamond (CZ) and Polki earrings shimmer with the authentic refractive brilliance of precious stones, set in lightweight prong mounts that remain comfortable through hours of dancing.`,
      image: '/images/earrings/IMG-20260720-WA0031.jpg'
    },
    editorial2: {
      title: 'Direct Artisan Pricing vs Retail Boutique Overhead',
      text: `By operating our flagship manufacturing studio in Malleshwaram and serving Commercial Street shoppers directly online, we eliminate excessive distributor margins. Shoppers in Tasker Town, Shivaji Nagar, and MG Road receive heirloom-grade bridal jewellery at true artisan direct pricing.<br><br>Every parcel is packed in luxurious velvet-lined rigid boxes and dispatched via express courier, arriving within 24 hours of dispatch.`,
      image: '/images/necklaces/IMG-20260717-WA0007.jpg'
    },
    customModule: `
      <!-- Price Comparison Table Card -->
      <div style="background: linear-gradient(135deg, #1C151B 0%, #291C25 100%); color: #fff; border-radius: 20px; padding: 36px; margin: 45px 0; border: 1.5px solid rgba(212,175,55,0.4);">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #FFE28A; text-align: center; margin-bottom: 24px;">The Kannika Direct Artisan Advantage</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px;">
            <div style="color: #FF7B93; font-weight: 700; margin-bottom: 8px;">Commercial Street Boutiques</div>
            <ul style="font-size: 0.85rem; color: rgba(255,255,255,0.75); line-height: 1.7; padding-left: 18px;">
              <li>High showroom rental markups (40–60%)</li>
              <li>Often standard flash plating that tarnishes</li>
              <li>No lifetime polishing or size exchanges</li>
            </ul>
          </div>
          <div style="background: rgba(212,175,55,0.12); border: 1.5px solid var(--gold-primary); border-radius: 12px; padding: 20px;">
            <div style="color: var(--gold-primary); font-weight: 700; margin-bottom: 8px;">Sri Kannika Bangles Direct</div>
            <ul style="font-size: 0.85rem; color: rgba(255,255,255,0.95); line-height: 1.7; padding-left: 18px;">
              <li>Direct artisan workshop transparent pricing</li>
              <li>Pure 24K micro-gold anti-tarnish protective sealing</li>
              <li>Easy size exchanges &amp; WhatsApp photo preview</li>
            </ul>
          </div>
        </div>
      </div>`
  },

  // 4. Chickpet
  {
    slug: 'chickpet',
    name: 'Chickpet',
    title: 'Jewellery Shop in Chickpet Bangalore | Handcrafted Jadau Kadas Sri Kannika Bangles',
    desc: 'Discover authentic heavy Jadau kadas, antique matte bangles & temple wholesale craft in Chickpet, Bangalore. 35+ years heritage metalcraft with 24K micro gold finish.',
    keywords: 'jewellery shop in chickpet bangalore, wholesale bangles chickpet, jadau kadas chickpet, antique gold bangles raja market chickpet',
    themeClass: 'template-artisan-workshop',
    curationTitle: 'Heavy Jadau Kadas & Heritage Bangle Sets',
    curationSubtitle: 'Solid Cast Metalcraft Sculpted for Ancestral South Indian Bridal Trousseaus',
    products: [
      { id: 17, name: 'Heavy Jadau Kada Pair', category: 'Antique Kadas', price: 2850, originalPrice: 3800, image: '/images/bangles/IMG-20260805-WA0011.jpg', badge: '★ Heavy Gauge', rating: '5.0' },
      { id: 18, name: 'Antique Matte Gold Spacers', category: 'Stack Spacers', price: 1250, originalPrice: 1650, image: '/images/bangles/IMG-20260805-WA0015.jpg', badge: '★ 4-Piece Stack', rating: '4.8' },
      { id: 19, name: 'Heritage Kemp Bangle Set', category: 'Bridal Bangles', price: 3100, originalPrice: 4200, image: '/images/bangles/IMG-20260805-WA0019.jpg', badge: '★ Ruby Inset', rating: '5.0' },
      { id: 20, name: 'Nakshi Elephant Motif Kada', category: 'Temple Kadas', price: 2600, originalPrice: 3400, image: '/images/bangles/IMG-20260805-WA0020.jpg', badge: '★ Royal Patina', rating: '4.9' }
    ],
    editorial1: {
      title: 'Ancestral Metalcraft Born in Bangalore\'s Historic Corridor',
      text: `For centuries, Chickpet has reigned as Bangalore\'s legendary trading hub for wholesale silk, precious metals, and ancestral jewelry crafting. Yet modern buyers often find Chickpet\'s crowded bazaar lanes overwhelming, with unbranded imitation pieces lacking chemical safety and longevity guarantees.<br><br>Sri Kannika Bangles combines the authentic heavy metalcraft of Chickpet with modern quality control. Our Jadau kadas are crafted using traditional clay and lac molds, ensuring every stone sits firmly without falling out during rigorous wedding rituals.`,
      image: '/images/bangles/IMG-20260805-WA0009.jpg'
    },
    editorial2: {
      title: '24K Micro-Gold Electroplating Technical Rigor',
      text: `Unlike commercial dipped jewelry that fades after two wears, our workshop utilizes a rigorous 3-stage electrolytic plating process: beginning with acid-cleaned jeweler\'s brass, electro-coated with a copper-nickel barrier, and bonded with authentic 24K gold micro-particles.<br><br>Customers in Chickpet, Cottonpet, Balepet, and Avenue Road enjoy reliable same-day dispatch and transparent pricing direct from our master artisans.`,
      image: '/images/bangles/IMG-20260805-WA0013.jpg'
    },
    customModule: `
      <!-- Technical Craft Breakdown -->
      <div style="background: #FDF9F2; border: 1.5px solid #D4AF37; border-radius: 18px; padding: 32px; margin: 45px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.5rem; color: #2C1820; text-align: center; margin-bottom: 20px;">Artisanal Specification &amp; Quality Guarantee</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div style="text-align: center; padding: 16px; background: #fff; border-radius: 10px; border: 1px solid rgba(212,175,55,0.25);">
            <div style="font-size: 1.8rem; font-weight: 700; color: #9D1739; font-family:'Cinzel',serif;">100%</div>
            <div style="font-weight: 600; font-size: 0.9rem; margin-top: 4px;">Nickel &amp; Lead Free</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Gentle on sensitive bridal skin</div>
          </div>
          <div style="text-align: center; padding: 16px; background: #fff; border-radius: 10px; border: 1px solid rgba(212,175,55,0.25);">
            <div style="font-size: 1.8rem; font-weight: 700; color: #8B6914; font-family:'Cinzel',serif;">24K</div>
            <div style="font-weight: 600; font-size: 0.9rem; margin-top: 4px;">Micro-Gold Bonded</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Anti-tarnish barrier coating</div>
          </div>
          <div style="text-align: center; padding: 16px; background: #fff; border-radius: 10px; border: 1px solid rgba(212,175,55,0.25);">
            <div style="font-size: 1.8rem; font-weight: 700; color: #2C1820; font-family:'Cinzel',serif;">35+</div>
            <div style="font-weight: 600; font-size: 0.9rem; margin-top: 4px;">Years Bangalore Legacy</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Trusted across three generations</div>
          </div>
        </div>
      </div>`
  },

  // 5. Indiranagar
  {
    slug: 'indiranagar',
    name: 'Indiranagar',
    title: 'Jewellery in Indiranagar Bangalore | Minimalist Fusion Sets Kannika Bangles',
    desc: 'Contemporary bridal jewellery & handcrafted pendant sets in Indiranagar Bangalore. 24-hr express delivery to 100ft Road & CMH Road. Shop designer fusion collections.',
    keywords: 'jewellery indiranagar bangalore, pendant sets 100ft road indiranagar, contemporary bridal jewellery indiranagar, lightweight kadas indiranagar',
    themeClass: 'template-minimalist-luxury',
    curationTitle: 'Handcrafted Designer Pendant Sets & Lockets',
    curationSubtitle: 'Lightweight Fusion Elegance for Cosmopolitan Brides & Festive Gatherings',
    products: [
      { id: 21, name: 'Heritage Kundan Locket Set', category: 'Pendant Sets', price: 1899, originalPrice: 2499, image: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Everyday Luxury', rating: '4.9' },
      { id: 22, name: 'Contemporary AD Stone Pendant', category: 'CZ Diamonds', price: 1750, originalPrice: 2299, image: '/images/pendant-sets/IMG-20260821-WA0011.jpg', badge: '★ Minimalist Chic', rating: '5.0' },
      { id: 23, name: 'Antique Matte Floral Locket', category: 'Temple Lockets', price: 1999, originalPrice: 2599, image: '/images/pendant-sets/IMG-20260821-WA0013.jpg', badge: '★ Royal Bloom', rating: '4.8' },
      { id: 24, name: 'Polki Drop Pendant with Studs', category: 'Polki Fusion', price: 2150, originalPrice: 2799, image: '/images/pendant-sets/IMG-20260821-WA0014.jpg', badge: '★ Statement Piece', rating: '5.0' }
    ],
    editorial1: {
      title: 'Effortless Fusion Jewellery for Indiranagar Trendsetters',
      text: `Indiranagar is synonymous with creative modern elegance, vibrant bistros, and cosmopolitan fashion along 100ft Road and 12th Main. Brides and young professionals residing here seek jewelry that shifts seamlessly from day events to evening rooftop celebrations.<br><br>Our handcrafted pendant sets and sleek bangles merge traditional Polki glasswork with streamlined geometric silhouettes. Styled with contemporary Indo-western ensembles or lightweight raw silk sarees, these creations offer striking visual impact without excessive physical weight.`,
      image: '/images/pendant-sets/IMG-20260821-WA0015.jpg'
    },
    editorial2: {
      title: '24–48 Hour Express Delivery to East & Central Bangalore',
      text: `We recognize that modern wedding preparations run on tight schedules. From our Malleshwaram hub, orders bound for Indiranagar, HAL 2nd Stage, Defence Colony, and Domlur are prioritized for direct same-day courier dispatch.<br><br>Customers enjoy direct WhatsApp photo sharing to inspect gemstone clarity in natural daylight before confirming their order.`,
      image: '/images/earrings/IMG-20260720-WA0032.jpg'
    },
    customModule: `
      <!-- Lifestyle Guide -->
      <div style="background: #F8F9FA; border-left: 4px solid var(--gold-primary); border-radius: 0 16px 16px 0; padding: 32px; margin: 40px 0;">
        <span style="color: var(--gold-primary); text-transform: uppercase; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.1em;">Styling Editorial</span>
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.5rem; margin: 6px 0 12px; color: var(--text-primary);">Day-to-Evening Transition in Indiranagar</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 0;">
          Wear our sleek single-motif pendant with crisp linen blouses or handloom kurtas for morning brunches. In the evening, layer with a matching Kundan ring and delicate gold kada to transform the look for sangeets and cocktail receptions.
        </p>
      </div>`
  },

  // 6. Koramangala
  {
    slug: 'koramangala',
    name: 'Koramangala',
    title: 'Jewellery in Koramangala Bangalore | Haldi, Mehendi & Party Suites Kannika',
    desc: 'Colourful bridal bangles, Haldi-Mehendi jewellery & festive jhumkas in Koramangala Bangalore. Fast doorstep courier delivery to all blocks & curated party kits.',
    keywords: 'jewellery in koramangala, haldi jewellery bangalore, mehendi bangles koramangala, festive jhumkas koramangala, party wear jewellery bangalore',
    themeClass: 'template-festive-carousel',
    curationTitle: 'Festive Chandbalis & Colourful Gemstone Bangles',
    curationSubtitle: 'Lively, Radiant Pieces Crafted for Haldi Sunshine, Mehendi Rituals & Sangeet Celebrations',
    products: [
      { id: 25, name: 'Emerald Green Kemp Jhumka', category: 'Festive Earrings', price: 1850, originalPrice: 2400, image: '/images/earrings/IMG-20260720-WA0019.jpg', badge: '★ Haldi Glow', rating: '4.9' },
      { id: 26, name: 'Ruby Floral Chandbali', category: 'Mehendi Wear', price: 2300, originalPrice: 2999, image: '/images/earrings/IMG-20260720-WA0025.jpg', badge: '★ Vibrant Flora', rating: '5.0' },
      { id: 27, name: 'Colourful Velvet-Line Bangles', category: 'Festive Bangles', price: 1550, originalPrice: 2100, image: '/images/bangles/IMG-20260805-WA0016.jpg', badge: '★ Stack of 6', rating: '4.8' },
      { id: 28, name: 'Multi-Gemstone Kada', category: 'Navratna Inset', price: 2100, originalPrice: 2800, image: '/images/bangles/IMG-20260805-WA0017.jpg', badge: '★ Royal Gemstone', rating: '5.0' }
    ],
    editorial1: {
      title: 'Vibrant Haldi & Mehendi Jewellery for Koramangala Celebrations',
      text: `Koramangala is the vibrant heartbeat of Bangalore\'s youthful energy, destination celebrations, and eclectic wedding parties across Blocks 1 through 8. Modern festive celebrations call for vivid hues, radiant Kemp stone highlights, and joyful statement earrings that stand out in photographs.<br><br>Our festive curation embraces brilliant ruby pinks, emerald greens, and warm saffron golds. Coated with moisture-resistant protective lacquers, our pieces withstand the splashing water and turmeric paste of Haldi rituals without tarnishing.`,
      image: '/images/earrings/IMG-20260720-WA0020.jpg'
    },
    editorial2: {
      title: 'Curated Bridesmaid Gifting & Party Packs',
      text: `Planning wedding festivities with your closest circle in Koramangala? We offer coordinated bridesmaid bangle sequences and matching stud earrings presented in bespoke silk pouches.<br><br>Order directly online or connect with our stylists on WhatsApp for coordinated party packs, with guaranteed 24-hour courier drop-offs across Koramangala, Sony World Junction, and ST Bed Layout.`,
      image: '/images/bangles/IMG-20260805-WA0018.jpg'
    },
    customModule: `
      <!-- Festive Tips Card -->
      <div style="background: linear-gradient(135deg, #FFF7F0 0%, #FFF0F5 100%); border: 1.5px solid rgba(212,69,106,0.3); border-radius: 18px; padding: 32px; margin: 40px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.5rem; color: #9D1739; margin-bottom: 12px; text-align: center;">Haldi &amp; Mehendi Care Essentials</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; text-align: center; max-width: 680px; margin: 0 auto;">
          Our proprietary 24K micro gold finish is sweat-resistant and skin-safe. Simply wipe gently with a soft dry cloth after festivities before returning ornaments to their airtight zip pouch to maintain showroom brilliance.
        </p>
      </div>`
  },

  // 7. Rajajinagar
  {
    slug: 'rajajinagar',
    name: 'Rajajinagar',
    title: 'Jewellery Shop in Rajajinagar Bangalore | Heirloom Sets Kannika Bangles',
    desc: 'Heirloom bridal jewellery, antique gold kadas & choker harams for Rajajinagar families. Same-day express dispatch from Malleshwaram showroom & local home delivery.',
    keywords: 'jewellery shop in rajajinagar, bridal bangles rajajinagar bangalore, antique jewellery rajajinagar 1st block, wedding kadas rajajinagar',
    themeClass: 'template-family-heritage',
    curationTitle: 'Classic Antique Sets & Heirloom Bangles',
    curationSubtitle: 'Treasured Metalcraft Handed Down Through Generations of West Bangalore Families',
    products: [
      { id: 29, name: 'Timeless Nakshi Choker', category: 'Antique Chokers', price: 4200, originalPrice: 5500, image: '/images/necklaces/IMG-20260717-WA0003.jpg', badge: '★ Heirloom Classic', rating: '5.0' },
      { id: 30, name: 'Bridal Haram with Kemp Jhumkas', category: 'Wedding Suites', price: 5100, originalPrice: 6800, image: '/images/necklaces/IMG-20260717-WA0007.jpg', badge: '★ Mother of the Bride', rating: '4.9' },
      { id: 31, name: 'Heirloom Bangle Stack (Set of 4)', category: 'Antique Bangles', price: 2400, originalPrice: 3200, image: '/images/bangles/IMG-20260805-WA0012.jpg', badge: '★ Traditional Stack', rating: '5.0' },
      { id: 32, name: 'Traditional Peacock Kada', category: 'Carved Kadas', price: 1950, originalPrice: 2600, image: '/images/bangles/IMG-20260805-WA0013.jpg', badge: '★ Antique Patina', rating: '4.8' }
    ],
    editorial1: {
      title: 'Family Heirloom Traditions Across Rajajinagar',
      text: `Bordering our home territory of Malleshwaram, Rajajinagar has stood as a beloved sister neighborhood to Sri Kannika Bangles for over 35 years. From Rajajinagar 1st Block near the entrance to 6th Block and Bashyam Circle, multiple generations of families have trusted us to dress brides, mothers, and grandmothers for auspicious milestones.<br><br>Our antique harams and carved kadas carry an emotional weight that transcends fashion trends. Meticulously hand-burnished to simulate aged heirloom gold, they harmonize gracefully with traditional gold jewelry passed down from elders.`,
      image: '/images/necklaces/IMG-20260717-WA0009.jpg'
    },
    editorial2: {
      title: 'West Bangalore Same-Day Express Delivery',
      text: `Given our proximity to Rajajinagar, local orders confirmed before 2:00 PM are frequently delivered on the very same day via dedicated courier dispatch. Need an urgent last-minute stack adjustment for tomorrow\'s engagement or puja?<br><br>Connect directly with our showroom team on WhatsApp, confirm wrist sizes with our digital gauge guide, and have your jewellery hand-delivered safely to your door.`,
      image: '/images/bangles/IMG-20260805-WA0007.jpg'
    },
    customModule: `
      <!-- Dispatch Guarantee Card -->
      <div style="background: #FFFDF9; border: 1.5px dashed var(--gold-primary); border-radius: 16px; padding: 28px; margin: 40px 0; text-align: center;">
        <i data-lucide="zap" style="width:32px;height:32px;color:var(--gold-primary);margin-bottom:8px;"></i>
        <h4 style="font-family:'Cinzel',serif;font-size:1.3rem;color:var(--text-primary);margin-bottom:8px;">Rajajinagar Express Dispatch Guarantee</h4>
        <p style="font-size:0.9rem;color:var(--text-secondary);max-width:620px;margin:0 auto 16px;">
          Same-day direct delivery available across Rajajinagar Blocks 1–6, Dr. Rajkumar Road, and Subramanyanagar on all orders confirmed before 2:00 PM.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20requesting%20same-day%20delivery%20in%20Rajajinagar" class="btn btn--outline btn--sm" target="_blank" rel="noopener">Request Rajajinagar Express WhatsApp</a>
      </div>`
  },

  // 8. Whitefield
  {
    slug: 'whitefield',
    name: 'Whitefield',
    title: 'Bridal Jewellery in Whitefield Bangalore | Kannika Bangles Virtual Concierge',
    desc: 'Personalized bridal styling & express doorstep courier delivery to Whitefield Bangalore. Shop designer pendants, CZ cocktail chokers & destination wedding sets.',
    keywords: 'jewellery whitefield bangalore, bridal jewellery whitefield itpl, imitation jewellery kadugodi, wedding jewellery delivery whitefield',
    themeClass: 'template-virtual-studio',
    curationTitle: 'Signature Bridal Pendants & Statement Chokers',
    curationSubtitle: 'Curated for Tech-Corridor Brides, Remote NRI Weddings & Destination Trousseaus',
    products: [
      { id: 33, name: 'Solitaire AD Pendant Set', category: 'CZ Diamonds', price: 2199, originalPrice: 2899, image: '/images/pendant-sets/IMG-20260821-WA0010.jpg', badge: '★ High Clarity', rating: '5.0' },
      { id: 34, name: 'Royal Nakshi Medallion Set', category: 'Pendant Sets', price: 2450, originalPrice: 3200, image: '/images/pendant-sets/IMG-20260821-WA0012.jpg', badge: '★ Grand Locket', rating: '4.9' },
      { id: 35, name: 'Layered Grand Bridal Choker', category: 'Destination Bridal', price: 4800, originalPrice: 6200, image: '/images/necklaces/IMG-20260717-WA0009.jpg', badge: '★ Destination Suite', rating: '5.0' },
      { id: 36, name: 'Temple Nakshi Choker Suite', category: 'Antique Gold', price: 5600, originalPrice: 7400, image: '/images/necklaces/IMG-20260717-WA0010.jpg', badge: '★ Royal Antique', rating: '4.8' }
    ],
    editorial1: {
      title: 'Virtual Bridal Concierge for Whitefield & IT-Corridor Brides',
      text: `Situated in Bangalore\'s thriving technology and NRI corridor, brides living in Whitefield, ITPL, and Kadugodi often manage intense professional schedules alongside wedding preparations. Traveling across town in city traffic for multiple bridal fittings is simply impractical.<br><br>Sri Kannika Bangles bridges the distance through our personalized WhatsApp Bridal Styling Concierge. Our senior curators share high-resolution unedited photos of bridal chokers, kada stacks, and pendant lockets, matching pieces beside your fabric photos for pixel-perfect harmonization.`,
      image: '/images/pendant-sets/IMG-20260821-WA0016.jpg'
    },
    editorial2: {
      title: 'Tamper-Proof Courier Security & Express Doorstep Transit',
      text: `Every shipment to Whitefield, Hope Farm, and Varthur Road is packaged within a tamper-evident hard security box, cushioned with velvet protective inserts, and fully insured in transit. You receive live tracking updates via WhatsApp from the moment of dispatch until it reaches your hands.<br><br>Destination wedding preparations become completely stress-free with our guaranteed delivery timelines and hassle-free size replacement policy.`,
      image: '/images/necklaces/IMG-20260717-WA0012.jpg'
    },
    customModule: `
      <!-- Bridal Styling Booking Card -->
      <div style="background: linear-gradient(135deg, #1A1829 0%, #2A1F3D 100%); color: #fff; border: 1.5px solid #D4AF37; border-radius: 20px; padding: 36px; margin: 40px 0; text-align: center;">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:50%;background:rgba(212,175,55,0.2);margin-bottom:16px;">
          <i data-lucide="message-circle" style="width:30px;height:30px;color:var(--gold-primary);"></i>
        </div>
        <h3 style="font-family:'Cinzel',serif;font-size:1.6rem;color:#FFE28A;margin-bottom:10px;">Connect with Our Senior Bridal Stylist on WhatsApp</h3>
        <p style="font-size:0.95rem;color:rgba(255,255,255,0.85);max-width:600px;margin:0 auto 24px;line-height:1.7;">
          View pieces live under studio lighting, inspect clasp mechanisms, and test color harmonies with our senior stylists without leaving your Whitefield home.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'd%20like%20to%20consult%20from%20Whitefield" target="_blank" rel="noopener" class="btn btn--primary btn--lg">
          <i data-lucide="calendar" style="width:18px;height:18px;margin-right:6px;"></i> Chat on WhatsApp
        </a>
      </div>`
  }
];

function buildAreaPage(cfg) {
  const cardsHtml = cfg.products.map(p => renderProductCard(p)).join('\n');
  const footerHtml = getFooter(cfg.slug, cfg.name);

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cfg.title}</title>
  <meta name="description" content="${cfg.desc}">
  <meta name="keywords" content="${cfg.keywords}">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/areas/${cfg.slug}">

  <!-- Open Graph -->
  <meta property="og:title" content="${cfg.title}">
  <meta property="og:description" content="${cfg.desc}">
  <meta property="og:image" content="https://kannikabangles.com${cfg.products[0].image}">
  <meta property="og:url" content="https://kannikabangles.com/areas/${cfg.slug}">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${cfg.title}">
  <meta name="twitter:description" content="${cfg.desc}">
  <meta name="twitter:image" content="https://kannikabangles.com${cfg.products[0].image}">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css?v=20260916_202">
  <link rel="stylesheet" href="/css/home.css?v=20260916_202">
  <link rel="stylesheet" href="/css/mobile.css?v=20260916_202">
  <link rel="stylesheet" href="/css/pages.css?v=20260916_202">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">
</head>
<body class="area-page ${cfg.themeClass}">

${universalHeader}

  <!-- Page Hero (Distinct Per Template) -->
  <section class="page-hero">
    <h1 class="page-hero__title">Jewellery in <span class="text-gold">${cfg.name}</span></h1>
    <p class="page-hero__subtitle">${cfg.curationSubtitle}</p>
    <div class="page-hero__breadcrumb">
      <a href="/">Home</a>
      <i data-lucide="chevron-right"></i>
      <a href="/areas">Areas We Serve</a>
      <i data-lucide="chevron-right"></i>
      <span>${cfg.name}</span>
    </div>
  </section>

  <!-- Featured Curated Products (Distinct Per Area) -->
  <section class="section section--alt area-featured-products" style="padding: 48px 0; background: var(--bg-secondary);">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: 36px;">
        <span class="section-subtitle">Curated Collection</span>
        <h2 class="section-title">${cfg.curationTitle} in <span class="text-gold">${cfg.name}</span></h2>
        <div class="divider"></div>
        <p style="max-width: 680px; margin: 12px auto 0; font-size: 0.95rem; color: var(--text-secondary);">
          Explore our most requested handcrafted pieces curated specifically for weddings and celebrations in ${cfg.name}.
        </p>
      </div>

      <div class="product-grid" id="areaProductsGrid">
${cardsHtml}
      </div>

      <div class="text-center" style="margin-top: 36px; display: flex; justify-content: center; width: 100%; text-align: center;">
        <a href="/shop" class="btn btn--primary btn--lg">View Complete 48-Piece Catalog <i data-lucide="arrow-right" style="width:18px;height:18px;vertical-align:middle;margin-left:6px;"></i></a>
      </div>
    </div>
  </section>

  <!-- Rich SEO Editorial Section with Distinct Photos & Modules -->
  <section class="seo-rich-section">
    <div class="container">
      <div class="seo-content-wrapper">

        <!-- Part 1: Editorial Split Layout -->
        <div class="seo-editorial-grid">
          <div class="seo-editorial-card text-block">
            <h2 class="seo-title-gold">${cfg.editorial1.title}</h2>
            <p>${cfg.editorial1.text}</p>
          </div>
          <div class="seo-editorial-image">
            <img src="${cfg.editorial1.image}" alt="${cfg.name} Jewellery Curation - Sri Kannika Bangles" style="border-radius:16px;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:0 12px 36px rgba(0,0,0,0.08);">
          </div>
        </div>

        ${cfg.customModule}

        <!-- Part 2: Reverse Editorial Split Layout -->
        <div class="seo-editorial-grid reverse">
          <div class="seo-editorial-card text-block">
            <h3 class="seo-subheading">${cfg.editorial2.title}</h3>
            <p>${cfg.editorial2.text}</p>
          </div>
          <div class="seo-editorial-image">
            <img src="${cfg.editorial2.image}" alt="Handcrafted Bridal Ornaments for ${cfg.name} Bangalore" style="border-radius:16px;width:100%;aspect-ratio:4/3;object-fit:cover;box-shadow:0 12px 36px rgba(0,0,0,0.08);">
          </div>
        </div>

        <!-- 3-Column Interactive Feature Grid -->
        <div class="seo-feature-grid" style="margin-top: 50px;">
          <div class="seo-feature-card">
            <div class="seo-feature-card__icon"><i data-lucide="crown" style="width:24px;height:24px;"></i></div>
            <h3>Pure 24K Micro-Gold Electroplate</h3>
            <p>Sculpted on skin-safe jeweler's brass bases with durable anti-tarnish protective sealing.</p>
          </div>
          <div class="seo-feature-card">
            <div class="seo-feature-card__icon"><i data-lucide="truck" style="width:24px;height:24px;"></i></div>
            <h3>24–48 Hr Doorstep Courier</h3>
            <p>Fast insured delivery directly to ${cfg.name} in secure tamper-evident rigid boxes.</p>
          </div>
          <div class="seo-feature-card">
            <div class="seo-feature-card__icon"><i data-lucide="message-circle" style="width:24px;height:24px;"></i></div>
            <h3>WhatsApp Bridal Styling</h3>
            <p>Inspect jewelry details under natural lighting with senior stylists before ordering.</p>
          </div>
        </div>

        <!-- Interactive Accordion FAQ -->
        <div class="seo-interactive-accordion" style="margin-top: 50px;">
          <h2 class="seo-title-gold">Frequently Asked Questions — ${cfg.name} Customers</h2>
          <p class="seo-accordion-intro">Everything you need to know regarding courier dispatch, sizing, and styling services for ${cfg.name}:</p>

          <div class="seo-accordion-item active">
            <button class="seo-accordion-btn" aria-expanded="true" onclick="this.parentElement.classList.toggle('active')">
              Q. How quickly do orders arrive at ${cfg.name}?
              <span class="seo-accordion-icon">+</span>
            </button>
            <div class="seo-accordion-content">
              <p>Orders to <strong>${cfg.name}</strong> are dispatched directly from our Malleshwaram showroom via priority courier and typically arrive within 24 to 48 hours in tamper-evident hard boxes.</p>
            </div>
          </div>

          <div class="seo-accordion-item">
            <button class="seo-accordion-btn" aria-expanded="false" onclick="this.parentElement.classList.toggle('active')">
              Q. Can I preview real photos of the jewellery before purchasing?
              <span class="seo-accordion-icon">+</span>
            </button>
            <div class="seo-accordion-content">
              <p>Yes! We gladly share raw unedited photos and close-up detail shots on WhatsApp for ${cfg.name} customers. Our curators help match your saree color and confirm clasp details.</p>
            </div>
          </div>

          <div class="seo-accordion-item">
            <button class="seo-accordion-btn" aria-expanded="false" onclick="this.parentElement.classList.toggle('active')">
              Q. What if I order the wrong bangle size?
              <span class="seo-accordion-icon">+</span>
            </button>
            <div class="seo-accordion-content">
              <p>We provide hassle-free size replacements. If your bangle size (2.4, 2.6, or 2.8) doesn't fit comfortably, contact our support team on WhatsApp within 48 hours for a prompt size swap.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Area Consultation & Contact Enquiry Form -->
  <section class="section area-contact-section" style="padding: 60px 0; background: var(--bg-primary);">
    <div class="container">
      <div style="max-width: 680px; margin: 0 auto;">
        <div class="text-center reveal" style="margin-bottom: 30px;">
          <span class="section-subtitle">Bridal Consultation &amp; Enquiries</span>
          <h2 class="section-title">Connect with Us in <span class="text-gold">${cfg.name}</span></h2>
          <div class="divider"></div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 8px;">
            Have questions about bridal stacks, custom bangle sizing, or express 24-hr delivery to ${cfg.name}? Fill out your details below and our showroom styling team will reach out promptly.
          </p>
        </div>

        <form class="contact-form" id="areaContactForm" style="box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          <div class="form-group">
            <label class="form-label" for="contactName">Your Full Name</label>
            <input type="text" id="contactName" class="form-input" placeholder="Enter your full name" required>
          </div>
          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="contactPhone">Phone / WhatsApp</label>
              <input type="tel" id="contactPhone" class="form-input" placeholder="+91 98447 58450" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contactEmail">Email Address</label>
              <input type="email" id="contactEmail" class="form-input" placeholder="name@example.com">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="contactMessage">Jewellery Requirement / Preferred Delivery Date</label>
            <textarea id="contactMessage" class="form-input" rows="4" placeholder="Mention your bridal requirements, bangle sizes, or queries for ${cfg.name}..." required></textarea>
          </div>
          <button type="submit" class="btn btn--primary" style="width: 100%; justify-content: center; font-size: 1rem; padding: 14px;">
            <i data-lucide="send" style="width: 18px; height: 18px; margin-right: 8px;"></i> Submit Enquiry for ${cfg.name}
          </button>
        </form>
      </div>
    </div>
  </section>

${footerHtml}

  <!-- Sticky WhatsApp Floating Button (Single sticky action on whole site) -->
  <a href="https://wa.me/919844758450?text=Hi!%20I'm%20interested%20in%20your%20jewellery%20collection." class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
</body>
</html>
`;
}

// Build all 8 pages
console.log('Building 8 distinct Bangalore area pages...');
areaConfigs.forEach(cfg => {
  const filePath = path.join(__dirname, '../areas', `${cfg.slug}.html`);
  const html = buildAreaPage(cfg);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Built distinct area page: ${cfg.slug}.html (Theme: ${cfg.themeClass})`);
});

console.log('\n🎉 ALL 8 DISTINCT AREA PAGES BUILT SUCCESSFULLY!');
