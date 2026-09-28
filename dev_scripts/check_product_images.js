const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'products.js'), 'utf8');
const match = code.match(/const PRODUCTS = (\[[\s\S]*?\]);/);

if (match) {
  const products = eval(match[1]);
  console.log('Total products in catalog:', products.length);
  let missingCount = 0;
  for (const p of products) {
    const cleanImg = p.image.replace(/^\//, '');
    const full = path.join(__dirname, '..', cleanImg);
    if (!fs.existsSync(full)) {
      console.log(`❌ Missing product ${p.id} (${p.name}): ${p.image}`);
      missingCount++;
    }
    if (Array.isArray(p.images)) {
      for (const img of p.images) {
        const clean = img.replace(/^\//, '');
        const fullImg = path.join(__dirname, '..', clean);
        if (!fs.existsSync(fullImg)) {
          console.log(`❌ Missing gallery ${p.id}: ${img}`);
          missingCount++;
        }
      }
    }
  }
  console.log(`\nProduct images audit complete: ${missingCount} missing.`);
} else {
  console.log('Could not parse PRODUCTS array');
}
