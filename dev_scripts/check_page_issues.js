const fs = require('fs');

const pages = [
  'index.html',
  'bridal-jewellery-bangalore.html',
  'temple-jewellery-bangalore.html',
  'muhurtham-jewellery-bangalore.html',
  'reception-and-sangeet-jewellery-bangalore.html',
  'haldi-and-mehendi-jewellery-bangalore.html',
  'cz-and-ad-diamond-jewellery-bangalore.html',
  'kundan-and-jadau-jewellery-bangalore.html',
  'antique-matte-finish-jewellery-bangalore.html',
  'bangle-size-chart-calculator.html',
  'temple-vaddanam-kamarbandh.html',
  'bridal-matha-patti-maang-tikka.html',
  'antique-vanki-baajuband.html',
  'wedding-glass-bangle-stacks.html',
  'wedding-return-gifts-bangles-bangalore.html',
  'south-indian-bridal-jewellery-set.html'
];

console.log('=== PAGE AUDIT DIAGNOSTICS ===\n');

pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const html = fs.readFileSync(p, 'utf8');

  // Title tag
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'MISSING';
  
  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : 'MISSING';

  // H1, H2, H3
  const h1s = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []);
  const h2s = (html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || []);
  const h3s = (html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) || []);

  // Images
  const imgs = html.match(/<img[^>]*>/gi) || [];
  let missingAlt = 0;
  imgs.forEach(img => {
    if (!/alt=["'][^"']+["']/.test(img)) {
      missingAlt++;
    }
  });

  // OpenGraph & Twitter
  const ogTitle = /property=["']og:title["']/.test(html);
  const ogImage = /property=["']og:image["']/.test(html);
  const twitterCard = /name=["']twitter:card["']/.test(html);

  // Schema blocks
  const schemas = (html.match(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi) || []);

  const issues = [];
  if (title.length > 65) issues.push(`Title exceeds recommended 65 chars (${title.length} chars)`);
  if (desc.length > 160) issues.push(`Description exceeds recommended 160 chars (${desc.length} chars)`);
  if (h1s.length !== 1) issues.push(`H1 count is ${h1s.length} (expected exactly 1)`);
  if (!twitterCard) issues.push(`Missing twitter:card meta tag`);
  if (missingAlt > 0) issues.push(`${missingAlt} images missing descriptive alt tags`);
  if (schemas.length === 0) issues.push(`No JSON-LD structured data`);
  else if (schemas.length === 1 && !html.includes('JewelryStore')) issues.push(`Schema is minimal (missing JewelryStore LocalBusiness / FAQ schemas)`);

  console.log(`Page: ${p}`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Desc (${desc.length} chars): ${desc}`);
  console.log(`  Headings: H1: ${h1s.length}, H2: ${h2s.length}, H3: ${h3s.length}`);
  console.log(`  Images: ${imgs.length} total, ${missingAlt} without descriptive alt`);
  console.log(`  Social Tags: OG: ${ogTitle && ogImage ? 'OK' : 'Incomplete'}, Twitter: ${twitterCard ? 'OK' : 'MISSING'}`);
  console.log(`  Schema Blocks: ${schemas.length}`);
  console.log(`  Issues / Warnings (${issues.length}):`);
  if (issues.length === 0) {
    console.log(`    [None - Clean!]`);
  } else {
    issues.forEach(iss => console.log(`    - ⚠️  ${iss}`));
  }
  console.log('');
});
