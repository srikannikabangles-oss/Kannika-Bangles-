const fs = require('fs');
const path = require('path');
const http = require('http');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`✅ PASS: ${message}`);
  } else {
    failed++;
    console.error(`❌ FAIL: ${message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('      COMPREHENSIVE AUDIT & VALIDATION SUITE');
console.log('═══════════════════════════════════════════════════════════════\n');

// 1. Collect all HTML files
const htmlFiles = [];
function findHtml(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'brain') {
        findHtml(full);
      }
    } else if (f.endsWith('.html') && !f.includes('admin.html') && !f.includes('google') && !f.includes('500.html')) {
      htmlFiles.push(full);
    }
  }
}
findHtml(path.join(__dirname, '..'));
console.log(`Found ${htmlFiles.length} HTML files across website.`);

// 2. Test Common Header & Contact Forms across all pages
console.log('\n--- 1. Testing Unified Common Header & Universal Contact Forms ---');
let pagesWithHeader = 0;
let pagesWithMarquee = 0;
let pagesWithNavActions = 0;
let pagesWithContactForm = 0;

for (const file of htmlFiles) {
  if (file.includes('seo\\') || file.includes('seo/')) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('class="navbar" id="navbar"')) pagesWithHeader++;
  if (content.includes('class="top-bar"') || content.includes('class="marquee"')) pagesWithMarquee++;
  if (content.includes('class="navbar__actions"') && content.includes('id="wishlistBadge"')) pagesWithNavActions++;
  if (content.includes('class="contact-form"') || content.includes('id="pageContactForm"') || content.includes('id="contactForm"') || content.includes('id="areaContactForm"')) pagesWithContactForm++;
}

assert(pagesWithHeader === 45, `Common navbar present on 100% of public customer-facing pages (${pagesWithHeader}/45)`);
assert(pagesWithMarquee === 0, `Top marquee announcement bar completely removed from 100% of public pages (${pagesWithMarquee}/45 with marquee)`);
assert(pagesWithNavActions === 45, `Wishlist, Account Portal, Cart badges present on 100% of public pages (search removed) (${pagesWithNavActions}/45)`);
assert(pagesWithContactForm === 45, `Luxury consultation & contact form present on 100% of public customer-facing pages (${pagesWithContactForm}/45)`);

// 3. Test 8 Distinct Area Pages
console.log('\n--- 2. Testing 8 Distinct Bangalore Area Pages ---');
const areaFiles = [
  'malleshwaram.html',
  'jayanagar.html',
  'commercial-street.html',
  'chickpet.html',
  'indiranagar.html',
  'koramangala.html',
  'rajajinagar.html',
  'whitefield.html'
];

const templateClasses = new Set();
const heroTitles = new Set();
const productImagesByArea = {};
let allAreaImagesExist = true;
let allHaveContactForm = true;
let allHaveStickyWa = true;

for (const file of areaFiles) {
  const filePath = path.join(__dirname, '../areas', file);
  assert(fs.existsSync(filePath), `Area file exists: ${file}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check template theme class
  const bodyMatch = content.match(/<body class="area-page ([^"]+)">/);
  if (bodyMatch) {
    templateClasses.add(bodyMatch[1]);
  }

  // Check hero title
  const heroMatch = content.match(/<h1 class="page-hero__title">([\s\S]*?)<\/h1>/);
  if (heroMatch) {
    heroTitles.add(heroMatch[1].trim());
  }

  // Check products & images
  const imgMatches = [...content.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
  productImagesByArea[file] = imgMatches;

  for (const img of imgMatches) {
    if (img.startsWith('/images/')) {
      const localPath = path.join(__dirname, '..', img);
      if (!fs.existsSync(localPath)) {
        console.error(`Missing image on disk in ${file}: ${img}`);
        allAreaImagesExist = false;
      }
    }
  }

  // Check contact form
  if (!content.includes('id="areaContactForm"') || !content.includes('class="contact-form"')) {
    allHaveContactForm = false;
    console.error(`Missing contact form in ${file}`);
  }

  // Check sticky whatsapp
  if (!content.includes('class="whatsapp-float"')) {
    allHaveStickyWa = false;
    console.error(`Missing sticky WhatsApp float button in ${file}`);
  }
}

assert(templateClasses.size === 8, `Exactly 8 DISTINCT template layout classes across the 8 areas: [${Array.from(templateClasses).join(', ')}]`);
assert(heroTitles.size === 8, `Exactly 8 DISTINCT hero titles across the 8 areas`);
assert(allAreaImagesExist, `All images referenced across the 8 area pages exist on disk (zero 404s)`);
assert(allHaveContactForm, `All 8 area pages feature an integrated consultation & contact form`);
assert(allHaveStickyWa, `All 8 area pages have the single sticky WhatsApp button`);

// Verify image sets are not identical between any two area pages
let overlappingSets = 0;
const areaKeys = Object.keys(productImagesByArea);
for (let i = 0; i < areaKeys.length; i++) {
  for (let j = i + 1; j < areaKeys.length; j++) {
    const a = productImagesByArea[areaKeys[i]].filter(p => !p.includes('logo') && !p.includes('favicon'));
    const b = productImagesByArea[areaKeys[j]].filter(p => !p.includes('logo') && !p.includes('favicon'));
    const shared = a.filter(img => b.includes(img));
    if (shared.length >= 3) {
      console.warn(`Warning: High image overlap between ${areaKeys[i]} and ${areaKeys[j]}: ${shared.length} shared images`);
      overlappingSets++;
    }
  }
}
assert(overlappingSets === 0, `Zero identical or largely overlapping image sets among the 8 area pages`);

// 4. Test Single Sticky Button site-wide rule
console.log('\n--- 3. Testing Single Sticky WhatsApp Button Site-wide ---');
let pagesWithOnlyOneWa = 0;
let pagesWithSocialCitations = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const waCount = (content.match(/class="whatsapp-float"/g) || []).length;
  if (waCount <= 1) pagesWithOnlyOneWa++;
  if (content.includes('instagram.com') || content.includes('facebook.com')) {
    pagesWithSocialCitations++;
    console.log(`File with social citation: ${file}`);
  }
}
assert(pagesWithOnlyOneWa === htmlFiles.length, `All ${htmlFiles.length} HTML pages have <= 1 static .whatsapp-float button`);
assert(pagesWithSocialCitations === 0, `Zero social citations (Instagram/Facebook) across all HTML files`);

// 5. Test Live HTTP Server
console.log('\n--- 4. Testing Live HTTP Server on 127.0.0.1:3001 ---');
function fetchUrl(pathName) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:3001${pathName}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runHttpTests() {
  const cleanRoutes = [
    '/',
    '/shop',
    '/cart',
    '/checkout',
    '/wishlist',
    '/contact',
    '/about',
    '/blog',
    '/areas',
    '/areas/malleshwaram',
    '/areas/jayanagar',
    '/areas/commercial-street',
    '/areas/chickpet',
    '/areas/indiranagar',
    '/areas/koramangala',
    '/areas/rajajinagar',
    '/areas/whitefield',
    '/blog/best-artificial-jewellery-shops-in-commercial-street-bangalore',
    '/blog/how-to-match-bridal-jewellery-with-kanjivaram-silk-sarees',
    '/blog/temple-jewellery-designs-and-meanings-goddess-lakshmi-peacock-nakshi',
    '/blog/bridal-jewellery-budget-calculator-bangalore-weddings',
    '/cz-and-ad-diamond-jewellery-bangalore',
    '/kundan-and-jadau-jewellery-bangalore',
    '/antique-matte-finish-jewellery-bangalore',
    '/product/6'
  ];

  for (const route of cleanRoutes) {
    try {
      const res = await fetchUrl(route);
      assert(res.status === 200, `HTTP GET ${route} returned 200 OK`);
      assert(res.data.includes('class="navbar"'), `HTTP GET ${route} has unified navbar`);
    } catch (err) {
      assert(false, `HTTP GET ${route} failed with error: ${err.message}`);
    }
  }

  // Also verify that .html routes cleanly 301-redirect to clean URLs for SEO
  const redirectRoutes = ['/cart.html', '/checkout.html', '/wishlist.html', '/contact.html'];
  for (const r of redirectRoutes) {
    const res = await fetchUrl(r);
    assert(res.status === 301, `HTTP GET ${r} returns 301 redirect to clean URL`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`FINAL RESULT: ${passed} PASSED / ${failed} FAILED`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runHttpTests();
