const fs = require('fs');

console.log('--- Checking CSS links across all HTML files ---');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const cssMatches = content.match(/href=[\"'][^\"']*\.css[^\"']*[\"']/g);
  console.log(f, cssMatches ? cssMatches.join(', ') : 'NO CSS');
});

console.log('\n--- Checking WhatsApp buttons in Hero Sections ---');
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Look for sections containing hero
  const heroRegex = /<(section|header|div)[^>]*(?:class|id)=[\"'][^\"']*(?:hero|banner)[^\"']*[\"'][^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = heroRegex.exec(content)) !== null) {
    const heroContent = match[0];
    const waButtons = [...heroContent.matchAll(/<a[^>]*wa\.me[^>]*>([\s\S]*?)<\/a>/gi)];
    if (waButtons.length > 0) {
      console.log('File:', f);
      waButtons.forEach(wb => {
        console.log('  Anchor:', wb[0].replace(/\s+/g, ' '));
      });
    }
  }
});
