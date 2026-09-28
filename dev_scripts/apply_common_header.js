const fs = require('fs');
const path = require('path');

const standardHeader = `  <!-- ─── Navigation ─── -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <!-- Left side: hamburger menu button (Mobile only) -->
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Center / Left: Branding with Logo & Royal Typography -->
      <a href="/" class="navbar__brand navbar__brand--royal" aria-label="Kannika Bangles Home">
        <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="navbar__logo-img">
        <div class="navbar__brand-text">
          <span class="brand-text__title">SRI KANNIKA</span>
          <span class="brand-text__subtitle">BANGLES &amp; JEWELS</span>
        </div>
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
            <li><a href="/bangles" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="circle"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bangles</span></span></a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Necklaces</span></span></a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Pendant Sets</span></span></a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Earrings</span></span></a></li>
            <li><a href="/shop" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="grid"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Jewellery</span></span></a></li>
          </ul>
        </li>

        <!-- Bridal Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span></span></a></li>
            <li><a href="/cz-and-ad-diamond-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">CZ &amp; AD Diamond</span></span></a></li>
            <li><a href="/kundan-and-jadau-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Kundan &amp; Jadau</span></span></a></li>
            <li><a href="/antique-matte-finish-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Matte Finish</span></span></a></li>
          </ul>
        </li>

        <!-- Areas Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/areas" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Areas</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
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

        <!-- About & Contact Combined Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/about" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">About &amp; Contact</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/about" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="info"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">About Us</span></span></a></li>
            <li><a href="/contact" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="phone"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Contact Us</span></span></a></li>
          </ul>
        </li>

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

      <!-- Right side: Actions row (No Search Option) -->
      <div class="navbar__actions">
        <a href="/wishlist" class="navbar__action-btn navbar__wishlist-btn" aria-label="Wishlist" title="Wishlist">
          <i data-lucide="heart" style="width:19px;height:19px;"></i>
          <span class="navbar__wishlist-badge" id="wishlistBadge">0</span>
        </a>
        <div class="navbar__user-menu">
          <a href="/login" class="navbar__auth-btn" id="navbarAuthBtn">Login / Register</a>
        </div>
        <a href="/cart" class="navbar__cart" aria-label="Shopping Bag" title="Bag">
          <i data-lucide="shopping-bag" style="width:19px;height:19px;"></i>
          <span class="navbar__cart-badge">0</span>
        </a>
      </div>
    </div>
  </nav>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip any announcement bar comments and top-bar elements
  content = content.replace(/(?:\s*<!--[^-]*Top Announcement Bar[^-]*-->\s*)+/g, '\n');
  content = content.replace(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>/g, '');

  // Match and replace navbar
  const navRegex = /(?:<!--[^-]*Navigation[^-]*-->\s*)?<nav class="navbar"[\s\S]*?<\/nav>/;

  if (navRegex.test(content)) {
    content = content.replace(navRegex, standardHeader);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated header in ${path.relative(process.cwd(), filePath)}`);
  } else {
    // If navbar is present without top-bar
    const fallbackRegex = /<nav class="navbar"[\s\S]*?<\/nav>/;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, standardHeader);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ (Fallback) Updated header in ${path.relative(process.cwd(), filePath)}`);
    } else {
      console.warn(`⚠ No navbar found in ${path.relative(process.cwd(), filePath)}`);
    }
  }
}

// Find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allHtml = getHtmlFiles(path.join(__dirname, '..'));
console.log(`Found ${allHtml.length} HTML files. Applying standardized universal header...`);
allHtml.forEach(f => processFile(f));
console.log('\n🎉 ALL HEADERS STANDARDIZED SUCCESSFULLY!');
