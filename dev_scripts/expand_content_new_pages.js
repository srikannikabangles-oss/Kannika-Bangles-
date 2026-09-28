const fs = require('fs');
const path = require('path');

const expansions = {
  'bangle-size-chart-calculator.html': {
    target: 'Screw Kada Security Inspection</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Mangalya Dharanam Stacking Architecture</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          When raising both hands during the climactic Mangalya Dharanam and garland exchange, loose bangles can slide down toward the elbows. Always anchor the stack by placing your heaviest, closest-fitting screw kada at the lower wrist base and a snug locking kada at the forearm perimeter, keeping the central glass and churi stack compact and beautifully centered in camera frames.
        </p>`
  },

  'temple-vaddanam-kamarbandh.html': {
    target: 'Bangalore Weather Storage Instructions</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Sangeet & Pre-Wedding Dori Conversion</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          For brides dancing during pre-wedding Sangeet or Haldi events, Sri Kannika provides complimentary padded silk dori back-ties alongside brass link extension chains. The braided zari dori cushions the lower lumbar spine, flexes dynamically during choreographies, and allows immediate adjustment between sitting and dancing routines.
        </p>`
  },

  'bridal-matha-patti-maang-tikka.html': {
    target: 'Tension-Free Temple Positioning</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Jasmine Veni & Fresh Floral Counterweight</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Fresh South Indian jasmine strings (mullapoo veni) carry substantial moisture weight. Always anchor your Matha Patti anchor chain independently to the crown scalp before floral artisans weave fresh flower strings around the braid, ensuring wet florals never drag forehead pearls backward away from your brow line.
        </p>`
  },

  'antique-vanki-baajuband.html': {
    target: 'Malleable Core Calibration</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Single vs Dual Armlet Symmetry Protocol</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          While contemporary South Indian brides frequently style an elaborate single antique Vanki on the left arm (paired with an ornate shoulder brooch), traditional Vedic ceremonies call for paired symmetry. Our Malleshwaram showroom stocks matched mirrored pairs with inward-facing peacocks and Lakshmi motifs designed to balance both arms harmoniously.
        </p>`
  },

  'wedding-glass-bangle-stacks.html': {
    target: 'Zero-Breakage Mandap Donning Technique</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Auspicious Numerical Symmetry (12 vs 24 Stacks)</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          In traditional Kannada, Telugu, and Tamil wedding customs, glass bangles are always counted in multiples of 12 or 24 per hand, reflecting the 12 cosmic signs and 24 hours of daily marital peace. Pairing sets in exact numerical parity ensures balanced weight across both wrists, preventing forearm fatigue when holding bridal coconut and akshata plates.
        </p>`
  },

  'wedding-return-gifts-bangles-bangalore.html': {
    target: 'Post-Event Size Exchange Guarantee</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Complimentary Custom Couple Initials & Gift Tags</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          For bulk wedding orders exceeding 50 boxes, Sri Kannika offers customized gold-foil monogrammed tags featuring the couple's names, wedding hashtag, and date. Pre-strung on each Thamboolam box with golden satin tassels, these personalized details save families hours of manual gift preparation on hectic wedding eve mornings.
        </p>`
  },

  'south-indian-bridal-jewellery-set.html': {
    target: 'Lifetime Re-Polishing & Safe Travel Trunk</h3>',
    extra: `
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-top: 14px; margin-bottom: 6px;">Generational Trousseau Longevity & Family Gifting</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Unlike mass-market costume jewelry that discolors after a single function, Sri Kannika’s 1-gram micro gold suites are engineered as modern heirlooms. Many Bangalore families pass our temple sets to younger sisters and cousins for subsequent family weddings, supported by our permanent Malleshwaram re-polishing certificate.
        </p>`
  }
};

for (const [filename, data] of Object.entries(expansions)) {
  const filePath = path.join(__dirname, '..', filename);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(data.target)) {
    content = content.replace(data.target, data.target + data.extra);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Expanded content in: ' + filename);
  } else {
    console.warn('⚠️ Target not found in: ' + filename);
  }
}
