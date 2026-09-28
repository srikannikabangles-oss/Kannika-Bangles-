const fs = require('fs');

const bridalPages = [
  'bridal-jewellery-bangalore.html',
  'south-indian-bridal-jewellery-set.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'temple-jewellery-bangalore.html',
  'muhurtham-jewellery-bangalore.html',
  'reception-and-sangeet-jewellery-bangalore.html',
  'haldi-and-mehendi-jewellery-bangalore.html',
  'cz-and-ad-diamond-jewellery-bangalore.html',
  'kundan-and-jadau-jewellery-bangalore.html',
  'antique-matte-finish-jewellery-bangalore.html'
];

bridalPages.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Missing file: ${file}`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const hasProductGrid = content.includes('product-grid') || content.includes('product-card');
  const hasProductsJs = content.includes('products.js');
  console.log(`${file}: hasProductGrid=${hasProductGrid}, hasProductsJs=${hasProductsJs}`);
});
