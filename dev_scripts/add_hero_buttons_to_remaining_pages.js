const fs = require('fs');
const path = require('path');

const heroButtonMap = {
  'temple-vaddanam-kamarbandh.html': {
    primaryUrl: '#featuredBridalProducts',
    primaryText: 'Explore Vaddanam Designs',
    waText: "Temple Vaddanam & Kamarbandh in Bangalore"
  },
  'bridal-matha-patti-maang-tikka.html': {
    primaryUrl: '#featuredBridalProducts',
    primaryText: 'Explore Matha Patti Designs',
    waText: "Bridal Matha Patti & Maang Tikka in Bangalore"
  },
  'antique-vanki-baajuband.html': {
    primaryUrl: '#featuredBridalProducts',
    primaryText: 'Explore Bridal Vanki Designs',
    waText: "Antique Vanki & Bajuband Armlets in Bangalore"
  },
  'wedding-glass-bangle-stacks.html': {
    primaryUrl: '/bangles',
    primaryText: 'Explore Glass Bangle Sets',
    waText: "Bridal Glass Bangle Stacks in Bangalore"
  },
  'wedding-return-gifts-bangles-bangalore.html': {
    primaryUrl: '/bangles',
    primaryText: 'Explore Return Gift Sets',
    waText: "Wedding Return Gifts Bangles Wholesale Bangalore"
  },
  'south-indian-bridal-jewellery-set.html': {
    primaryUrl: '#featuredBridalProducts',
    primaryText: 'Explore 7-Piece Bridal Suite',
    waText: "South Indian Bridal Jewellery Set Online"
  }
};

for (const [filename, info] of Object.entries(heroButtonMap)) {
  const filePath = path.join(__dirname, '..', filename);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('WhatsApp Bridal Stylist')) {
    console.log('Already has hero buttons: ' + filename);
    continue;
  }

  // Look for Hero Header section
  const heroMarker = '<!-- --- Hero Header --- -->';
  const heroIdx = content.indexOf(heroMarker);
  if (heroIdx !== -1) {
    const endSectionIdx = content.indexOf('</section>', heroIdx);
    const endDivIdx = content.lastIndexOf('</div>', endSectionIdx);

    if (endDivIdx !== -1) {
      const buttonHtml = `
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:24px;">
        <a href="${info.primaryUrl}" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">${info.primaryText}</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20${encodeURIComponent(info.waText)}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg" style="border: 1.5px solid #25D366; color: #25D366; background: rgba(37,211,102,0.12); padding: 14px 28px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
          <i data-lucide="message-circle" style="width:20px;height:20px;"></i> WhatsApp Bridal Stylist
        </a>
      </div>
    `;
      content = content.slice(0, endDivIdx) + buttonHtml + content.slice(endDivIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Added hero action buttons to: ' + filename);
    }
  }
}
