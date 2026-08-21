const fs = require('fs');

// 1. Fix Marquee in index.html
let html = fs.readFileSync('index.html', 'utf8');

const items = `        <span>Kundan Jewellery</span><span class="marquee__dot">•</span>
        <span>Jadav Masterpieces</span><span class="marquee__dot">•</span>
        <span>Bridal Bangles Curation</span><span class="marquee__dot">•</span>
        <span>Antique Matte Harams</span><span class="marquee__dot">•</span>
        <span>Sparkling CZ Diamonds</span><span class="marquee__dot">•</span>
        <span>Nakshi Temple Jewellery</span><span class="marquee__dot">•</span>
        <span>Royal Choker Sets</span><span class="marquee__dot">•</span>
        <span>Emerald & Ruby Accents</span><span class="marquee__dot">•</span>
        <span>Chandbali & Jhumka Suite</span><span class="marquee__dot">•</span>
        <span>Designer Kadaas</span><span class="marquee__dot">•</span>
        <span>Micro Gold Plated Bangles</span><span class="marquee__dot">•</span>
        <span>Heritage Handcrafted Ornaments</span><span class="marquee__dot">•</span>`;

const newMarqueeHTML = `<div class="marquee">
      <div class="marquee__track">
` + items + `
      </div>
      <div class="marquee__track" aria-hidden="true">
` + items + `
      </div>`;

html = html.replace(/<div class="marquee">[\s\S]*?<\/div>\s*<\/div>/, newMarqueeHTML + '\n    </div>');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html marquee');

// 2. Fix Marquee CSS in styles.css
let css = fs.readFileSync('css/styles.css', 'utf8');
if (!css.includes('gap: 24px;') && css.includes('.marquee {')) {
  css = css.replace('.marquee {', '.marquee {\n  gap: 24px;');
}

const newKeyframes = `@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 24px)); }
}`;
css = css.replace(/@keyframes marquee-scroll[\s\S]*?\}/, newKeyframes);
fs.writeFileSync('css/styles.css', css);
console.log('Fixed styles.css marquee');

// 3. Fix Marquee CSS in mobile.css
let mobileCss = fs.readFileSync('css/mobile.css', 'utf8');
mobileCss = mobileCss.replace(/\.marquee__track[\s\S]*?\}/g, ``);
fs.writeFileSync('css/mobile.css', mobileCss);
console.log('Fixed mobile.css marquee');
