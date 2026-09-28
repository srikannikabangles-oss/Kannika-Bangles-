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
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/"@type":\s*"Organization"/g, '"@type": ["JewelryStore", "LocalBusiness"]');
  if (!content.includes('JewelryStore')) {
    content = content.replace(
      /"@context":\s*"https:\/\/schema\.org",\s*"@graph":\s*\[/,
      `$&
      {
        "@type": ["JewelryStore", "LocalBusiness"],
        "name": "Sri Kannika Bangles & Jewels",
        "url": "https://kannikabangles.com/",
        "telephone": "+91-9844758450"
      },`
    );
  }
  fs.writeFileSync(f, content, 'utf8');
  console.log('Updated schema in:', f);
});
