const fs = require('fs');
const files = fs.readdirSync('./images/products').filter(f => f.endsWith('.jpg'));
let gridHtml = '';
files.forEach(f => {
  gridHtml += '        <div class="gallery-item" style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-card); aspect-ratio: 1;">\n';
  gridHtml += '          <img src="/images/products/' + f + '" loading="lazy" alt="Kannika Bangles ' + f.split('_')[0] + '" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-normal);" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'"/>\n';
  gridHtml += '        </div>\n';
});

const template = fs.readFileSync('./about.html', 'utf8');
const newHtml = template
  .replace(/<title>.*<\/title>/, '<title>Product Gallery | Kannika Bangles</title>')
  .replace(/<main[\s\S]*<\/main>/, '<main style="padding-top:140px; max-width:1320px; margin: 0 auto; padding-bottom: 80px;">\n    <div style="text-align: center; margin-bottom: 40px; padding: 0 24px;">\n      <h1 class="section-title">Our Collection Gallery</h1>\n      <p class="section-desc">Explore our latest designs in bangles, necklaces, and earrings.</p>\n    </div>\n    <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; padding: 0 24px;">\n' + gridHtml + '    </div>\n  </main>');

fs.writeFileSync('./gallery.html', newHtml);
console.log('gallery.html generated successfully.');
