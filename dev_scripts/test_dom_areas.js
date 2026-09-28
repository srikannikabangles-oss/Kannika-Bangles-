const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const areas = [
  { slug: 'malleshwaram', theme: 'template-flagship-sanctuary', customText: 'Visit Us in Malleshwaram' },
  { slug: 'jayanagar', theme: 'template-bridal-lookbook', customText: 'Jayanagar Saree Palette Matching Matrix' },
  { slug: 'commercial-street', theme: 'template-glamour-boutique', customText: 'The Kannika Direct Artisan Advantage' },
  { slug: 'chickpet', theme: 'template-artisan-workshop', customText: 'Artisanal Specification &amp; Quality Guarantee' },
  { slug: 'indiranagar', theme: 'template-minimalist-luxury', customText: 'Day-to-Evening Transition in Indiranagar' },
  { slug: 'koramangala', theme: 'template-festive-carousel', customText: 'Haldi &amp; Mehendi Care Essentials' },
  { slug: 'rajajinagar', theme: 'template-family-heritage', customText: 'Rajajinagar Express Dispatch Guarantee' },
  { slug: 'whitefield', theme: 'template-virtual-studio', customText: 'Connect with Our Senior Bridal Stylist Styling Call' }
];

let allPassed = true;
for (const a of areas) {
  const html = fs.readFileSync(`areas/${a.slug}.html`, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const bodyHasTheme = doc.body.classList.contains(a.theme);
  const cards = doc.querySelectorAll('.product-card');
  const form = doc.getElementById('areaContactForm');
  const wa = doc.querySelectorAll('.whatsapp-float');
  const nav = doc.getElementById('navbar');
  const hasCustomText = html.includes(a.customText);

  if (!bodyHasTheme) { console.error(`FAIL theme: ${a.slug}`); allPassed = false; }
  if (cards.length !== 4) { console.error(`FAIL cards count: ${a.slug} (${cards.length})`); allPassed = false; }
  if (!form) { console.error(`FAIL form missing: ${a.slug}`); allPassed = false; }
  if (wa.length !== 1) { console.error(`FAIL wa count: ${a.slug} (${wa.length})`); allPassed = false; }
  if (!nav) { console.error(`FAIL nav missing: ${a.slug}`); allPassed = false; }
  if (!hasCustomText) { console.error(`FAIL customText missing: ${a.slug}`); allPassed = false; }

  console.log(`✓ Verified DOM integrity for area: ${a.slug} (Theme: ${a.theme})`);
}

if (allPassed) {
  console.log('\n🎉 ALL 8 DOM STRUCTURES 100% VALIDATED!');
  process.exit(0);
} else {
  process.exit(1);
}
