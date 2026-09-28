const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════');
console.log('  EXECUTING SEO EXPANSION & CONTENT READABILITY OVERHAUL');
console.log('═══════════════════════════════════════════════════════════════\n');

// ─── 1. Common Universal Header & Footer Snippets ───
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

const commonFooter = `  <!-- ═══════════════════════════════════════════════════
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

  <!-- Sticky WhatsApp Floating Button -->
  <a href="https://wa.me/919844758450?text=Hi!%20I'm%20interested%20in%20your%20jewellery%20collection." class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`;

function getContactSection(title, pageContext) {
  return `  <!-- Consultation & Contact Enquiry Form -->
  <section class="section" style="padding: 60px 0; background: var(--bg-primary, #FFFDF9);">
    <div class="container">
      <div style="max-width: 680px; margin: 0 auto;">
        <div class="text-center reveal" style="margin-bottom: 30px;">
          <span class="section-subtitle">Bridal Consultation &amp; Enquiries</span>
          <h2 class="section-title">Connect with Our Stylists for <span class="text-gold">${title}</span></h2>
          <div class="divider"></div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 8px;">
            Have questions regarding custom sizing, wedding saree matching, or express 24-48 hr doorstep delivery in Bangalore? Drop your details below and our team will get in touch.
          </p>
        </div>

        <form class="contact-form" id="pageContactForm" style="box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
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
            <label class="form-label" for="contactMessage">Ceremony Details / Preferred Sizing &amp; Delivery</label>
            <textarea id="contactMessage" class="form-input" rows="4" placeholder="Mention your bridal requirements, bangle sizes, or queries for ${pageContext}..." required></textarea>
          </div>
          <button type="submit" class="btn btn--primary" style="width: 100%; justify-content: center; font-size: 1rem; padding: 14px;">
            <i data-lucide="send" style="width: 18px; height: 18px; margin-right: 8px;"></i> Submit Consultation Request
          </button>
        </form>
      </div>
    </div>
  </section>`;
}

// ─── 2. Fix Header Padding on 7 Existing Pages ───
console.log('--- 1. Normalizing hero padding and adding forms on existing pages ---');
const pagesToNormalize = [
  'bridal-jewellery-bangalore.html',
  'temple-jewellery-bangalore.html',
  'muhurtham-jewellery-bangalore.html',
  'reception-and-sangeet-jewellery-bangalore.html',
  'haldi-and-mehendi-jewellery-bangalore.html',
  'blog/wedding-jewellery-rental-vs-buying-bangalore.html',
  'blog/bangle-size-guide-and-wrist-measurement.html'
];

for (const rel of pagesToNormalize) {
  const filePath = path.join(__dirname, '..', rel);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Normalize excessive inline hero padding
  content = content.replace(/padding:\s*100px\s*20px\s*(?:70px|60px);/g, 'padding: 44px 20px 40px;');

  // Ensure contact form on the 5 bridal pages
  if (!rel.startsWith('blog/') && !content.includes('class="contact-form"')) {
    const titleMatch = content.match(/<title>([^<|]+)/);
    const title = titleMatch ? titleMatch[1].trim() : 'Bridal Jewellery';
    const formHtml = getContactSection(title, rel.replace('.html', ''));
    content = content.replace('<!-- Footer -->', `${formHtml}\n\n  <!-- Footer -->`);
    content = content.replace('<!-- ═══════════════════════════════════════════════════\n       FOOTER', `${formHtml}\n\n      <!-- ═══════════════════════════════════════════════════\n       FOOTER`);
  }

  // Ensure sticky WhatsApp button
  if (!content.includes('class="whatsapp-float"')) {
    const waHtml = `  <!-- Sticky WhatsApp Floating Button -->
  <a href="https://wa.me/919844758450?text=Hi!%20I'm%20interested%20in%20your%20jewellery%20collection." class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`;
    content = content.replace('</body>', `${waHtml}\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Normalized & enhanced: ${rel}`);
}

console.log('\n--- 2. Building 4 NEW Click-Magnet Blog Pages ---');

// ─── 3. Blog Page Generator ───
const newBlogs = [
  {
    slug: 'best-artificial-jewellery-shops-in-commercial-street-bangalore',
    title: 'Best Artificial Jewellery in Commercial Street Bangalore (2026 Buying Guide)',
    metaDesc: 'Discover top artificial jewellery shopping on Commercial Street Bangalore. Compare boutique prices vs workshop direct, check 24K micro gold plating & bridal lehenga matching.',
    keywords: 'artificial jewellery commercial street bangalore, imitation jewellery shopping commercial street, bridal jewellery shivajinagar bangalore, commercial street jewellery shops price',
    heroImage: '/images/blog/blog_4.jpg',
    readTime: '6 min read',
    tag: 'Bangalore Shopping Guide',
    date: '2026-09-16',
    faq: [
      { q: 'What is the average price of bridal jewellery sets on Commercial Street?', a: 'Standard commercial retail boutiques charge ₹6,000 to ₹15,000 for imitation bridal sets due to high showroom rents. Direct artisan workshops like Sri Kannika Bangles offer equivalent or superior 24K micro-gold sets between ₹2,200 and ₹6,500.' },
      { q: 'How can I test whether artificial jewellery will tarnish or cause skin rash?', a: 'Always look for nickel-free and lead-free jeweler’s brass bases sealed with 24K micro gold electroplating. Avoid cheap flash-dipped metal that smells metallic or chips when lightly rubbed with a clean cloth.' },
      { q: 'Can I get wedding lehenga matching jewellery delivered in Bangalore?', a: 'Yes! Sri Kannika Bangles provides same-day or 24–48 hour express delivery across Commercial Street, Shivaji Nagar, and all Bangalore areas with instant WhatsApp photo color verification.' }
    ],
    sections: [
      {
        h2: 'Why Commercial Street is Bangalore’s Fashion Epicenter',
        lead: 'Commercial Street in Shivaji Nagar is universally recognized as Karnataka’s bridal fashion capital, drawing thousands of brides every weekend to explore bridal lehengas, dupattas, and ornate jewelry accessories.',
        points: [
          '**Over 200+ Fashion Outlets**: From narrow Tasker Town bylanes to main street boutiques, Commercial Street offers every conceivable style from modern American Diamond to heavy Kundan.',
          '**Complete Wedding Styling Hub**: Brides can easily test matching chokers, jhumkas, and kada bangles directly against their newly purchased wedding lehengas and reception gowns.',
          '**Fast-Paced Trend Cycles**: High turnover means Commercial Street reflects the newest celebrity wedding trends, pastel enamel work, and polki fusion motifs faster than traditional markets.'
        ]
      },
      {
        h2: 'Commercial Street Retail Boutiques vs Direct Workshop Value',
        lead: 'While Commercial Street offers unmatched visual variety, understanding boutique pricing vs master craft manufacturing saves brides tens of thousands of rupees.',
        points: [
          '**Commercial Boutique Markups (40%–60%)**: High retail rentals on Commercial Street inevitably get added to bridal sets, inflating prices on standard brass ornaments.',
          '**Variable Plating Durability**: Many fast-fashion street sellers provide basic "flash plating" that oxidizes or loses luster after just two ceremonial wears in tropical Bangalore weather.',
          '**The Direct Artisan Advantage**: Sourcing directly from heritage manufacturers like Sri Kannika Bangles guarantees genuine 24-karat micro gold bonding, lifetime polishing support, and uninflated workshop prices.'
        ]
      },
      {
        h2: '4 Checkpoints to Inspect When Buying Imitation Jewellery',
        lead: 'Never finalize your bridal accessories without verifying these 4 quality checkpoints:',
        points: [
          '**Skin-Safe Chemical Standards**: Insist on 100% lead-free and nickel-free brass alloy cores to prevent itchy neck rashes during sweaty hours of rituals.',
          '**Prong vs Glued Stone Settings**: Ensure American Diamonds and Kundan glass elements are seated in hand-folded metal prongs rather than weak synthetic glue that detaches under stage lights.',
          '**Micro-Gold Electroplating Seal**: Quality pieces carry an anti-tarnish protective lacquer barrier that repels perspiration, perfume mist, and Haldi turmeric stains.',
          '**Smooth Interior Finishing**: Run your fingers across the back of chokers and bangles; rough burrs will snag delicate silk saree threads and chiffon dupattas.'
        ]
      },
      {
        h2: 'How to Match Commercial Street Lehengas with Bridal Sets',
        lead: 'Achieving a magazine-worthy bridal ensemble requires intentional contrast rather than monochromes:',
        points: [
          '**Pastel Pink & Mint Lehengas**: Pair with uncut Kundan and Polki choker sets highlighted with Russian emerald green beads to anchor the gentle pastel palette.',
          '**Deep Velvet Red & Maroon Gowns**: Complement with brilliant American Diamond (AD) rhodium or two-tone micro-gold chokers to catch camera flashes brilliantly.',
          '**Mustard Yellow Haldi Lehengas**: Accent with lightweight antique floral jhumkas and multi-stone bangles for playful daylight photographs.'
        ]
      }
    ]
  },
  {
    slug: 'how-to-match-bridal-jewellery-with-kanjivaram-silk-sarees',
    title: 'How to Match Bridal Jewellery with Kanjivaram Silk Sarees | 2026 Guide',
    metaDesc: 'Master guide to matching bridal jewellery with Kanjivaram silk sarees. Color combinations, 3-tier necklace layering, temple haram pairing & wrist stack styling.',
    keywords: 'match jewellery with kanjivaram saree, temple jewellery for kanjivaram silk saree, south indian bridal saree jewellery combinations, muhurtham saree jewellery matching',
    heroImage: '/images/blog/blog_3.jpg',
    readTime: '7 min read',
    tag: 'Bridal Styling Masterclass',
    date: '2026-09-16',
    faq: [
      { q: 'Should I wear matte gold or glossy gold with Kanjivaram sarees?', a: 'Antique matte 24K micro-gold finish is the undisputed best choice for Kanjivaram silk. The matte texture matches the muted elegance of authentic pure zari without generating harsh flash glare in wedding photography.' },
      { q: 'What is the 3-tier South Indian necklace layering formula?', a: 'The 3-tier formula layers: 1) A snug antique collar choker (12–14 inches), 2) A medium-length floral or peacock necklace (18–20 inches), and 3) A grand long Goddess Lakshmi haram or kasu malai (28–32 inches).' },
      { q: 'How many bangles should I wear with a bridal Kanjivaram saree?', a: 'A traditional bridal wrist stack consists of 2 heavy Nakshi kadas on the outer ends, 4–6 textured spacer bangles, and 6–8 red/green glass bangles in the center for harmonious rhythmic jingle.' }
    ],
    sections: [
      {
        h2: 'The Sacred Bond Between Kanjivaram Silk and Antique Jewellery',
        lead: 'A handwoven Kanjivaram silk saree is an architectural marvel of gold zari, rich mulberry silk, and generational temple motifs. Pairing it with modern, thin commercial jewelry diminishes its royal majesty.',
        points: [
          '**Textural Harmony**: Pure Kanjivaram zari possesses a warm, deep gold glow that demands antique matte or Nakshi burnished jewelry rather than glossy synthetic yellow plating.',
          '**Weight Balance**: The substantial drape of heavy silk sarees (often weighing 1.5kg to 2.5kg) requires bold statement jewelry silhouettes that command presence on stage.',
          '**Mythological Continuity**: Repeating saree border motifs (peacocks, temple spires, swans) in your necklaces and bangles creates seamless visual storytelling.'
        ]
      },
      {
        h2: 'Color-by-Color Saree & Jewellery Matching Matrix',
        lead: 'Follow this time-tested bridal color coordination guide for stunning wedding album photographs:',
        points: [
          '**Crimson & Sindoor Red Silks**: Pair with antique matte Nakshi chokers and Lakshmi harams encrusted with deep ruby Kemp stones for timeless South Indian royalty.',
          '**Emerald & Peacock Green Silks**: Contrast with two-tone micro-gold jewelry or rich gold kadas featuring pearl drops to prevent the jewelry from blending into the green background.',
          '**Mustard & Mango Yellow Silks**: Accentuate with vibrant ruby-studded temple chokers and openable screw kadas for high-energy daylight muhurtham ceremonies.',
          '**Royal Purple & Aubergine Silks**: Highlight with white American Diamond (AD) stone chokers or polki uncut glass jewelry to create regal stage contrast.',
          '**Contemporary Pastel & Peach Kanjivarams**: Complement with delicate Kemp ruby-pearl lockets and lightweight filigree spacers for modern morning weddings.'
        ]
      },
      {
        h2: 'The 3-Tier Necklace Layering Formula',
        lead: 'Avoid necklace clutter by following the strict ergonomic three-tier spacing rule:',
        points: [
          '**Tier 1: The Snug Collar Choker (12–14 in)**: Sits high on the collarbone, defining the neckline and providing a solid foundation above the saree pallu drape.',
          '**Tier 2: The Medium Floral Necklace (18–20 in)**: Drops gracefully below the choker with articulated mango leaves or peacock links, bridging the visual space.',
          '**Tier 3: The Grand Long Haram (28–32 in)**: Extends past the chest with an auspicious Goddess Lakshmi or Venkateshwara medallion, centering the entire bridal trousseau.'
        ]
      },
      {
        h2: 'Curating the Perfect Bridal Bangle Stack',
        lead: 'A well-composed wrist stack provides balance and cadence throughout wedding rituals:',
        points: [
          '**Broad Exterior Anchor Kadas**: Position two heavy screw kadas at both outer ends to frame the wrist sequence securely.',
          '**Interlocking Filigree Spacers**: Alternate with 4 antique gold spacers that add sparkle and textural rhythm.',
          '**Auspicious Color Glass Bangles**: Nest 6 to 8 red or green glass bangles in the middle for auspicious bridal blessings and musical jingle.'
        ]
      }
    ]
  },
  {
    slug: 'temple-jewellery-designs-and-meanings-goddess-lakshmi-peacock-nakshi',
    title: 'Temple Jewellery Designs & Meanings: Goddess Lakshmi, Peacock & Nakshi',
    metaDesc: 'Discover the sacred symbolism behind South Indian temple jewellery motifs: Goddess Lakshmi harams, royal peacock kadas, mango malai & antique Nakshi metalcraft.',
    keywords: 'temple jewellery designs and meanings, lakshmi haram significance south indian wedding, nakshi jewellery bangalore, peacock motif antique jewellery',
    heroImage: '/images/blog/blog_2.jpg',
    readTime: '6 min read',
    tag: 'Heritage & Craftsmanship',
    date: '2026-09-16',
    faq: [
      { q: 'What does the Goddess Lakshmi motif symbolize in bridal temple jewellery?', a: 'Goddess Lakshmi represents eternal prosperity, auspicious beginnings, fertility, and divine grace. Wearing a Lakshmi haram during wedding rituals invokes her eternal blessings upon the newly married home.' },
      { q: 'Why is the peacock (Mayura) so prominent in temple kadas and earrings?', a: 'In Hindu iconology, the peacock represents majesty, sacred romance, marital fidelity, and spiritual immortality. Its fan plumage lends itself beautifully to three-dimensional antique Nakshi chiseling.' },
      { q: 'What is authentic Nakshi metalcraft?', a: 'Nakshi is an ancient Chola and Vijayanagara metal embossing technique where skilled artisans hand-carve divine figurines into thick sheet metal using specialized chisels and lac molds, delivering sculptural depth.' }
    ],
    sections: [
      {
        h2: 'The Living Legacy of Temple Jewellery in South India',
        lead: 'Originally commissioned by royal dynasties to adorn sacred temple idols in Karnataka and Tamil Nadu, temple jewellery represents one of India’s oldest continuous goldsmithing traditions.',
        points: [
          '**Consecrated Devotion**: Every curve, bell tassel, and gemstone socket originates from sacred Dravidian temple architecture and stone temple carvings.',
          '**From Sanctum to Sanctuary**: Over centuries, royal patrons and brides adopted these sacred symbols for auspicious wedding ceremonies, transforming personal jewelry into holy heirlooms.',
          '**Three Decades of Preservation**: At Sri Kannika Bangles in Malleshwaram, our artisans uphold these ancestral metalworking traditions using modern skin-safe metallurgy.'
        ]
      },
      {
        h2: '4 Sacred Temple Motifs and Their Cultural Meanings',
        lead: 'Each traditional temple design carries profound spiritual blessings for the bride:',
        points: [
          '**1. Gajalakshmi (Goddess Lakshmi with Elephants)**: Flanked by royal elephants showering holy water, this motif embodies supreme abundance, domestic bliss, and emotional resilience.',
          '**2. Mayura (The Celestial Peacock)**: Symbolizes pure beauty, divine grace, and joy. Its ornate tail flourishes are masterfully rendered in bridal jhumkas and statement kadas.',
          '**3. Manga Malai (Mango Leaf Silhouette)**: The green mango leaf represents fertile spring beginnings, auspicious festivities, and welcoming positive energy into the new family.',
          '**4. Hamsa (The Mythological Swan)**: Represents divine wisdom, discernment, and spiritual purity, traditionally carved along the arches of bridal chokers.'
        ]
      },
      {
        h2: 'The Art of Solid-Core Casting and Antique Matte Finishing',
        lead: 'True antique temple jewelry differs fundamentally from hollow modern machine-stamped imitations:',
        points: [
          '**Clay & Lac Core Molding**: Sculpted using ancient lost-wax and clay techniques that provide tactile weight and structural resilience.',
          '**Triple-Bath 24K Micro Gold Electroplating**: Layered over skin-safe jeweler’s brass with an electrolytic copper barrier to prevent chipping or fading.',
          '**Hand-Rubbed Matte Patina**: Treated with organic burnishing powders to replicate the warm, time-tested patina of 100-year-old museum treasures.'
        ]
      },
      {
        h2: 'Preserving Your Heirloom Temple Pieces for Decades',
        lead: 'Care for your handcrafted temple ornaments with these simple habits:',
        points: [
          '**The "Last On, First Off" Rule**: Put on jewelry only after hairspray, perfume, and lotion have fully dried to protect the micro-gold barrier.',
          '**Airtight Dry Storage**: Store each piece individually in velvet pouches inside an airtight container away from bathroom moisture.',
          '**Gentle Microfiber Cleaning**: Wipe with a dry, lint-free cotton cloth after wear to remove skin oils before returning to storage.'
        ]
      }
    ]
  },
  {
    slug: 'bridal-jewellery-budget-calculator-bangalore-weddings',
    title: 'Bridal Jewellery Budget Calculator for Bangalore Weddings (2026 Planner)',
    metaDesc: 'Complete bridal jewellery budget guide for Bangalore weddings. Compare real gold (₹20 Lakhs) vs 24K micro gold (₹25,000) & calculate event-by-event costs.',
    keywords: 'bridal jewellery budget bangalore, wedding jewellery cost breakdown, 1 gram gold vs real gold budget, bangalore wedding shopping budget planner',
    heroImage: '/images/blog/blog_1.jpg',
    readTime: '6 min read',
    tag: 'Budget & Financial Planning',
    date: '2026-09-16',
    faq: [
      { q: 'How much does a complete bridal jewellery set cost in Bangalore?', a: 'A complete 1-gram 24K micro gold plated bridal suite (choker, long haram, 2 pairs of heavy kadas, earrings, and maang tikka) ranges between ₹18,000 and ₹35,000 at Sri Kannika Bangles. The equivalent in solid 22K gold costs upwards of ₹18 to ₹25 Lakhs.' },
      { q: 'Is it safe to wear imitation bridal jewellery for destination weddings?', a: 'Yes! High-end micro-gold jewellery completely eliminates the immense anxiety of hotel locker theft, airport customs hassles, and armed transit security while looking 100% indistinguishable in 4K photography.' },
      { q: 'Can I reuse micro gold plated jewellery after my wedding?', a: 'Absolutely. Because our pieces feature anti-tarnish protective sealing, they remain radiant for festive Diwali celebrations, family weddings, pujas, and anniversary dinners for years.' }
    ],
    sections: [
      {
        h2: 'The Modern Bride’s Dilemma: Real Gold vs 24K Micro Gold',
        lead: 'With 22K gold prices exceeding ₹7,500+ per gram in 2026, purchasing a 4-ceremony bridal trousseau in pure solid gold requires an investment of ₹20 to ₹35 Lakhs.',
        points: [
          '**Crippling Opportunity Cost**: Spending ₹25 Lakhs on jewelry that stays locked in bank safety lockers drains financial reserves needed for home down payments, investments, or travel.',
          '**Severe Safety & Locker Worries**: Stressing over hotel room safes, destination wedding transit, and crowded wedding venues takes emotional joy away from your special week.',
          '**The Smart Hybrid Strategy**: Today’s forward-thinking Bangalore brides invest in solid gold gold coins or land for financial security, while wearing handcrafted 24K micro gold suites for wedding ceremonies.'
        ]
      },
      {
        h2: 'Real Gold vs 24K Micro Gold Cost Comparison Table',
        lead: 'Compare the direct financial investment across all major bridal components:',
        points: [
          '**Royal Bridal Choker Set**: Solid 22K Gold (65g) costs ₹5,40,000 | Sri Kannika 24K Micro Gold costs ₹4,999 (Savings: ₹5,35,001)',
          '**Long Temple Goddess Haram**: Solid 22K Gold (110g) costs ₹8,90,000 | Sri Kannika 24K Micro Gold costs ₹6,299 (Savings: ₹8,83,701)',
          '**Heavy Jadau Kada Pair (2 pcs)**: Solid 22K Gold (80g) costs ₹6,50,000 | Sri Kannika 24K Micro Gold costs ₹2,850 (Savings: ₹6,47,150)',
          '**Designer Reception AD Suite**: Solid 18K Diamond Set costs ₹4,50,000 | Sri Kannika Premium AD Set costs ₹3,899 (Savings: ₹4,46,101)',
          '**TOTAL WEDDING SAVINGS**: ₹25,30,000 Solid Gold vs ₹18,047 Micro Gold (Over ₹25 Lakhs saved with identical visual luxury!)'
        ]
      },
      {
        h2: 'Ceremony-by-Ceremony Budget Allocation Guide',
        lead: 'How to allocate your bridal jewellery wardrobe budget across 4 wedding functions:',
        points: [
          '**1. Haldi & Mehendi (Budget: ₹2,000–₹3,500)**: Lightweight floral kadas, multi-colored bangles, and moisture-resistant Kemp earrings that withstand turmeric water.',
          '**2. Sangeet & Cocktail Night (Budget: ₹3,500–₹5,500)**: High-sparkle American Diamond (CZ) choker or chandelier earrings that capture moving stage lights.',
          '**3. Muhurtham Ceremony (Budget: ₹8,000–₹14,000)**: The crown jewel: 3-tier antique Nakshi choker + Lakshmi haram suite and paired heavy kadas.',
          '**4. Wedding Reception (Budget: ₹4,000–₹7,000)**: Contemporary Polki or AD diamond choker set matched with your evening bridal gown or modern lehenga.'
        ]
      },
      {
        h2: 'Why Smart Brides Choose Sri Kannika Bangles Bangalore',
        lead: 'Experience artisan-crafted perfection backed by trusted heritage:',
        points: [
          '**35+ Years Bangalore Showroom Legacy**: Physical showroom in Malleshwaram 9th Cross where you can test pieces in person.',
          '**Pure 24K Micro-Gold Electroplate**: Skin-safe jeweler’s brass with protective anti-tarnish barrier coating.',
          '**Insured Express Doorstep Delivery**: 24–48 hour delivery across all Bangalore pin codes in tamper-proof packaging.'
        ]
      }
    ]
  }
];

function buildBlogPage(b) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": b.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kannikabangles.com/blog/${b.slug}`
    },
    "headline": b.title,
    "description": b.metaDesc,
    "image": `https://kannikabangles.com${b.heroImage}`,
    "author": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kannikabangles.com/images/kannika_logo.jpeg"
      }
    },
    "datePublished": b.date,
    "dateModified": b.date
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://kannikabangles.com/blog" },
      { "@type": "ListItem", "position": 3, "name": b.title, "item": `https://kannikabangles.com/blog/${b.slug}` }
    ]
  };

  const sectionsHtml = b.sections.map(s => {
    const pointsHtml = s.points.map(p => `        <li style="margin-bottom:12px; line-height:1.7;">${p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</li>`).join('\n');
    return `      <!-- Section -->
      <section style="margin-bottom: 40px;">
        <h2 style="font-family:'Cinzel',serif; color:#8B1E3F; font-size:1.5rem; margin-top:36px; margin-bottom:14px; font-weight:700; border-bottom:2px solid rgba(212,175,55,0.3); padding-bottom:8px;">${s.h2}</h2>
        <p style="font-size:1.05rem; line-height:1.75; color:var(--text-secondary); margin-bottom:18px;">${s.lead}</p>
        <ul style="padding-left:22px; color:var(--text-primary); font-size:1rem; margin-bottom:24px;">
${pointsHtml}
        </ul>
      </section>`;
  }).join('\n');

  const faqItemsHtml = b.faq.map(f => `        <div class="blog-faq-item" style="padding:18px 0; border-bottom:1px solid rgba(0,0,0,0.08);">
          <h3 style="font-family:'Cinzel',serif; font-size:1.1rem; color:var(--text-primary); margin-bottom:8px; font-weight:700;">${f.q}</h3>
          <p style="font-size:0.95rem; line-height:1.7; color:var(--text-secondary); margin:0;">${f.a}</p>
        </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${b.title} | Sri Kannika Bangles</title>
  <meta name="description" content="${b.metaDesc}">
  <meta name="keywords" content="${b.keywords}">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/blog/${b.slug}">

  <!-- Open Graph -->
  <meta property="og:title" content="${b.title} | Sri Kannika Bangles">
  <meta property="og:description" content="${b.metaDesc}">
  <meta property="og:image" content="https://kannikabangles.com${b.heroImage}">
  <meta property="og:url" content="https://kannikabangles.com/blog/${b.slug}">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="article">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${b.title}">
  <meta name="twitter:description" content="${b.metaDesc}">
  <meta name="twitter:image" content="https://kannikabangles.com${b.heroImage}">

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

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
  </script>
</head>
<body class="blog-post-page">

${universalHeader}

  <!-- Page Hero Header -->
  <header class="page-hero" style="background: linear-gradient(135deg, rgba(42,18,28,0.92), rgba(20,10,15,0.96)), url('${b.heroImage}') center/cover no-repeat; padding: 44px 20px 40px; text-align: center; color: white;">
    <div class="container" style="max-width: 880px;">
      <div class="page-hero__breadcrumb" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; color:#FFE28A; margin-bottom:14px;">
        <a href="/" style="color:inherit; text-decoration:none;">Home</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <a href="/blog" style="color:inherit; text-decoration:none;">Blog</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <span>${b.tag}</span>
      </div>
      <h1 style="font-family:'Cinzel',serif; font-size:clamp(1.7rem, 3.2vw, 2.5rem); font-weight:700; color:#fff; line-height:1.25; margin-bottom:14px;">
        ${b.title}
      </h1>
      <div style="display:flex; justify-content:center; align-items:center; gap:16px; font-size:0.85rem; color:rgba(255,255,255,0.8);">
        <span><i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> September 2026</span>
        <span>•</span>
        <span><i data-lucide="clock" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> ${b.readTime}</span>
        <span>•</span>
        <span><i data-lucide="tag" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> ${b.tag}</span>
      </div>
    </div>
  </header>

  <!-- Main Article Body -->
  <main class="section" style="padding: 48px 0; background: #FFFDFB;">
    <div class="container" style="max-width: 840px;">

      <img src="${b.heroImage}" alt="${b.title}" style="width:100%; max-height:420px; object-fit:cover; border-radius:16px; margin-bottom:36px; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

      <div style="background:#FFF9F5; border-left:4px solid #D4AF37; padding:20px 24px; border-radius:0 12px 12px 0; margin-bottom:36px;">
        <span style="font-size:0.8rem; font-weight:700; color:#8B6914; text-transform:uppercase; letter-spacing:0.08em;">Quick Summary</span>
        <p style="font-size:1.05rem; line-height:1.75; color:var(--text-primary); margin:6px 0 0; font-style:italic;">
          ${b.metaDesc}
        </p>
      </div>

${sectionsHtml}

      <!-- Interactive WhatsApp Assistance Card -->
      <div style="background:linear-gradient(135deg, #2C1820 0%, #170E13 100%); color:#fff; border:1.5px solid #D4AF37; border-radius:18px; padding:32px; margin:45px 0; text-align:center;">
        <h3 style="font-family:'Cinzel',serif; font-size:1.5rem; color:#FFE28A; margin-bottom:10px;">Need Personalized Bridal Styling Advice?</h3>
        <p style="font-size:0.95rem; color:rgba(255,255,255,0.85); max-width:600px; margin:0 auto 20px; line-height:1.7;">
          Chat directly with our senior showroom stylists in Malleshwaram. Send your saree or lehenga photos on WhatsApp for instant bangle stack and necklace coordination.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20reading%20your%20article%20on%20${encodeURIComponent(b.title)}%20and%20need%20styling%20advice" target="_blank" rel="noopener" class="btn btn--primary btn--lg">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:8px;"></i> Connect with a Stylist on WhatsApp
        </a>
      </div>

      <!-- FAQ Section -->
      <section style="margin-top: 50px;">
        <h2 style="font-family:'Cinzel',serif; color:#8B1E3F; font-size:1.6rem; margin-bottom:20px; text-align:center;">Frequently Asked Questions</h2>
        <div style="background:#fff; border:1px solid rgba(212,175,55,0.25); border-radius:14px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.04);">
${faqItemsHtml}
        </div>
      </section>

    </div>
  </main>

${getContactSection(b.title, b.slug)}

${commonFooter}

  <!-- Scripts -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>
  <script src="/js/auth.js?v=20260916_201"></script>
  <script src="/js/main.js?v=12"></script>
</body>
</html>`;
}

newBlogs.forEach(b => {
  const filePath = path.join(__dirname, '../blog', `${b.slug}.html`);
  const html = buildBlogPage(b);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Built new blog page: blog/${b.slug}.html`);
});

console.log('\n--- 3. Building 3 NEW High-Intent Category SEO Landing Pages ---');

// ─── 4. Category Landing Pages Generator ───
const newCategories = [
  {
    slug: 'cz-and-ad-diamond-jewellery-bangalore',
    title: 'American Diamond & CZ Jewellery in Bangalore | Kannika Bangles',
    metaDesc: 'Discover high-sparkle American Diamond (AD) & Cubic Zirconia (CZ) bridal jewellery in Bangalore. Handcrafted choker sets, cocktail earrings & tennis bangles.',
    keywords: 'cz diamond jewellery bangalore, ad stone jewellery bangalore, american diamond bridal sets bangalore, cocktail diamond chokers, reception diamond jewellery bangalore',
    heroSubtitle: 'High-Sparkle Cubic Zirconia & American Diamond Suites for Cocktail Evenings & Modern Receptions',
    products: [
      { name: 'Solitaire AD Choker Set with Studs', price: '₹3,899', orig: '₹4,999', img: '/images/earrings/IMG-20260720-WA0017.jpg', cat: 'CZ Diamonds' },
      { name: 'Antique AD Jhumka Pair', price: '₹2,450', orig: '₹3,200', img: '/images/earrings/IMG-20260720-WA0023.jpg', cat: 'AD Jhumkas' },
      { name: 'Bridal Pearl & AD Drop Earring', price: '₹2,250', orig: '₹2,900', img: '/images/earrings/IMG-20260720-WA0026.jpg', cat: 'Cocktail Glamour' },
      { name: 'Contemporary AD Stone Pendant Set', price: '₹1,750', orig: '₹2,299', img: '/images/pendant-sets/IMG-20260821-WA0011.jpg', cat: 'Pendant Sets' }
    ],
    points: [
      '**AAA Precision-Cut Cubic Zirconia**: Maximum refractive brilliance replicating D-color real solitaires without astronomical diamond markups.',
      '**Two-Tone Micro Gold & Rhodium Finish**: Electro-plated over skin-safe jeweler’s brass with protective anti-tarnish micro sealing.',
      '**Prong Set Security**: Stones are securely hand-clamped in solid metal prongs rather than weak adhesive glue for lifetime stability.',
      '**Lightweight Stage Comfort**: Engineered with hollowed weight relief behind stones to prevent heavy earlobe dragging during long reception parties.'
    ]
  },
  {
    slug: 'kundan-and-jadau-jewellery-bangalore',
    title: 'Kundan & Jadau Jewellery in Bangalore | Royal Bridal Sets Kannika',
    metaDesc: 'Explore royal Kundan and Jadau bridal jewellery in Bangalore. Handcrafted Meenakari chokers, Jadau kadas, and Polki bridal suites from our Malleshwaram showroom.',
    keywords: 'kundan jewellery bangalore, jadau jewellery showroom bangalore, royal kundan choker sets bangalore, traditional jadau bangles, polki bridal suites bangalore',
    heroSubtitle: 'Regal Rajasthan-South Indian Fusion Metalcraft Featuring Uncut Polki Glass & Hand-Carved Meenakari Enamel',
    products: [
      { name: 'Kundan Jadau Bangle Stack (Set of 4)', price: '₹2,200', orig: '₹2,900', img: '/images/bangles/IMG-20260805-WA0007.jpg', cat: 'Jadau Kadas' },
      { name: 'Royal Heritage Choker Set with Dori', price: '₹4,999', orig: '₹6,500', img: '/images/necklaces/IMG-20260717-WA0002.jpg', cat: 'Bridal Chokers' },
      { name: 'Heavy Jadau Kada Pair with Screw Clasp', price: '₹2,850', orig: '₹3,800', img: '/images/bangles/IMG-20260805-WA0011.jpg', cat: 'Antique Kadas' },
      { name: 'Heritage Kundan Locket Set', price: '₹1,899', orig: '₹2,499', img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', cat: 'Pendant Sets' }
    ],
    points: [
      '**Traditional Foiled Polki Setting**: Authentic foil backed uncut glass stones providing warm, soft bridal glow under mandap chandeliers.',
      '**Exquisite Meenakari Reverse Enameling**: Intricate floral artwork on the reverse side protecting bridal skin while adding authentic royal craftsmanship.',
      '**Adjustable Silk Zari Dori Ties**: Hand-woven silk cords with sliding bead clasps ensuring customizable choker tightness for all neck sizes.',
      '**24K Micro Gold Plated Brass**: Sealed against oxidation, humidity, and perfume mist for multi-generational bridal trousseau longevity.'
    ]
  },
  {
    slug: 'antique-matte-finish-jewellery-bangalore',
    title: 'Antique Matte Finish Jewellery in Bangalore | 1 Gram Gold Kannika',
    metaDesc: 'Shop authentic antique matte finish jewellery in Bangalore. Handcrafted 1 gram micro gold temple harams, Nakshi kadas & Kemp ruby sets with express delivery.',
    keywords: 'antique matte finish jewellery bangalore, 1 gram gold antique jewellery bangalore, matte finish temple jewellery, antique bridal jewellery malleshwaram',
    heroSubtitle: 'Deep Non-Glossy Heritage Gold Patinas Sculpted with Mythological Nakshi Temple Carvings & Kemp Ruby Accents',
    products: [
      { name: 'Artisan Temple Nakshi Kada', price: '₹1,850', orig: '₹2,400', img: '/images/bangles/IMG-20260805-WA0010.jpg', cat: 'Temple Jewellery' },
      { name: 'Kundan Nakshi Bridal Haram', price: '₹5,499', orig: '₹7,200', img: '/images/necklaces/IMG-20260717-WA0004.jpg', cat: 'Temple Harams' },
      { name: 'Traditional Gold Kada with Screw Clasp', price: '₹1,430', orig: '₹1,950', img: '/images/bangles/IMG-20260805-WA0014.jpg', cat: 'Bridal Bangles' },
      { name: 'South Indian Temple Choker', price: '₹3,899', orig: '₹4,999', img: '/images/necklaces/IMG-20260717-WA0008.jpg', cat: 'Nakshi Chokers' }
    ],
    points: [
      '**Non-Reflective Matte Finish**: Flawlessly matches heavy pure Kanjivaram zari without creating harsh reflective flare in professional wedding cameras.',
      '**Solid Weight Casting**: Core brass castings deliver realistic heft and authentic tactile feel indistinguishable from solid 22K ancestral gold.',
      '**Auspicious Kemp Ruby Insets**: Deep crimson and emerald stones nestled into temple figurines of Gajalakshmi, sacred peacocks, and mango buds.',
      '**Bangalore Showroom Assurance**: 35+ years of trust from our flagship Malleshwaram store with guaranteed same-day dispatch.'
    ]
  }
];

function buildCategoryPage(cat) {
  const cardsHtml = cat.products.map(p => `        <div class="card product-card">
          <div class="card__image">
            <span class="product-card__badge"><span class="badge badge--featured">★ Bestseller</span></span>
            <img src="${p.img}" alt="${p.name} - Sri Kannika Bangles Bangalore" loading="lazy">
          </div>
          <div class="card__body">
            <span class="card__category">${p.cat.toUpperCase()}</span>
            <h3 class="card__title">${p.name}</h3>
            <div class="card__price">
              <span>${p.price}</span>
              <span class="original" style="font-size:0.85rem; color:var(--text-muted); text-decoration:line-through; margin-left:8px;">${p.orig}</span>
            </div>
            <div style="margin-top:14px; display:flex; gap:8px;">
              <a href="/shop" class="btn btn--primary btn--sm" style="flex:1; justify-content:center;">View in Shop</a>
              <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener" class="btn btn--outline btn--sm" style="padding:8px;" aria-label="WhatsApp Inquiry"><i data-lucide="message-circle" style="width:16px;height:16px;"></i></a>
            </div>
          </div>
        </div>`).join('\n');

  const pointsHtml = cat.points.map(pt => `          <li style="margin-bottom:12px; line-height:1.7;">${pt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</li>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.title}</title>
  <meta name="description" content="${cat.metaDesc}">
  <meta name="keywords" content="${cat.keywords}">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/${cat.slug}">

  <!-- Open Graph -->
  <meta property="og:title" content="${cat.title}">
  <meta property="og:description" content="${cat.metaDesc}">
  <meta property="og:image" content="https://kannikabangles.com${cat.products[0].img}">
  <meta property="og:url" content="https://kannikabangles.com/${cat.slug}">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css?v=20260916_202">
  <link rel="stylesheet" href="/css/home.css?v=20260916_202">
  <link rel="stylesheet" href="/css/mobile.css?v=20260916_202">
  <link rel="stylesheet" href="/css/pages.css?v=20260916_202">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
      { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://kannikabangles.com/shop" },
      { "@type": "ListItem", "position": 3, "name": "${cat.title.split('|')[0].trim()}", "item": "https://kannikabangles.com/${cat.slug}" }
    ]
  }
  </script>
</head>
<body class="category-seo-page">

${universalHeader}

  <!-- Page Hero Header -->
  <header class="page-hero" style="background: linear-gradient(135deg, rgba(42,18,28,0.92), rgba(20,10,15,0.96)), url('/images/hero-banner.png') center/cover no-repeat; padding: 44px 20px 40px; text-align: center; color: white;">
    <div class="container" style="max-width: 900px;">
      <div class="page-hero__breadcrumb" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; color:#FFE28A; margin-bottom:14px;">
        <a href="/" style="color:inherit; text-decoration:none;">Home</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <a href="/shop" style="color:inherit; text-decoration:none;">Jewellery</a>
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        <span>${cat.title.split('|')[0].trim()}</span>
      </div>
      <h1 style="font-family:'Cinzel',serif; font-size:clamp(1.8rem, 3.5vw, 2.7rem); font-weight:700; color:#fff; line-height:1.25; margin-bottom:14px;">
        ${cat.title.split('|')[0].trim()}
      </h1>
      <p style="font-size:1.05rem; line-height:1.7; color:rgba(255,255,255,0.88); max-width:740px; margin:0 auto 24px;">
        ${cat.heroSubtitle}
      </p>
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
        <a href="/shop" class="btn btn--primary btn--lg">Explore Full Collection</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20${encodeURIComponent(cat.title.split('|')[0].trim())}" target="_blank" rel="noopener" class="btn btn--outline btn--lg">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:8px;"></i> WhatsApp Styling Styling
        </a>
      </div>
    </div>
  </header>

  <!-- Featured Curated Grid -->
  <section class="section" style="padding: 50px 0; background: var(--bg-secondary, #FCF9F5);">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: 36px;">
        <span class="section-subtitle">Curated Showcase</span>
        <h2 class="section-title">Signature Pieces in <span class="text-gold">Bangalore</span></h2>
        <div class="divider"></div>
        <p style="max-width:680px; margin:10px auto 0; font-size:0.95rem; color:var(--text-secondary);">
          Available for express 24–48 hr doorstep courier dispatch across all Bangalore localities or physical pickup in Malleshwaram.
        </p>
      </div>

      <div class="product-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:24px;">
${cardsHtml}
      </div>

      <div style="text-align:center; margin-top:36px;">
        <a href="/shop" class="btn btn--outline btn--lg">View Complete 48-Piece Catalog <i data-lucide="arrow-right" style="width:18px;height:18px;margin-left:6px;vertical-align:middle;"></i></a>
      </div>
    </div>
  </section>

  <!-- Editorial Specifications & Readability Points -->
  <section class="section" style="padding: 60px 0; background: #fff;">
    <div class="container" style="max-width: 880px;">
      <div class="text-center" style="margin-bottom: 32px;">
        <h2 style="font-family:'Cinzel',serif; font-size:1.8rem; color:#8B1E3F;">Artisanal Highlights &amp; Craftsmanship</h2>
        <p style="color:var(--text-secondary); font-size:0.95rem; margin-top:6px;">Why Bangalore brides trust Sri Kannika Bangles for premium ceremonial ornaments:</p>
      </div>

      <div style="background:#FFFDF9; border:1.5px solid rgba(212,175,55,0.35); border-radius:18px; padding:32px; box-shadow:0 6px 24px rgba(0,0,0,0.04);">
        <ul style="padding-left:22px; color:var(--text-primary); font-size:1rem; margin:0;">
${pointsHtml}
        </ul>
      </div>

      <!-- 3-Box Quality Badges -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px; margin-top:40px;">
        <div style="text-align:center; padding:20px; background:#FAF7F2; border-radius:12px; border:1px solid rgba(212,175,55,0.2);">
          <i data-lucide="shield-check" style="width:32px;height:32px;color:#D4AF37;margin-bottom:8px;"></i>
          <h4 style="font-family:'Cinzel',serif; font-size:1.05rem; margin-bottom:4px;">100% Skin Safe</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Zero nickel, zero lead, hypoallergenic</p>
        </div>
        <div style="text-align:center; padding:20px; background:#FAF7F2; border-radius:12px; border:1px solid rgba(212,175,55,0.2);">
          <i data-lucide="truck" style="width:32px;height:32px;color:#D4AF37;margin-bottom:8px;"></i>
          <h4 style="font-family:'Cinzel',serif; font-size:1.05rem; margin-bottom:4px;">24–48 Hr Express</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Insured Bangalore doorstep courier</p>
        </div>
        <div style="text-align:center; padding:20px; background:#FAF7F2; border-radius:12px; border:1px solid rgba(212,175,55,0.2);">
          <i data-lucide="refresh-cw" style="width:32px;height:32px;color:#D4AF37;margin-bottom:8px;"></i>
          <h4 style="font-family:'Cinzel',serif; font-size:1.05rem; margin-bottom:4px;">Easy Sizing Swap</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Hassle-free 48-hr size adjustments</p>
        </div>
      </div>
    </div>
  </section>

${getContactSection(cat.title.split('|')[0].trim(), cat.slug)}

${commonFooter}

  <!-- Scripts -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>
  <script src="/js/auth.js?v=20260916_201"></script>
  <script src="/js/main.js?v=12"></script>
</body>
</html>`;
}

newCategories.forEach(c => {
  const filePath = path.join(__dirname, '..', `${c.slug}.html`);
  const html = buildCategoryPage(c);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Built new category page: ${c.slug}.html`);
});

// ─── 5. Update blog.html Grid ───
console.log('\n--- 4. Updating blog.html with all 4 new blog cards ---');
const blogHtmlPath = path.join(__dirname, '../blog.html');
if (fs.existsSync(blogHtmlPath)) {
  let blogContent = fs.readFileSync(blogHtmlPath, 'utf8');

  // Build the 4 new blog cards
  const newCardsHtml = newBlogs.map(b => `        <!-- Post: ${b.title} -->
        <a href="/blog/${b.slug}" class="blog-card">
          <img src="${b.heroImage}" alt="${b.title}" class="blog-card__img" loading="lazy">
          <div class="blog-card__body">
            <span class="blog-card__tag">${b.tag}</span>
            <h2 class="blog-card__title">${b.title}</h2>
            <p class="blog-card__desc">${b.metaDesc}</p>
            <span class="blog-card__link">Read Full Guide <i data-lucide="arrow-right" style="width:16px;height:16px;"></i></span>
          </div>
        </a>`).join('\n\n');

  // Insert before the first blog card in .blog-grid
  if (!blogContent.includes(newBlogs[0].slug)) {
    blogContent = blogContent.replace('<div class="blog-grid">', `<div class="blog-grid">\n\n${newCardsHtml}`);
    fs.writeFileSync(blogHtmlPath, blogContent, 'utf8');
    console.log('✓ Injected 4 new blog cards into blog.html');
  } else {
    console.log('• blog.html already contains new blog cards.');
  }
}

// ─── 6. Update sitemap.xml ───
console.log('\n--- 5. Updating sitemap.xml with 7 new URLs ---');
const sitemapPath = path.join(__dirname, '../sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const allNewUrls = [
    ...newBlogs.map(b => `https://kannikabangles.com/blog/${b.slug}`),
    ...newCategories.map(c => `https://kannikabangles.com/${c.slug}`)
  ];

  let added = 0;
  for (const url of allNewUrls) {
    if (!sitemap.includes(url)) {
      const entry = `  <url>
    <loc>${url}</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
      sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
      added++;
    }
  }
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`✓ Added ${added} new URLs to sitemap.xml`);
}

console.log('\n🎉 SEO EXPANSION & CONTENT READABILITY EXECUTION COMPLETED SUCCESSFULLY!');
