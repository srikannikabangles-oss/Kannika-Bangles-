const fs = require('fs');
const path = require('path');

// 1. Fix CSS links in all 7 new pages to use /css/styles.css and /css/mobile.css
const newPages = [
  'bangle-size-chart-calculator.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html'
];

newPages.forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace style.css with styles.css and add mobile.css if missing
  if (content.includes('/css/style.css')) {
    content = content.replace(
      /<link rel="stylesheet" href="\/css\/style\.css[^"]*">/g,
      '<link rel="stylesheet" href="/css/styles.css?v=20260929">\n  <link rel="stylesheet" href="/css/mobile.css?v=20260929">'
    );
    console.log('✅ Updated stylesheet links in: ' + filename);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});

// 2. Specific fix for bangle-size-chart-calculator.html layout & double h3
let calcPath = path.join(__dirname, '..', 'bangle-size-chart-calculator.html');
let calcContent = fs.readFileSync(calcPath, 'utf8');

// Replace calc CSS to be fully responsive and rock-solid
const oldCalcCss = `.calc-card {
      background: #ffffff;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      padding: 36px 30px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.06);
      margin-top: -40px;
      position: relative;
      z-index: 10;
    }
    .calc-tabs {
      display: flex;
      gap: 12px;
      border-bottom: 2px solid #f0eae1;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .calc-tab {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: #fdfaf6;
      color: #665235;
      transition: all 0.2s ease;
      font-size: 0.95rem;
    }
    .calc-tab.active {
      background: #8B6914;
      color: #ffffff;
    }
    .calc-result-box {
      background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%);
      border: 2px dashed #d4af37;
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin-top: 24px;
    }
    .size-display-circle {
      width: 120px;
      height: 120px;
      border: 4px solid #8B6914;
      border-radius: 50%;
      margin: 16px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      box-shadow: 0 4px 15px rgba(139, 105, 20, 0.15);
      transition: transform 0.3s ease;
    }
    .bangle-table-wrapper {
      overflow-x: auto;
      margin-top: 24px;
    }
    .bangle-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.95rem;
    }`;

const newCalcCss = `.calc-card {
      background: #ffffff;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      padding: 36px 30px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.06);
      margin-top: -30px;
      position: relative;
      z-index: 10;
    }
    .calc-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      border-bottom: 2px solid #f0eae1;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .calc-tab {
      flex: 1 1 240px;
      padding: 12px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #e2d4c0;
      background: #fdfaf6;
      color: #665235;
      transition: all 0.2s ease;
      font-size: 0.92rem;
      text-align: center;
    }
    .calc-tab.active {
      background: #8B6914;
      color: #ffffff;
      border-color: #8B6914;
    }
    .calc-result-box {
      background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%);
      border: 2px dashed #d4af37;
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin-top: 24px;
    }
    .size-display-circle {
      width: 120px;
      height: 120px;
      border: 4px solid #8B6914;
      border-radius: 50%;
      margin: 16px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      box-shadow: 0 4px 15px rgba(139, 105, 20, 0.15);
      transition: transform 0.3s ease;
    }
    .bangle-table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin-top: 24px;
      border-radius: 12px;
      border: 1px solid #ebdccb;
    }
    .bangle-table {
      width: 100%;
      min-width: 620px;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.95rem;
    }
    @media (max-width: 640px) {
      .calc-card {
        padding: 24px 16px;
        margin-top: -15px;
      }
      .calc-tab {
        flex: 1 1 100%;
        padding: 10px 14px;
        font-size: 0.88rem;
      }
    }`;

if (calcContent.includes(oldCalcCss)) {
  calcContent = calcContent.replace(oldCalcCss, newCalcCss);
  console.log('✅ Updated responsive CSS for bangle calculator');
}

// Make calculator inputs responsive grid
calcContent = calcContent.replace(
  /grid-template-columns:\s*1fr\s*1fr;/g,
  'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));'
);

// Add hero buttons to bangle-size-chart-calculator.html if missing
if (!calcContent.includes('WhatsApp Size Stylist')) {
  calcContent = calcContent.replace(
    /<\/p>\s*<\/div>\s*<\/section>\s*<!-- --- Interactive Calculator Section --- -->/,
    `</p>
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top: 24px;">
        <a href="#bangleSizeTable" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">View Size Chart</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'd%20like%20free%20bangle%20size%20verification" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg" style="border: 1.5px solid #25D366; color: #25D366; background: rgba(37,211,102,0.12); padding: 14px 28px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
          <i data-lucide="message-circle" style="width:20px;height:20px;"></i> WhatsApp Size Stylist
        </a>
      </div>
    </div>
  </section>

  <!-- --- Interactive Calculator Section --- -->`
  );
  console.log('✅ Added hero action buttons to bangle calculator');
}

// Fix double H3 in bangle-size-chart-calculator.html
const doubleH3Target = `<div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Screw Kada Security Inspection</h3>
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Mangalya Dharanam Stacking Architecture</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          When raising both hands during the climactic Mangalya Dharanam and garland exchange, loose bangles can slide down toward the elbows. Always anchor the stack by placing your heaviest, closest-fitting screw kada at the lower wrist base and a snug locking kada at the forearm perimeter, keeping the central glass and churi stack compact and beautifully centered in camera frames.
        </p>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          For opening screw kadas and hinged cuffs, gently test the counter-clockwise threaded pin before stepping into the wedding hall. Sri Kannika’s 1-gram gold kadas are fitted with precision double-threaded safety screws and push-latch locks designed to resist accidental releases during vigorous bridal games like Ungaram ring fishing.
        </p>
      </div>`;

const fixedH3Target = `<div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Screw Kada Security Inspection</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0 0 14px 0;">
          For opening screw kadas and hinged cuffs, gently test the counter-clockwise threaded pin before stepping into the wedding hall. Sri Kannika’s 1-gram gold kadas are fitted with precision double-threaded safety screws and push-latch locks designed to resist accidental releases during vigorous bridal games like Ungaram ring fishing.
        </p>
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Mangalya Dharanam Stacking Architecture</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          When raising both hands during the climactic Mangalya Dharanam and garland exchange, loose bangles can slide down toward the elbows. Always anchor the stack by placing your heaviest, closest-fitting screw kada at the lower wrist base and a snug locking kada at the forearm perimeter, keeping the central glass and churi stack compact and beautifully centered in camera frames.
        </p>
      </div>`;

if (calcContent.includes(doubleH3Target)) {
  calcContent = calcContent.replace(doubleH3Target, fixedH3Target);
  console.log('✅ Cleaned up heading order in bangle calculator advice box');
}

// Add id="bangleSizeTable" to table section for smooth scrolling
calcContent = calcContent.replace(
  '<!-- --- Complete Standard Indian Bangle Size Chart --- -->\n  <section style="background: #faf6f0; padding: 60px 20px;">',
  '<!-- --- Complete Standard Indian Bangle Size Chart --- -->\n  <section id="bangleSizeTable" style="background: #faf6f0; padding: 60px 20px;">'
);

fs.writeFileSync(calcPath, calcContent, 'utf8');

// 3. Fix WhatsApp buttons with invisible text or duplicate text across ALL pages
const allPages = [
  'antique-matte-finish-jewellery-bangalore.html',
  'cz-and-ad-diamond-jewellery-bangalore.html',
  'kundan-and-jadau-jewellery-bangalore.html',
  'bridal-jewellery-bangalore.html',
  'temple-jewellery-bangalore.html',
  'muhurtham-jewellery-bangalore.html',
  'reception-and-sangeet-jewellery-bangalore.html',
  'haldi-and-mehendi-jewellery-bangalore.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html'
];

allPages.forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace "WhatsApp Styling Styling" with styled WhatsApp button
  if (content.includes('WhatsApp Styling Styling')) {
    content = content.replace(
      /<a href="https:\/\/wa\.me\/919844758450\?text=([^"]+)" target="_blank" rel="noopener" class="btn btn--outline btn--lg">\s*<i data-lucide="message-circle"[^>]*><\/i>\s*WhatsApp Styling Styling\s*<\/a>/g,
      '<a href="https://wa.me/919844758450?text=$1" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg" style="border: 1.5px solid #25D366; color: #25D366; background: rgba(37,211,102,0.12); padding: 14px 28px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">\n          <i data-lucide="message-circle" style="width:20px;height:20px;"></i> WhatsApp Bridal Stylist\n        </a>'
    );
    changed = true;
    console.log('✅ Fixed WhatsApp Styling Styling in: ' + filename);
  }

  // Ensure all wa.me hero buttons have btn--whatsapp class and high-contrast inline styles
  content = content.replace(
    /(<a href="https:\/\/wa\.me\/919844758450\?text=[^"]*"[^>]*class="[^"]*)btn--outline([^"]*"[^>]*>)/g,
    (m, p1, p2) => {
      changed = true;
      return `${p1}btn--whatsapp${p2}`;
    }
  );

  // Check if new pages have hero buttons, add them if missing
  const heroButtonMap = {
    'temple-vaddanam-kamarbandh.html': {
      primaryUrl: '#featuredBridalProducts',
      primaryText: 'Explore Vaddanam Designs',
      waText: 'Temple Vaddanam & Kamarbandh in Bangalore'
    },
    'bridal-matha-patti-maang-tikka.html': {
      primaryUrl: '#featuredBridalProducts',
      primaryText: 'Explore Matha Patti Designs',
      waText: 'Bridal Matha Patti & Maang Tikka in Bangalore'
    },
    'antique-vanki-baajuband.html': {
      primaryUrl: '#featuredBridalProducts',
      primaryText: 'Explore Bridal Vanki Designs',
      waText: 'Antique Vanki & Bajuband Armlets in Bangalore'
    },
    'wedding-glass-bangle-stacks.html': {
      primaryUrl: '/bangles',
      primaryText: 'Explore Glass Bangle Sets',
      waText: 'Bridal Glass Bangle Stacks in Bangalore'
    },
    'wedding-return-gifts-bangles-bangalore.html': {
      primaryUrl: '/bangles',
      primaryText: 'Explore Return Gift Sets',
      waText: 'Wedding Return Gifts Bangles Wholesale Bangalore'
    },
    'south-indian-bridal-jewellery-set.html': {
      primaryUrl: '#featuredBridalProducts',
      primaryText: 'Explore 7-Piece Bridal Suite',
      waText: 'South Indian Bridal Jewellery Set Online'
    }
  };

  if (heroButtonMap[filename]) {
    const info = heroButtonMap[filename];
    // Check if hero already has WhatsApp button
    if (!content.includes('WhatsApp Bridal Stylist') && !content.includes('WhatsApp Consultation') && !content.includes('Inquire on WhatsApp')) {
      // Find end of hero paragraph
      const heroPRegex = /(<section class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<p[^>]*>[\s\S]*?<\/p>)(\s*<\/div>\s*<\/section>)/i;
      if (heroPRegex.test(content)) {
        content = content.replace(heroPRegex, `$1
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:24px;">
        <a href="${info.primaryUrl}" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">${info.primaryText}</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20${encodeURIComponent(info.waText)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg" style="border: 1.5px solid #25D366; color: #25D366; background: rgba(37,211,102,0.12); padding: 14px 28px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
          <i data-lucide="message-circle" style="width:20px;height:20px;"></i> WhatsApp Bridal Stylist
        </a>
      </div>$2`);
        changed = true;
        console.log('✅ Added prominent hero buttons to: ' + filename);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('All hero WhatsApp buttons and size chart calculator layout fixes applied!');
