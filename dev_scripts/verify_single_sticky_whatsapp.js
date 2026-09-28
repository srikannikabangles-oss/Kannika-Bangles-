const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const mainJs = fs.readFileSync(path.join(__dirname, '../js/main.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, '../css/styles.css'), 'utf8');

console.log('=== SRI KANNIKA BANGLES - SINGLE STICKY WHATSAPP BUTTON AUDIT ===\n');

// 1. Verify CSS rules
console.log('1. Checking CSS rules in css/styles.css:');
const hasBackToTopHidden = stylesCss.includes('.back-to-top {\n  display: none !important;\n}') || stylesCss.includes('.back-to-top {\r\n  display: none !important;\r\n}');
console.log('  - .back-to-top has display: none !important:', hasBackToTopHidden);
if (!hasBackToTopHidden) {
  console.error('FAIL: .back-to-top is not hidden in CSS');
  process.exit(1);
}

const hasFloatingEnquiryInCss = stylesCss.includes('.floating-enquiry-btn');
console.log('  - .floating-enquiry-btn removed from CSS:', !hasFloatingEnquiryInCss);
if (hasFloatingEnquiryInCss) {
  console.error('FAIL: .floating-enquiry-btn still present in CSS');
  process.exit(1);
}

const hasWhatsappFloatCss = stylesCss.includes('.whatsapp-float {');
console.log('  - .whatsapp-float defined in CSS:', hasWhatsappFloatCss);
if (!hasWhatsappFloatCss) {
  console.error('FAIL: .whatsapp-float missing in CSS');
  process.exit(1);
}

// 2. Check HTML pages
const htmlFiles = [
  'index.html',
  'shop-template.html',
  'product-template.html',
  'cart.html',
  'checkout.html',
  'wishlist.html',
  'contact.html',
  'about.html',
  'areas.html',
  '404.html',
  'delivery-policy.html',
  'exchange-policy.html',
  'no-return-policy.html'
];

console.log('\n2. Testing DOM simulation across all pages with js/main.js execution:');
let totalPassed = 0;

for (const file of htmlFiles) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${file}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost:3001/' + file });
  
  // Set up globals
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  global.location = dom.window.location;
  global.localStorage = dom.window.localStorage;
  global.getComputedStyle = dom.window.getComputedStyle;
  global.MutationObserver = dom.window.MutationObserver;
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  global.lucide = { createIcons: () => {} };

  // Run main.js logic
  try {
    eval(mainJs);
    if (typeof initStickyWhatsApp === 'function') initStickyWhatsApp();
    if (typeof initGlobalEnquirySystem === 'function') initGlobalEnquirySystem();
  } catch (err) {
    console.error(`Error executing mainJs in ${file}:`, err.message);
  }

  const waButtons = dom.window.document.querySelectorAll('.whatsapp-float');
  const enqButtons = dom.window.document.querySelectorAll('.floating-enquiry-btn, #floatingEnquiryBtn');
  const stickyAtc = dom.window.document.querySelectorAll('.pd__sticky-atc');
  const backToTop = dom.window.document.querySelectorAll('.back-to-top');

  const waCount = waButtons.length;
  const enqCount = enqButtons.length;
  const atcCount = stickyAtc.length;
  const bttCount = backToTop.length;

  const passed = waCount === 1 && enqCount === 0 && atcCount === 0 && bttCount === 0;

  if (passed) {
    console.log(`  ✓ ${file}: Exactly 1 WhatsApp sticky, 0 enquiry floaters, 0 sticky ATC, 0 back-to-top`);
    totalPassed++;
  } else {
    console.error(`  ✗ ${file}: FAILED! WA=${waCount}, Enq=${enqCount}, ATC=${atcCount}, BTT=${bttCount}`);
    process.exit(1);
  }
}

console.log(`\n🎉 SUCCESS: All ${totalPassed}/${htmlFiles.length} pages strictly enforce ONLY ONE sticky WhatsApp button!`);
