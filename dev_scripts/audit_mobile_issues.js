const fs = require('fs');

const files = [
  'bangle-size-chart-calculator.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  const grids = [...content.matchAll(/style="[^"]*grid-template-columns[^"]*"/gi)];
  grids.forEach(g => console.log('  ' + g[0]));
});
