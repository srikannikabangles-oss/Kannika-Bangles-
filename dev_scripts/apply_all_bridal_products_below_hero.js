const fs = require('fs');

console.log('Starting placement of 4 curated products just below hero section on all 12 bridal dropdown pages...');

function generateProductCardsHtml(config) {
  const cardsHtml = config.products.map(p => {
    const discount = Math.round(((p.orig - p.price) / p.orig) * 100);
    return `        <div class="card product-card" style="background: #ffffff; border-radius: 12px; border: 1px solid #ebdccb; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.03); display: flex; flex-direction: column;">
          <div class="card__image" style="position: relative; overflow: hidden; aspect-ratio: 1/1; background: #faf7f2;">
            <span class="product-card__badge" style="position: absolute; top: 10px; left: 10px; z-index: 2;"><span class="badge" style="background: #8B6914; color: #fff; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">${p.badge}</span></span>
            <a href="/product/${p.id}">
              <img src="${p.img}" alt="${p.name} - Sri Kannika Bangles Bangalore" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
            </a>
          </div>
          <div class="card__body" style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
            <span class="card__category" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #b38728; font-weight: 700; margin-bottom: 4px;">${p.cat}</span>
            <h3 class="card__title" style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 8px; line-height: 1.35; flex: 1;"><a href="/product/${p.id}" style="color: inherit; text-decoration: none;">${p.name}</a></h3>
            <div class="card__price" style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px;">
              <span style="font-size: 1.25rem; font-weight: 700; color: #8B6914;">₹${p.price.toLocaleString('en-IN')}</span>
              <span class="original" style="font-size: 0.88rem; color: #998877; text-decoration: line-through;">₹${p.orig.toLocaleString('en-IN')}</span>
              <span style="font-size: 0.75rem; color: #28a745; font-weight: 700;">(${discount}% OFF)</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <a href="/product/${p.id}" class="btn btn--outline btn--sm" style="flex: 1; text-align: center; justify-content: center; font-size: 0.8rem; font-weight: 600; padding: 8px 10px; border-radius: 6px; text-decoration: none;">View Details</a>
              <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener" class="btn btn--primary btn--sm" style="padding: 8px 12px; font-size: 0.85rem;" title="Inquire on WhatsApp" aria-label="Inquire on WhatsApp">
                <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
              </a>
            </div>
          </div>
        </div>`;
  }).join('\n');

  return `  <!-- ═══════════════════════════════════════════════════
       FEATURED 4 BRIDAL PRODUCTS (DIRECTLY BELOW HERO)
       ═══════════════════════════════════════════════════ -->
  <section class="section" id="featuredBridalProducts" style="padding: 50px 20px; background: #faf7f2; border-bottom: 1px solid rgba(212,175,55,0.25);">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 34px;">
        <span style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">${config.subtitle}</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.75rem, 3vw, 2.2rem); color: #2e2216; margin-top: 6px;">${config.title}</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
        <p style="color: #665235; font-size: 0.95rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">
          Handcrafted artisanal masterpieces ready for express 24-48 hr doorstep delivery across Bangalore or private styling at our Malleshwaram showroom.
        </p>
      </div>

      <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
${cardsHtml}
      </div>
      <div style="text-align: center; margin-top: 32px;">
        <a href="/shop" class="btn btn--outline" style="padding: 10px 26px; border-color: #8B6914; color: #5a4527; font-weight: 600; text-decoration: none; font-size: 0.92rem;">Explore All 48 Handcrafted Pieces &rarr;</a>
      </div>
    </div>
  </section>
`;
}

const pageConfigs = {
  'bridal-jewellery-bangalore.html': {
    subtitle: 'Signature Bridal Suites',
    title: 'Featured Bridal Pieces in Bangalore',
    products: [
      { id: 47, name: 'Heritage Lakshmi Temple Haram', cat: 'TEMPLE HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Royal Muhurtham' },
      { id: 33, name: 'Grand Bridal Choker Set', cat: 'BRIDAL CHOKER', price: 4640, orig: 6200, img: '/images/necklaces/IMG-20260717-WA0012.jpg', badge: '★ 1-Gram Gold' },
      { id: 4, name: 'Classic Temple Kada Pair', cat: 'BRIDAL KADA', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Bestseller' },
      { id: 36, name: 'Classic Temple Jhumka with Mattal', cat: 'TEMPLE JHUMKAS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Antique Finish' }
    ]
  },
  'south-indian-bridal-jewellery-set.html': {
    subtitle: '7-Piece Kalyana Package',
    title: 'Featured South Indian Bridal Pieces in Bangalore',
    products: [
      { id: 47, name: 'Heritage Lakshmi Temple Haram', cat: 'TEMPLE HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Layer 2: Haram' },
      { id: 33, name: 'Grand Kemp Ruby Choker', cat: 'BRIDAL CHOKER', price: 4640, orig: 6200, img: '/images/necklaces/IMG-20260717-WA0012.jpg', badge: '★ Layer 1: Choker' },
      { id: 4, name: 'Nakshi Peacock Kada Pair', cat: 'BRIDAL KADAS', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Layer 7: Kadas' },
      { id: 36, name: 'Temple Jhumkas with Hair Mattal', cat: 'BRIDAL JHUMKAS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Layer 3: Jhumkas' }
    ]
  },
  'temple-vaddanam-kamarbandh.html': {
    subtitle: 'Royal Temple Waist & Temple Suites',
    title: 'Featured Temple Ornaments & Waist Sets in Bangalore',
    products: [
      { id: 47, name: 'Gajalakshmi Nakshi Temple Haram', cat: 'TEMPLE HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Temple Nakshi' },
      { id: 4, name: 'Classic Carved Temple Kada', cat: 'TEMPLE KADA', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Antique Finish' },
      { id: 9, name: 'Heritage Kemp Bangle Stack', cat: 'KEMP BANGLES', price: 1700, orig: 2400, img: '/images/bangles/IMG-20260805-WA0015.jpg', badge: '★ Ruby Spinel' },
      { id: 19, name: 'Kundan Temple Pendant Set', cat: 'TEMPLE PENDANT', price: 1620, orig: 2200, img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Goddess Motif' }
    ]
  },
  'bridal-matha-patti-maang-tikka.html': {
    subtitle: 'Forehead Adornments & Earrings',
    title: 'Featured Matha Patti & Forehead Jewellery in Bangalore',
    products: [
      { id: 30, name: 'Ruby Pearl Bridal Tikka', cat: 'MAANG TIKKA', price: 1080, orig: 1500, img: '/images/necklaces/IMG-20260717-WA0003.jpg', badge: '★ Bestseller' },
      { id: 32, name: 'Royal Pearl Hair Passa', cat: 'MATHA PATTI', price: 1680, orig: 2300, img: '/images/necklaces/IMG-20260717-WA0007.jpg', badge: '★ Royal Heritage' },
      { id: 36, name: 'Classic Temple Jhumka with Hair Chain', cat: 'TEMPLE JHUMKAS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Kemp Accents' },
      { id: 34, name: 'Kundan Pearl Bridal Choker Set', cat: 'BRIDAL CHOKER', price: 2360, orig: 3200, img: '/images/necklaces/IMG-20260717-WA0013.jpg', badge: '★ Matching Suite' }
    ]
  },
  'antique-vanki-baajuband.html': {
    subtitle: 'Handcrafted Antique Arm & Wrist Ornaments',
    title: 'Featured Antique Vanki & Bangle Designs in Bangalore',
    products: [
      { id: 1, name: 'Antique Gold Kada Pair', cat: 'ANTIQUE KADA', price: 960, orig: 1400, img: '/images/bangles/IMG-20260805-WA0007.jpg', badge: '★ Bestseller' },
      { id: 4, name: 'Classic Temple Peacock Kada', cat: 'TEMPLE KADA', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ 1-Gram Gold' },
      { id: 6, name: 'Peacock Carved Gold Bangle', cat: 'PEACOCK BANGLE', price: 1120, orig: 1600, img: '/images/bangles/IMG-20260805-WA0012.jpg', badge: '★ Anti-Tarnish' },
      { id: 35, name: 'Floral Pearl Temple Jhumka', cat: 'TEMPLE EARRINGS', price: 760, orig: 1100, img: '/images/earrings/IMG-20260717-WA0006.jpg', badge: '★ Lightweight' }
    ]
  },
  'temple-jewellery-bangalore.html': {
    subtitle: 'Sacred Nakshi Artistry',
    title: 'Curated Temple Ornaments in Bangalore',
    products: [
      { id: 47, name: 'Heritage Lakshmi Temple Haram', cat: 'TEMPLE HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Nakshi Gold' },
      { id: 4, name: 'Classic Temple Kada Pair', cat: 'TEMPLE KADA', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Bestseller' },
      { id: 36, name: 'Classic Temple Jhumka with Mattal', cat: 'TEMPLE JHUMKAS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Kemp Rubies' },
      { id: 19, name: 'Kundan Temple Pendant Set', cat: 'TEMPLE PENDANT', price: 1620, orig: 2200, img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Festive Sacred' }
    ]
  },
  'muhurtham-jewellery-bangalore.html': {
    subtitle: 'Auspicious Ceremony Suites',
    title: 'Featured Muhurtham Jewellery in Bangalore',
    products: [
      { id: 47, name: 'Heritage Lakshmi Temple Haram', cat: 'MUHURTHAM HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Sacred Gold' },
      { id: 1, name: 'Antique Gold Kada Pair', cat: 'BRIDAL KADAS', price: 960, orig: 1400, img: '/images/bangles/IMG-20260805-WA0007.jpg', badge: '★ Bestseller' },
      { id: 35, name: 'Floral Pearl Jhumka with Drops', cat: 'TEMPLE JHUMKAS', price: 760, orig: 1100, img: '/images/earrings/IMG-20260717-WA0006.jpg', badge: '★ Wedding Bell' },
      { id: 19, name: 'Kundan Temple Pendant Set', cat: 'MUHURTHAM PENDANT', price: 1620, orig: 2200, img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Kemp Ruby' }
    ]
  },
  'reception-and-sangeet-jewellery-bangalore.html': {
    subtitle: 'Evening Glamour & Diamond Sparkle',
    title: 'Featured Reception & Sangeet Jewellery in Bangalore',
    products: [
      { id: 33, name: 'Grand Bridal Choker Set', cat: 'COCKTAIL CHOKER', price: 4640, orig: 6200, img: '/images/necklaces/IMG-20260717-WA0012.jpg', badge: '★ High Glamour' },
      { id: 15, name: 'Floral AD Diamond Pendant', cat: 'AD DIAMOND', price: 1380, orig: 1950, img: '/images/pendant-sets/IMG-20260821-WA0005.jpg', badge: '★ Evening Sparkle' },
      { id: 36, name: 'Classic AD Chandelier Earring', cat: 'AD EARRINGS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ Bestseller' },
      { id: 3, name: 'Floral Diamond Bangle Pair', cat: 'DIAMOND BANGLES', price: 1040, orig: 1500, img: '/images/bangles/IMG-20260805-WA0009.jpg', badge: '★ Cocktail Night' }
    ]
  },
  'haldi-and-mehendi-jewellery-bangalore.html': {
    subtitle: 'Vibrant Floral & Gold Hues',
    title: 'Featured Haldi & Mehendi Jewellery in Bangalore',
    products: [
      { id: 15, name: 'Floral AD Pendant Set', cat: 'FLORAL PENDANT', price: 1380, orig: 1950, img: '/images/pendant-sets/IMG-20260821-WA0005.jpg', badge: '★ Haldi Glow' },
      { id: 35, name: 'Floral Pearl Jhumka', cat: 'LIGHTWEIGHT JHUMKAS', price: 760, orig: 1100, img: '/images/earrings/IMG-20260717-WA0006.jpg', badge: '★ Comfortable' },
      { id: 1, name: 'Antique Gold Kada Pair', cat: 'MEHENDI BANGLES', price: 960, orig: 1400, img: '/images/bangles/IMG-20260805-WA0007.jpg', badge: '★ Bestseller' },
      { id: 2, name: 'Ruby Bridal Bangle Set', cat: 'FESTIVE BANGLES', price: 1060, orig: 1500, img: '/images/bangles/IMG-20260805-WA0008.jpg', badge: '★ Ruby Floral' }
    ]
  },
  'cz-and-ad-diamond-jewellery-bangalore.html': {
    subtitle: 'High-Sparkle Cubic Zirconia',
    title: 'Signature AD Diamond Pieces in Bangalore',
    products: [
      { id: 15, name: 'Solitaire AD Pendant Set', cat: 'CZ DIAMONDS', price: 1380, orig: 1950, img: '/images/pendant-sets/IMG-20260821-WA0005.jpg', badge: '★ Bestseller' },
      { id: 36, name: 'Antique AD Jhumka Pair', cat: 'AD JHUMKAS', price: 2620, orig: 3500, img: '/images/earrings/IMG-20260720-WA0017.jpg', badge: '★ 4K Sparkle' },
      { id: 3, name: 'Floral AD Diamond Bangle', cat: 'CZ BANGLES', price: 1040, orig: 1500, img: '/images/bangles/IMG-20260805-WA0009.jpg', badge: '★ High Clarity' },
      { id: 33, name: 'Royal Diamond Choker Suite', cat: 'COCKTAIL SUITE', price: 4640, orig: 6200, img: '/images/necklaces/IMG-20260717-WA0012.jpg', badge: '★ Bridal Diamond' }
    ]
  },
  'kundan-and-jadau-jewellery-bangalore.html': {
    subtitle: 'Imperial Meenakari & Polki',
    title: 'Royal Kundan & Jadau Pieces in Bangalore',
    products: [
      { id: 34, name: 'Kundan Pearl Bridal Choker Set', cat: 'KUNDAN CHOKER', price: 2360, orig: 3200, img: '/images/necklaces/IMG-20260717-WA0013.jpg', badge: '★ Bestseller' },
      { id: 19, name: 'Kundan Temple Pendant Set', cat: 'KUNDAN PENDANT', price: 1620, orig: 2200, img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Polki Glass' },
      { id: 42, name: 'Heritage Jadau Jhumka Pair', cat: 'JADAU JHUMKAS', price: 4760, orig: 6200, img: '/images/earrings/IMG-20260720-WA0027.jpg', badge: '★ Meenakari Work' },
      { id: 9, name: 'Heritage Kemp Bangle Stack', cat: 'JADAU BANGLES', price: 1700, orig: 2400, img: '/images/bangles/IMG-20260805-WA0015.jpg', badge: '★ Royal Antique' }
    ]
  },
  'antique-matte-finish-jewellery-bangalore.html': {
    subtitle: 'Chidambaram Matte 1-Gram Gold',
    title: 'Antique Matte Finish Jewellery in Bangalore',
    products: [
      { id: 47, name: 'Heritage Lakshmi Temple Haram', cat: 'MATTE HARAM', price: 3450, orig: 4800, img: '/images/necklaces/IMG-20260717-WA0004.jpg', badge: '★ Antique Gold' },
      { id: 4, name: 'Classic Temple Kada Pair', cat: 'MATTE KADAS', price: 1050, orig: 1500, img: '/images/bangles/IMG-20260805-WA0010.jpg', badge: '★ Bestseller' },
      { id: 35, name: 'Floral Pearl Temple Jhumka', cat: 'MATTE JHUMKAS', price: 760, orig: 1100, img: '/images/earrings/IMG-20260717-WA0006.jpg', badge: '★ 1-Gram Micro Gold' },
      { id: 19, name: 'Kundan Temple Pendant Set', cat: 'MATTE PENDANT', price: 1620, orig: 2200, img: '/images/pendant-sets/IMG-20260821-WA0009.jpg', badge: '★ Kemp Rubies' }
    ]
  }
};

for (const [filename, config] of Object.entries(pageConfigs)) {
  if (!fs.existsSync(filename)) continue;
  let content = fs.readFileSync(filename, 'utf8');

  // Remove any existing featuredBridalProducts section to avoid duplicate
  content = content.replace(/<!-- ═══════════════════════════════════════════════════\s*FEATURED 4 BRIDAL PRODUCTS[\s\S]*?<\/section>/gi, '');

  const productsHtml = generateProductCardsHtml(config);

  // Find where the hero section ends
  // 1. Look for `</header>` (used in older pages like bridal-jewellery-bangalore)
  // 2. Or look for `</section>` of class category-hero / vaddanam-hero / page-hero
  if (content.includes('</header>')) {
    content = content.replace('</header>', `</header>\n\n${productsHtml}`);
  } else if (content.match(/<\/section>(?=\s*<!-- --- (Quick Feature|Section|Interactive))/i)) {
    content = content.replace(/(<\/section>)(?=\s*<!-- --- (Quick Feature|Section|Interactive))/i, `$1\n\n${productsHtml}`);
  } else {
    // Fallback: after the first section
    content = content.replace(/<\/section>/i, `</section>\n\n${productsHtml}`);
  }

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✅ Placed 4 featured products directly below hero in: ${filename}`);
}

console.log('All 12 bridal dropdown pages updated successfully!');
