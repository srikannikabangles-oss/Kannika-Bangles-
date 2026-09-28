const fs = require('fs');
const path = require('path');

console.log('Starting comprehensive internal linking...');

// 1. Target files to update navigation
const filesToUpdate = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// The updated Jewellery dropdown items to inject if not already present
const jewelleryExtraLinks = `            <li><a href="/wedding-glass-bangle-stacks" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="layers"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Glass Bangle Stacks</span></span></a></li>
            <li><a href="/wedding-return-gifts-bangles-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gift"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Wedding Return Gifts</span></span></a></li>`;

// The updated Bridal dropdown items to inject
const bridalExtraLinks = `            <li><a href="/south-indian-bridal-jewellery-set" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Complete Bridal Sets</span></span></a></li>
            <li><a href="/temple-vaddanam-kamarbandh" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="shield"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Vaddanam (Waist Belt)</span></span></a></li>
            <li><a href="/bridal-matha-patti-maang-tikka" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Matha Patti &amp; Maang Tikka</span></span></a></li>
            <li><a href="/antique-vanki-baajuband" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="award"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Vanki &amp; Bajuband</span></span></a></li>`;

const sizeGuideNavLink = `<li role="none"><a href="/bangle-size-chart-calculator" class="navbar__link" role="menuitem"><span class="navbar__link-text">Size Guide</span></a></li>`;

// Process navigation in index.html and other relevant pages
let indexHtml = fs.readFileSync('index.html', 'utf8');

// A. Insert in Jewellery Dropdown in index.html (right after bangles)
if (!indexHtml.includes('/wedding-glass-bangle-stacks')) {
  indexHtml = indexHtml.replace(
    /<li><a href="\/bangles" class="navbar__dropdown-link">[\s\S]*?<\/a><\/li>/,
    `$&
${jewelleryExtraLinks}`
  );
}

// B. Insert in Bridal Dropdown in index.html (right after bridal-jewellery-bangalore)
if (!indexHtml.includes('/temple-vaddanam-kamarbandh')) {
  indexHtml = indexHtml.replace(
    /<li><a href="\/bridal-jewellery-bangalore" class="navbar__dropdown-link">[\s\S]*?<\/a><\/li>/,
    `$&
${bridalExtraLinks}`
  );
}

// C. Insert Size Guide link in top navbar of index.html (right before blog link)
if (!indexHtml.includes('href="/bangle-size-chart-calculator" class="navbar__link"')) {
  indexHtml = indexHtml.replace(
    /<li role="none"><a href="\/blog" class="navbar__link"/,
    `${sizeGuideNavLink}
        <li role="none"><a href="/blog" class="navbar__link"`
  );
}

// D. Update 7-Piece Bridal Checklist in index.html with direct links
// Card 1: Bangle Stack -> add link to glass bangle stacks & size chart
indexHtml = indexHtml.replace(
  /<h3 class="checklist-card__title">1\. Bridal Bangle Stack<\/h3>\s*<\/div>\s*<p class="checklist-card__desc">([\s\S]*?)<\/p>/,
  `<h3 class="checklist-card__title"><a href="/wedding-glass-bangle-stacks" style="color: inherit; text-decoration: none;">1. Bridal Bangle Stack</a></h3>
          </div>
          <p class="checklist-card__desc">$1</p>
          <div style="margin-top: 10px; font-size: 0.85rem; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="/wedding-glass-bangle-stacks" style="color: #b38728; font-weight: 600; text-decoration: underline;">View Glass Bangle Stacks &rarr;</a>
            <a href="/bangle-size-chart-calculator" style="color: #665235; font-weight: 500; text-decoration: underline;">Wrist Size Calculator &rarr;</a>
          </div>`
);

// Card 5: Vanki -> link to /antique-vanki-baajuband
indexHtml = indexHtml.replace(
  /<h3 class="checklist-card__title">5\. Handcrafted Vanki<\/h3>\s*<\/div>\s*<p class="checklist-card__desc">([\s\S]*?)<\/p>/,
  `<h3 class="checklist-card__title"><a href="/antique-vanki-baajuband" style="color: inherit; text-decoration: none;">5. Handcrafted Vanki (Bajuband)</a></h3>
          </div>
          <p class="checklist-card__desc">$1</p>
          <div style="margin-top: 10px; font-size: 0.85rem;">
            <a href="/antique-vanki-baajuband" style="color: #b38728; font-weight: 600; text-decoration: underline;">Explore Antique Vanki Designs &rarr;</a>
          </div>`
);

// Card 6: Oddiyanam / Vaddanam -> link to /temple-vaddanam-kamarbandh
indexHtml = indexHtml.replace(
  /<h3 class="checklist-card__title">6\. Sculpted Oddiyanam<\/h3>\s*<\/div>\s*<p class="checklist-card__desc">([\s\S]*?)<\/p>/,
  `<h3 class="checklist-card__title"><a href="/temple-vaddanam-kamarbandh" style="color: inherit; text-decoration: none;">6. Sculpted Vaddanam (Waist Belt)</a></h3>
          </div>
          <p class="checklist-card__desc">$1</p>
          <div style="margin-top: 10px; font-size: 0.85rem;">
            <a href="/temple-vaddanam-kamarbandh" style="color: #b38728; font-weight: 600; text-decoration: underline;">Explore Temple Vaddanam Belts &rarr;</a>
          </div>`
);

// Card 7: Maang Tikka -> link to /bridal-matha-patti-maang-tikka
indexHtml = indexHtml.replace(
  /<h3 class="checklist-card__title">7\. Maang Tikka &amp; Nethichutti<\/h3>\s*<\/div>\s*<p class="checklist-card__desc">([\s\S]*?)<\/p>/,
  `<h3 class="checklist-card__title"><a href="/bridal-matha-patti-maang-tikka" style="color: inherit; text-decoration: none;">7. Matha Patti &amp; Maang Tikka</a></h3>
          </div>
          <p class="checklist-card__desc">$1</p>
          <div style="margin-top: 10px; font-size: 0.85rem;">
            <a href="/bridal-matha-patti-maang-tikka" style="color: #b38728; font-weight: 600; text-decoration: underline;">Explore Matha Patti &amp; Nethi Chutti &rarr;</a>
          </div>`
);

// Add banner after the checklist cards inside Section 5.2
const bridalChecklistBanner = `
      <!-- Specialized Bridal Ornaments & Bulk Return Gifts Quick Banner -->
      <div style="margin-top: 40px; background: linear-gradient(135deg, #fdfbf7 0%, #f7f1e5 100%); border: 1px solid #d4af37; border-radius: 12px; padding: 24px 30px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;">
        <div style="max-width: 600px;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #2e2216; margin-bottom: 6px;">Complete South Indian Bridal Jewellery Set (7-Piece Kalyana Package)</h4>
          <p style="font-size: 0.95rem; color: #665235; margin: 0; line-height: 1.5;">Get your entire bridal ensemble matched flawlessly with 1-Gram gold polish, zero blind advance, and 4K WhatsApp video preview.</p>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="/south-indian-bridal-jewellery-set" class="btn btn--primary" style="padding: 10px 22px; font-size: 0.9rem;">View Complete Sets</a>
          <a href="/wedding-return-gifts-bangles-bangalore" class="btn btn--outline" style="padding: 10px 22px; font-size: 0.9rem; border-color: #b38728; color: #725619;">Wedding Return Gifts</a>
        </div>
      </div>
`;

if (!indexHtml.includes('/south-indian-bridal-jewellery-set') || !indexHtml.includes('Specialized Bridal Ornaments & Bulk Return Gifts Quick Banner')) {
  indexHtml = indexHtml.replace(
    /(<\/div>\s*<\/div>\s*<\/section>\s*<!-- ═══════════════════════════════════════════════════\s*SECTION 5\.3)/,
    `${bridalChecklistBanner}
    $1`
  );
}

// E. Update Footer in index.html
const updatedFooter = `  <footer class="footer">
    <div class="container" style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
      <div class="superpower-trust-strip">
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="shield-check" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Zero Blind Payment</strong>
            <span>Pay ₹0 today online</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="video" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Live Video Call</strong>
            <span>Inspect in 4K before paying</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="camera" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Bridal Saree Match</strong>
            <span>1-on-1 stylist color pairing</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="ruler" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Exact Wrist Sizing</strong>
            <span>Custom fit from 2.2 to 2.10</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="map-pin" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Malleshwaram Store</strong>
            <span>Real Bangalore showroom</span>
          </div>
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
  </footer>`;

indexHtml = indexHtml.replace(/<footer class="footer">[\s\S]*?<\/footer>/, updatedFooter);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✅ Successfully updated index.html navigation, checklist links, banner, and footer!');

// F. Now also update standard footer across other relevant pages
const pagesWithFooter = [
  'shop-template.html',
  'bridal-jewellery-bangalore.html',
  'temple-jewellery-bangalore.html',
  'muhurtham-jewellery-bangalore.html',
  'reception-and-sangeet-jewellery-bangalore.html',
  'haldi-and-mehendi-jewellery-bangalore.html',
  'cz-and-ad-diamond-jewellery-bangalore.html',
  'kundan-and-jadau-jewellery-bangalore.html',
  'antique-matte-finish-jewellery-bangalore.html',
  'bangle-size-chart-calculator.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html',
  'about.html',
  'contact.html',
  'blog.html'
];

for (const p of pagesWithFooter) {
  if (fs.existsSync(p)) {
    let html = fs.readFileSync(p, 'utf8');
    if (html.includes('<footer class="footer">')) {
      html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, updatedFooter);
      fs.writeFileSync(p, html, 'utf8');
      console.log(`Updated footer in ${p}`);
    }
  }
}

// G. In the 7 new pages, add a rich "Explore More Bridal Collections" section right before </footer>
const crossLinkSection = `
  <!-- ═══════════════════════════════════════════════════
       EXPLORE COMPLEMENTARY BRIDAL JEWELLERY & SIZING
       ═══════════════════════════════════════════════════ -->
  <section class="section" style="background: #FAF7F2; padding: 60px 20px; border-top: 1px solid rgba(212,175,55,0.2);">
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
        <a href="/bridal-jewellery-bangalore" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">⚜️</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Bridal Jewellery Hub</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Comprehensive bridal overview across Bangalore localities and ceremonies.</p>
        </a>
      </div>
    </div>
  </section>
`;

const newPageFiles = [
  'bangle-size-chart-calculator.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html'
];

for (const nf of newPageFiles) {
  if (fs.existsSync(nf)) {
    let content = fs.readFileSync(nf, 'utf8');
    if (!content.includes('EXPLORE COMPLEMENTARY BRIDAL JEWELLERY & SIZING')) {
      content = content.replace(
        /(<footer class="footer">)/,
        `${crossLinkSection}
  $1`
      );
      fs.writeFileSync(nf, content, 'utf8');
      console.log(`Added crossLinkSection to ${nf}`);
    }
  }
}

console.log('Linking script finished successfully!');
