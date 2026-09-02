const fs = require('fs');
const path = require('path');

const standardFooter = `  <!-- ═══════════════════════════════════════════════════
       FOOTER
       ═══════════════════════════════════════════════════ -->
  <footer class="footer">
    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__brand-name"><span>Kannika</span> Bangles</div>
        <p class="footer__desc">Turning every bride's dream into a beautiful reality. Handcrafted bangles blending tradition with modern style since generations.</p>
        <div class="footer__social" style="margin-top: 16px;">
          <a href="https://www.instagram.com/kannikabangles" target="_blank" rel="noopener" class="footer__social-link" aria-label="Instagram"><i data-lucide="instagram" style="width:18px;height:18px;"></i></a>
          <a href="https://www.facebook.com/kannikabangles" target="_blank" rel="noopener" class="footer__social-link" aria-label="Facebook"><i data-lucide="facebook" style="width:18px;height:18px;"></i></a>
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
  </footer>`;

function updateFooterInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace any existing <footer ... </footer> with standardFooter
  const footerRegex = /<!--\s*───\s*Footer\s*───\s*-->[\s\S]*?<\/footer>|<!--\s*═+\s*FOOTER\s*═+\s*-->[\s\S]*?<\/footer>|<footer class="footer">[\s\S]*?<\/footer>/i;
  
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, standardFooter);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Standardized footer in: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        walkDir(fullPath);
      }
    } else if (item.endsWith('.html')) {
      updateFooterInFile(fullPath);
    }
  }
}

const rootDir = path.join(__dirname, '..');
walkDir(rootDir);
console.log('✅ Footer standardization completed across all HTML pages!');
